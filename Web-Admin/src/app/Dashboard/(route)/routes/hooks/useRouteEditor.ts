import { useState, useCallback, useMemo } from 'react';
import { Route, RouteWaypointRequest } from '../types/routeTypes';
// Hook para el editor de rutas
export const useRouteEditor = (initialRoute?: Partial<Route>, initialWaypoints?: RouteWaypointRequest[]) => {
  const [route, setRoute] = useState<Partial<Route>>(initialRoute || {
    numberRoute: '',
    description: '',
    active: true
  });

  const [waypoints, setWaypoints] = useState<RouteWaypointRequest[]>(initialWaypoints || []);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  const totalDistance = useMemo(() => {
    if (waypoints.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const distance = calculateDistance(
        waypoints[i].latitude,
        waypoints[i].longitude,
        waypoints[i + 1].latitude,
        waypoints[i + 1].longitude
      );
      total += distance;
    }
    return Math.round(total * 100) / 100;
  }, [waypoints, calculateDistance]);

  const isValid = useMemo(() => {
    return (
      route.numberRoute?.trim() !== '' &&
      waypoints.length >= 2 &&
      errors.length === 0
    );
  }, [route.numberRoute, waypoints.length, errors.length]);

  const updateRoute = useCallback((updates: Partial<Route>) => {
    setRoute(prev => ({ ...prev, ...updates }));
    setErrors([]);
  }, []);

  const updateWaypoints = useCallback((newWaypoints: RouteWaypointRequest[]) => {
    const sortedWaypoints = newWaypoints.map((wp, index) => ({
      ...wp,
      sequence: index + 1
    }));
    setWaypoints(sortedWaypoints);
    setErrors([]);
  }, []);

  const addWaypointByCoords = useCallback((lat: number, lng: number) => {
    const newWaypoint: RouteWaypointRequest = {
      sequence: waypoints.length + 1,
      latitude: lat,
      longitude: lng,
      type: "WAYPOINT"
    };
    const updatedWaypoints = [...waypoints, newWaypoint];
    setWaypoints(updatedWaypoints);
  }, [waypoints]);

  const removeWaypoint = useCallback((index: number) => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index)
      .map((wp, i) => ({ ...wp, sequence: i + 1 }));
    setWaypoints(updatedWaypoints);
  }, [waypoints]);

  const validateRoute = useCallback((): string[] => {
    const validationErrors: string[] = [];
    if (!route.numberRoute?.trim()) {
      validationErrors.push('El número de ruta es obligatorio');
    }
    if (waypoints.length < 2) {
      validationErrors.push('La ruta debe tener al menos 2 puntos');
    }
    if (route.numberRoute && route.numberRoute.length > 20) {
      validationErrors.push('El número de ruta no puede exceder 20 caracteres');
    }
    setErrors(validationErrors);
    return validationErrors;
  }, [route.numberRoute, waypoints.length]);

  const prepareRouteData = useCallback(() => {
    const validationErrors = validateRoute();
    if (validationErrors.length > 0) {
      return null;
    }
    const routeData: Route = {
      ...route,
      numberRoute: route.numberRoute!,
      totalDistance: totalDistance,
    } as Route;
    return { route: routeData, waypoints: waypoints };
  }, [route, waypoints, totalDistance, validateRoute]);

  const resetEditor = useCallback(() => {
    setRoute({
      numberRoute: '',
      description: '',
      active: true
    });
    setWaypoints([]);
    setErrors([]);
    setIsLoading(false);
  }, []);

  const loadRouteData = useCallback((routeData: Partial<Route>, waypointData: RouteWaypointRequest[]) => {
    setRoute(routeData);
    setWaypoints(waypointData);
    setErrors([]);
  }, []);

  return {
    route,
    waypoints,
    totalDistance,
    isValid,
    isLoading,
    errors,
    updateRoute,
    updateWaypoints,
    addWaypointByCoords,
    removeWaypoint,
    validateRoute,
    prepareRouteData,
    resetEditor,
    loadRouteData,
    setIsLoading
  };
}; 