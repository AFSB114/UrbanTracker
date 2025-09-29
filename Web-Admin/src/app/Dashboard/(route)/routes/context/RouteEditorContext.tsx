"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { GeoJSON } from "geojson";
import { RouteWaypointRequest } from "../types/routeTypes";

interface RouteEditorContextType {
  waypointList: RouteWaypointRequest[];
  setWaypointList: React.Dispatch<React.SetStateAction<RouteWaypointRequest[]>>;
  addWaypoint: (lat: number, lng: number) => void;
  removeWaypoint: (index: number) => void;
  // Geometría de la ruta (geojson) que se usa para dibujar en MapView
  routeGeometry: GeoJSON.Geometry | null;
  setRouteGeometry: (g: GeoJSON.Geometry | null) => void;
  // Distancia total de la ruta en kilómetros (convertida desde metros)
  routeDistanceKm: number | null;
  // Recibe metros y actualiza routeDistanceKm (en km, redondeado a 2 decimales)
  setRouteDistance: (meters: number | null) => void;
  // Geometría de la ruta de vuelta (return)
  routeGeometryReturn: GeoJSON.Geometry | null;
  setRouteGeometryReturn: (g: GeoJSON.Geometry | null) => void;
  // Modo de edición: false = capturando ida (OUTBOUND), true = capturando vuelta (RETURN)
  isReturnMode: boolean;
  startReturn: () => void;
  finishReturn: () => void;
  // Modo de visualización en el mapa: OUTBOUND | RETURN | BOTH
  displayMode: "OUTBOUND" | "RETURN" | "BOTH";
  setDisplayMode: (m: "OUTBOUND" | "RETURN" | "BOTH") => void;
}

const RouteEditorContext = createContext<RouteEditorContextType | undefined>(
  undefined
);

export const useRouteEditor = () => {
  const context = useContext(RouteEditorContext);
  if (!context) {
    throw new Error("useRouteEditor must be used within a RouteEditorProvider");
  }
  return context;
};

interface RouteEditorProviderProps {
  children: ReactNode;
}

export const RouteEditorProvider: React.FC<RouteEditorProviderProps> = ({
  children,
}) => {
  const [waypointList, setWaypointList] = useState<RouteWaypointRequest[]>([]);
  const [routeGeometry, setRouteGeometry] = useState<GeoJSON.Geometry | null>(
    null
  );
  const [routeDistanceKm, setRouteDistanceKm] = useState<number | null>(null);
  const [routeGeometryReturn, setRouteGeometryReturn] =
    useState<GeoJSON.Geometry | null>(null);
  const [isReturnMode, setIsReturnMode] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<"OUTBOUND" | "RETURN" | "BOTH">(
    "OUTBOUND"
  );

  const addWaypoint = (lat: number, lng: number) => {
    if (displayMode !== "OUTBOUND" && displayMode !== "RETURN") return;
    const newWaypoint: RouteWaypointRequest = {
      sequence: waypointList.length + 1,
      latitude: lat,
      longitude: lng,
      type: "WAYPOINT",
      destine: displayMode as "OUTBOUND" | "RETURN",
    };
    setWaypointList([...waypointList, newWaypoint]);
  };

  const removeWaypoint = (index: number) => {
    const updatedWaypoints = waypointList.filter((_, i) => i !== index);
    const reordered = updatedWaypoints.map((wp, i) => ({
      ...wp,
      sequence: i + 1,
    }));
    setWaypointList(reordered);
  };

  // Reindexar automáticamente 'sequence' si detectamos que no es una secuencia
  // consecutiva empezando en 1. Esto cubre casos donde se elimina un endpoint
  // y queremos mantener la propiedad 'sequence' ordenada y sin saltos.
  React.useEffect(() => {
    if (!waypointList || waypointList.length === 0) return;

    // Comprobar si la secuencia actual es 1..n
    const isConsecutive = waypointList.every(
      (wp, idx) => wp.sequence === idx + 1
    );
    if (!isConsecutive) {
      const reindexed = waypointList.map((wp, idx) => ({
        ...wp,
        sequence: idx + 1,
      }));
      setWaypointList(reindexed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypointList.length]);

  const setRouteDistance = (meters: number | null) => {
    if (
      meters === null ||
      meters === undefined ||
      Number.isNaN(Number(meters))
    ) {
      setRouteDistanceKm(null);
      return;
    }
    // convertir metros a kilómetros y redondear a 2 decimales
    const km = Math.round((Number(meters) / 1000) * 100) / 100;
    setRouteDistanceKm(km);
  };

  const startReturn = () => {
    setDisplayMode("RETURN");
    setIsReturnMode(true);
  };

  const finishReturn = () =>{
    setDisplayMode("BOTH");
    setIsReturnMode(false);
  };

  const value: RouteEditorContextType = {
    waypointList,
    setWaypointList,
    addWaypoint,
    removeWaypoint,
    routeGeometry,
    setRouteGeometry,
    routeDistanceKm,
    setRouteDistance,
    routeGeometryReturn,
    setRouteGeometryReturn,
    isReturnMode,
    startReturn,
    finishReturn,
    displayMode,
    setDisplayMode,
  };

  return (
    <RouteEditorContext.Provider value={value}>
      {children}
    </RouteEditorContext.Provider>
  );
};
