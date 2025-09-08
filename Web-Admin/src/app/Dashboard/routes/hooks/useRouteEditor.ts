import { useState, useCallback, useMemo } from 'react';
import { IRoute, RouteWaypoint } from '../types/routeTypes';
// Hook para el editor de rutas
export const useRouteEditor = (initialRoute?: Partial<IRoute>, initialWaypoints?: RouteWaypoint[]) => {
  const [route, setRoute] = useState<Partial<IRoute>>(initialRoute || {
    route_number: '',
    description: '',
    active: true
  });

  const [waypoints, setWaypoints] = useState<RouteWaypoint[]>(initialWaypoints || []);
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
      route.route_number?.trim() !== '' &&
      waypoints.length >= 2 &&
      errors.length === 0
    );
  }, [route.route_number, waypoints.length, errors.length]);

  const updateRoute = useCallback((updates: Partial<IRoute>) => {
    setRoute(prev => ({ ...prev, ...updates }));
    setErrors([]);
  }, []);

  const updateWaypoints = useCallback((newWaypoints: RouteWaypoint[]) => {
    const sortedWaypoints = newWaypoints.map((wp, index) => ({
      ...wp,
      sequence_order: index + 1
    }));
    setWaypoints(sortedWaypoints);
    setErrors([]);
  }, []);

  const addWaypointByCoords = useCallback((lat: number, lng: number) => {
    const newWaypoint: RouteWaypoint = {
      sequence_order: waypoints.length + 1,
      latitude: lat,
      longitude: lng
    };
    const updatedWaypoints = [...waypoints, newWaypoint];
    setWaypoints(updatedWaypoints);
  }, [waypoints]);

  const removeWaypoint = useCallback((index: number) => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index)
      .map((wp, i) => ({ ...wp, sequence_order: i + 1 }));
    setWaypoints(updatedWaypoints);
  }, [waypoints]);

  const validateRoute = useCallback((): string[] => {
    const validationErrors: string[] = [];
    if (!route.route_number?.trim()) {
      validationErrors.push('El número de ruta es obligatorio');
    }
    if (waypoints.length < 2) {
      validationErrors.push('La ruta debe tener al menos 2 puntos');
    }
    if (route.route_number && route.route_number.length > 20) {
      validationErrors.push('El número de ruta no puede exceder 20 caracteres');
    }
    setErrors(validationErrors);
    return validationErrors;
  }, [route.route_number, waypoints.length]);

  const prepareRouteData = useCallback(() => {
    const validationErrors = validateRoute();
    if (validationErrors.length > 0) {
      return null;
    }
    const routeData: IRoute = {
      ...route,
      route_number: route.route_number!,
      total_distance_km: totalDistance,
      updated_at: new Date().toISOString()
    };
    return { route: routeData, waypoints: waypoints };
  }, [route, waypoints, totalDistance, validateRoute]);

  const resetEditor = useCallback(() => {
    setRoute({
      route_number: '',
      description: '',
      active: true
    });
    setWaypoints([]);
    setErrors([]);
    setIsLoading(false);
  }, []);

  const loadRouteData = useCallback((routeData: Partial<IRoute>, waypointData: RouteWaypoint[]) => {
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