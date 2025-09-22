"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouteService } from '../services/RouteServices';
import { RouteResponse } from '../types/routeTypes';

interface RouteContextType {
  routes: RouteResponse[];
  loading: boolean;
  error: string | null;
  refetchRoutes: () => Promise<void>;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRouteContext must be used within a RouteProvider');
  }
  return context;
};

interface RouteProviderProps {
  children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const { getAllRoutes, loading, error } = useRouteService();
  const [routes, setRoutes] = useState<RouteResponse[]>([]);

  const fetchRoutes = async () => {
    try {
      const response = await getAllRoutes();
      if (response.success && response.data) {
        setRoutes(response.data);
      }
    } catch (err) {
      console.error('Error fetching routes:', err);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const refetchRoutes = async () => {
    await fetchRoutes();
  };

  const value: RouteContextType = {
    routes,
    loading,
    error,
    refetchRoutes,
  };

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};