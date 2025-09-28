import { useState } from 'react';
import { useRouteService } from '../services/RouteServices';
import { RouteResponse } from '../types/routeTypes';

export const useRoutes = () => {
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

  return {
    routes,
    loading,
    error,
    fetchRoutes,
  };
};