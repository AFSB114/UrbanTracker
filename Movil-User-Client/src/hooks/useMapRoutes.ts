import { useState, useCallback, useEffect } from 'react';
import { useFetchWaypoints } from './useFetchWaypoints';
import type { RouteWaypoint, Waypoint } from '../types/types';

interface MapRoute {
  id: string;
  waypoints: Waypoint[];
  color: string;
  routeId: number;
}

// Función para parsear RouteWaypoint[] a Waypoint[] para Mapbox
const parseWaypointsForMapbox = (routeWaypoints: RouteWaypoint[]): Waypoint[] => {
  return routeWaypoints
    .sort((a, b) => a.sequence - b.sequence) // Ordenar por secuencia
    .map((wp) => ({
      long: wp.longitude,
      lat: wp.latitude,
    }));
};

export const useMapRoutes = () => {
  const [mapRoutes, setMapRoutes] = useState<MapRoute[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);

  const { data: waypointsData, loading, error } = useFetchWaypoints(selectedRouteId);

  // Función para agregar una ruta al mapa
  const addRouteToMap = useCallback((routeId: number, routeNumber: string) => {
    setSelectedRouteId(routeId);
  }, []);

  // Función para quitar una ruta del mapa
  const removeRouteFromMap = useCallback((routeId: number) => {
    setMapRoutes(prev => prev.filter(route => route.routeId !== routeId));
  }, []);

  // Función para limpiar todas las rutas
  const clearAllRoutes = useCallback(() => {
    setMapRoutes([]);
    setSelectedRouteId(null);
  }, []);

  // Efecto para actualizar rutas cuando llegan nuevos waypoints
  useEffect(() => {
    if (waypointsData && selectedRouteId) {
      const parsedWaypoints = parseWaypointsForMapbox(waypointsData);

      if (parsedWaypoints.length > 0) {
        const newRoute: MapRoute = {
          id: `route-${selectedRouteId}`,
          waypoints: parsedWaypoints,
          color: '#007AFF', // Color azul por defecto
          routeId: selectedRouteId,
        };

        setMapRoutes(prev => {
          // Remover ruta existente si ya existe
          const filtered = prev.filter(route => route.routeId !== selectedRouteId);
          return [...filtered, newRoute];
        });
      }
    }
  }, [waypointsData, selectedRouteId]);

  return {
    mapRoutes,
    loading,
    error,
    addRouteToMap,
    removeRouteFromMap,
    clearAllRoutes,
  };
};
