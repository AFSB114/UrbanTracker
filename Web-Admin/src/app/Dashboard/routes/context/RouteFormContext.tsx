"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { GeoJSON } from "geojson";
import { RouteFormData, RouteData, RouteFormState, CompleteRouteData, RouteWaypointRequest } from "../types/routeTypes";

interface RouteFormContextType {
  formData: RouteFormData;
  outboundRoute: RouteData;
  returnRoute: RouteData;
  currentView: 'outbound' | 'return' | 'both';
  updateFormData: (field: keyof RouteFormData, value: string | File | null) => void;
  saveOutboundRoute: (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry, distance?: number) => void;
  saveReturnRoute: (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry, distance?: number) => void;
  setCurrentView: (view: 'outbound' | 'return' | 'both') => void;
  resetForm: () => void;
  getCompleteRouteData: () => CompleteRouteData | null;
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

  const [currentView, setCurrentView] = useState<'outbound' | 'return' | 'both'>('outbound');

  const updateFormData = (field: keyof RouteFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveOutboundRoute = (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry, distance?: number) => {
    const calculatedDistance = distance ?? calculateDistanceFromWaypoints(waypoints);
    setOutboundRoute({
      waypoints,
      geometry,
      distance: calculatedDistance,
    });
  };

  const saveReturnRoute = (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry, distance?: number) => {
    const calculatedDistance = distance ?? calculateDistanceFromWaypoints(waypoints);
    setReturnRoute({
      waypoints,
      geometry,
      distance: calculatedDistance,
    });
  };

  const calculateDistanceFromWaypoints = (waypoints: RouteWaypointRequest[]): number => {
    if (waypoints.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const wp1 = waypoints[i];
      const wp2 = waypoints[i + 1];
      total += calculateHaversineDistance(wp1.latitude, wp1.longitude, wp2.latitude, wp2.longitude);
    }
    return Math.round(total * 100) / 100;
  };

  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
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
  };

  return (
    <RouteFormContext.Provider value={value}>
      {children}
    </RouteFormContext.Provider>
  );
};