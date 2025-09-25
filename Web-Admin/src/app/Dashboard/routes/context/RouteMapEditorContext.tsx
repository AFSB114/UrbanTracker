"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { GeoJSON } from "geojson";
import { RouteWaypointRequest } from "../types/routeTypes";

interface RouteMapEditorContextType {
  // Waypoints temporales para edición
  waypointList: RouteWaypointRequest[];
  setWaypointList: React.Dispatch<React.SetStateAction<RouteWaypointRequest[]>>;
  addWaypoint: (lat: number, lng: number) => void;
  removeWaypoint: (index: number) => void;

  // Geometrías temporales
  routeGeometry: GeoJSON.Geometry | null;
  setRouteGeometry: (g: GeoJSON.Geometry | null) => void;
  routeGeometryReturn: GeoJSON.Geometry | null;
  setRouteGeometryReturn: (g: GeoJSON.Geometry | null) => void;

  // Distancias temporales (de Mapbox API)
  routeDistance: number | null;
  setRouteDistance: (d: number | null) => void;
  routeDistanceReturn: number | null;
  setRouteDistanceReturn: (d: number | null) => void;

  // Estados de modo
  isReturnMode: boolean;
  displayMode: "OUTBOUND" | "RETURN" | "BOTH" | "VIEW";
  setDisplayMode: (m: "OUTBOUND" | "RETURN" | "BOTH" | "VIEW") => void;

  // Métodos de control
  startReturn: () => void;
  finishReturn: () => void;
  resetMapEditor: () => void;
}

const RouteMapEditorContext = createContext<RouteMapEditorContextType | undefined>(
  undefined
);

export const useRouteMapEditor = () => {
  const context = useContext(RouteMapEditorContext);
  if (!context) {
    throw new Error("useRouteMapEditor must be used within a RouteMapEditorProvider");
  }
  return context;
};

interface RouteMapEditorProviderProps {
  children: ReactNode;
}

export const RouteMapEditorProvider: React.FC<RouteMapEditorProviderProps> = ({
  children,
}) => {
  const [waypointList, setWaypointList] = useState<RouteWaypointRequest[]>([]);
  const [routeGeometry, setRouteGeometry] = useState<GeoJSON.Geometry | null>(null);
  const [routeGeometryReturn, setRouteGeometryReturn] = useState<GeoJSON.Geometry | null>(null);
  const [routeDistance, setRouteDistance] = useState<number | null>(null);
  const [routeDistanceReturn, setRouteDistanceReturn] = useState<number | null>(null);
  const [isReturnMode, setIsReturnMode] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<"OUTBOUND" | "RETURN" | "BOTH" | "VIEW">("OUTBOUND");

  const addWaypoint = (lat: number, lng: number) => {
    const newWaypoint: RouteWaypointRequest = {
      sequence: waypointList.length + 1,
      latitude: lat,
      longitude: lng,
      type: "WAYPOINT",
      destine: isReturnMode ? "RETURN" : "OUTBOUND",
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
  // consecutiva empezando en 1. Esto cubre casos donde se elimina un waypoint
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

  const startReturn = () => {
    setDisplayMode("RETURN");
    setIsReturnMode(true);
  };

  const finishReturn = () => {
    setDisplayMode("BOTH");
    setIsReturnMode(false);
  };

  const resetMapEditor = () => {
    setWaypointList([]);
    setRouteGeometry(null);
    setRouteGeometryReturn(null);
    setRouteDistance(null);
    setRouteDistanceReturn(null);
    setIsReturnMode(false);
    setDisplayMode("OUTBOUND");
  };

  const value: RouteMapEditorContextType = {
    waypointList,
    setWaypointList,
    addWaypoint,
    removeWaypoint,
    routeGeometry,
    setRouteGeometry,
    routeGeometryReturn,
    setRouteGeometryReturn,
    routeDistance,
    setRouteDistance,
    routeDistanceReturn,
    setRouteDistanceReturn,
    isReturnMode,
    displayMode,
    setDisplayMode,
    startReturn,
    finishReturn,
    resetMapEditor,
  };

  return (
    <RouteMapEditorContext.Provider value={value}>
      {children}
    </RouteMapEditorContext.Provider>
  );
};