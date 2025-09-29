"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { GeoJSON } from "geojson";
import { RouteFormData, RouteData, CompleteRouteData, RouteWaypointRequest, type RouteDetailsResponse } from "../types/routeTypes";

interface RouteFormContextType {
  formData: RouteFormData;
  outboundRoute: RouteData;
  returnRoute: RouteData;
  currentView: "outbound" | "return" | "both";
  updateFormData: (
    field: keyof RouteFormData,
    value: string | File | null
  ) => void;
  saveOutboundRoute: (
    waypoints: RouteWaypointRequest[],
    geometry: GeoJSON.Geometry,
    distance: number
  ) => void;
  saveReturnRoute: (
    waypoints: RouteWaypointRequest[],
    geometry: GeoJSON.Geometry,
    distance: number
  ) => void;
  setCurrentView: (view: "outbound" | "return" | "both") => void;
  resetForm: () => void;
  getCompleteRouteData: () => CompleteRouteData | null;
  setInitialData: (data: RouteDetailsResponse) => void;
}

const RouteFormContext = createContext<RouteFormContextType | undefined>(undefined);

export const useRouteForm = () => {
  const context = useContext(RouteFormContext);
  if (!context) {
    throw new Error("useRouteForm must be used within a RouteFormProvider");
  }
  return context;
};

interface RouteFormProviderProps {
  children: ReactNode;
}

export const RouteFormProvider: React.FC<RouteFormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<RouteFormData>({
    numberRoute: '',
    description: '',
    outboundImage: null,
    returnImage: null,
  });

  const [outboundRoute, setOutboundRoute] = useState<RouteData>({
    waypoints: [],
    geometry: null,
    distance: 0,
  });

  const [returnRoute, setReturnRoute] = useState<RouteData>({
    waypoints: [],
    geometry: null,
    distance: 0,
  });

  const setInitialData = (data: RouteDetailsResponse) => {
    setFormData({
      numberRoute: data.numberRoute,
      description: data.description || '',
      outboundImage: data.outboundImage || null,
      returnImage: data.returnImage || null,
    })
    setOutboundRoute({
      waypoints: data.waypoints.filter(w => w.destine === 'OUTBOUND').map(w => ({ ...w })),
      geometry: null,
      distance: 0,
    });
    setReturnRoute({
      waypoints: data.waypoints.filter(w => w.destine === 'RETURN').map(w => ({ ...w })),
      geometry: null,
      distance: 0,
    });
  };

  const [currentView, setCurrentView] = useState<'outbound' | 'return' | 'both'>('outbound');

  const updateFormData = (field: keyof RouteFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveOutboundRoute = (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry, distance: number) => {
    setOutboundRoute({
      waypoints,
      geometry,
      distance: distance,
    });
  };

  const saveReturnRoute = (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry, distance: number) => {
    setReturnRoute({
      waypoints,
      geometry,
      distance: distance,
    });
  };

  const resetForm = () => {
    setFormData({
      numberRoute: '',
      description: '',
      outboundImage: null,
      returnImage: null,
    });
    setOutboundRoute({
      waypoints: [],
      geometry: null,
      distance: 0,
    });
    setReturnRoute({
      waypoints: [],
      geometry: null,
      distance: 0,
    });
    setCurrentView('outbound');
  };

  const getCompleteRouteData = (): CompleteRouteData | null => {
    if (!formData.numberRoute.trim() || outboundRoute.waypoints.length < 2 || returnRoute.waypoints.length < 2) {
      return null;
    }

    if (!outboundRoute.geometry || !returnRoute.geometry) {
      return null;
    }

    return {
      numberRoute: formData.numberRoute,
      description: formData.description,
      totalDistance: outboundRoute.distance + returnRoute.distance,
      outboundImage: formData.outboundImage || undefined,
      returnImage: formData.returnImage || undefined,
      outboundRoute: {
        waypoints: outboundRoute.waypoints,
        geometry: outboundRoute.geometry,
      },
      returnRoute: {
        waypoints: returnRoute.waypoints,
        geometry: returnRoute.geometry,
      },
    };
  };

  const value: RouteFormContextType = {
    formData,
    outboundRoute,
    returnRoute,
    currentView,
    updateFormData,
    saveOutboundRoute,
    saveReturnRoute,
    setCurrentView,
    resetForm,
    getCompleteRouteData,
    setInitialData,
  };

  return (
    <RouteFormContext.Provider value={value}>
      {children}
    </RouteFormContext.Provider>
  );
};