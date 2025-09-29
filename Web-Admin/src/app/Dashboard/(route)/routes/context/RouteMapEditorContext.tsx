"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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
  routeDistance: number;
  setRouteDistance: (d: number) => void;
  routeDistanceReturn: number;
  setRouteDistanceReturn: (d: number) => void;

  // Estados de modo
  isReturnMode: boolean;
  displayMode: "OUTBOUND" | "RETURN" | "BOTH" | "VIEW";
  setDisplayMode: (m: "OUTBOUND" | "RETURN" | "BOTH" | "VIEW") => void;

  // Métodos de control
  startReturn: () => void;
  finishReturn: () => void;
  resetMapEditor: () => void;
}

const RouteMapEditorContext = createContext<
  RouteMapEditorContextType | undefined
>(undefined);

export const useRouteMapEditor = () => {
  const context = useContext(RouteMapEditorContext);
  if (!context) {
    throw new Error(
      "useRouteMapEditor must be used within a RouteMapEditorProvider"
    );
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
  const [routeGeometry, setRouteGeometry] = useState<GeoJSON.Geometry | null>(
    null
  );
  const [routeGeometryReturn, setRouteGeometryReturn] =
    useState<GeoJSON.Geometry | null>(null);
  const [routeDistance, setRouteDistance] = useState<number>(0);
  const [routeDistanceReturn, setRouteDistanceReturn] = useState<number>(0);
  const [isReturnMode, setIsReturnMode] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<
    "OUTBOUND" | "RETURN" | "BOTH" | "VIEW"
  >("OUTBOUND");

  const addWaypoint = (lat: number, lng: number) => {
    let destine: "OUTBOUND" | "RETURN" | undefined;

    if (displayMode === "OUTBOUND") destine = "OUTBOUND";
    else if (displayMode === "RETURN") destine = "RETURN";
    else destine = undefined;

    let sequence: number;
    if (destine) {
      const existingWaypoints = waypointList.filter(
        (wp) => wp.destine === destine
      );
      if (existingWaypoints.length > 0) {
        const maxSequence = Math.max(
          ...existingWaypoints.map((wp) => wp.sequence)
        );
        sequence = maxSequence + 1;
      } else {
        sequence = 1;
      }
    } else {
      sequence = 0;
    }

    const newWaypoint: RouteWaypointRequest = {
      sequence,
      latitude: lat,
      longitude: lng,
      type: "WAYPOINT",
      destine,
    };
    console.log(newWaypoint);
    setWaypointList([...waypointList, newWaypoint]);
  };

  const removeWaypoint = (index: number) => {
    const updatedWaypoints = waypointList.filter((_, i) => i !== index);
    // Agrupar por destine y reindexar cada grupo
    const grouped = updatedWaypoints.reduce((acc, wp) => {
      const key = wp.destine || "undefined";
      if (!acc[key]) acc[key] = [];
      acc[key].push(wp);
      return acc;
    }, {} as Record<string, typeof updatedWaypoints>);
    const reordered: typeof updatedWaypoints = [];
    for (const dest in grouped) {
      const group = grouped[dest];
      group.forEach((wp, idx) => {
        reordered.push({ ...wp, sequence: idx + 1 });
      });
    }
    setWaypointList(reordered);
  };

  // Reindexar automáticamente 'sequence' por destine si detectamos que no es consecutiva
  // empezando en 1 para cada grupo. Esto cubre casos donde se elimina un waypoint
  // y queremos mantener la propiedad 'sequence' ordenada y sin saltos por destine.
  useEffect(() => {
    if (!waypointList || waypointList.length === 0) return;

    const grouped = waypointList.reduce((acc, wp) => {
      const key = wp.destine || "undefined";
      if (!acc[key]) acc[key] = [];
      acc[key].push(wp);
      return acc;
    }, {} as Record<string, typeof waypointList>);

    const reindexed: typeof waypointList = [];
    let hasChanges = false;
    for (const dest in grouped) {
      const group = grouped[dest];
      const isConsecutive = group.every((wp, idx) => wp.sequence === idx + 1);
      if (!isConsecutive) {
        hasChanges = true;
        group.forEach((wp, idx) => {
          reindexed.push({ ...wp, sequence: idx + 1 });
        });
      } else {
        reindexed.push(...group);
      }
    }
    if (hasChanges) {
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
    setRouteDistance(0);
    setRouteDistanceReturn(0);
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
