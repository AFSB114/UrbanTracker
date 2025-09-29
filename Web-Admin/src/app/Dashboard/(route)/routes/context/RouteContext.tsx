"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RouteResponse } from '../types/routeTypes';
import { RoutesApi } from '../services/api/routeApi';

interface RouteContextType {
  routes: RouteResponse[];
  loading: boolean;
  error: string | null;
  refreshRoutes: () => Promise<void>;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

interface RouteProviderProps {
  children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await RoutesApi.getAllRoutes();
      if (response.success && response.data) {
        setRoutes(response.data);
      } else {
        setError(response.message || 'Error al cargar rutas');
      }
    } catch (err) {
      setError('Error al cargar rutas');
      console.error('Error fetching routes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const value: RouteContextType = {
    routes,
    loading,
    error,
    refreshRoutes: fetchRoutes,
  };

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoutesContext = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error('useRoutesContext must be used within a RouteProvider');
  }
  return context;
};