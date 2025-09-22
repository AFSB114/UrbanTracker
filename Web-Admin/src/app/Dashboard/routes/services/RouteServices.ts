import { useState } from 'react';
import { RoutesApi } from './api/routeApi';
import type { RouteRequest, RouteWithWaypointsRequest, RouteResponse, CrudResponse, ResponseDTO } from '../types/routeTypes';

export const useRouteService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async <T>(
    apiCall: () => Promise<T>
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllRoutes = async (): Promise<CrudResponse<RouteResponse[]>> => {
    return handleApiCall(() => RoutesApi.getAllRoutes());
  };

  const getRouteById = async (id: number): Promise<CrudResponse<RouteResponse>> => {
    return handleApiCall(() => RoutesApi.getRouteById(id));
  };

  const createRoute = async (route: RouteRequest): Promise<CrudResponse<RouteResponse>> => {
    return handleApiCall(() => RoutesApi.createRoute(route));
  };

  const updateRoute = async (
    id: number,
    route: RouteRequest
  ): Promise<CrudResponse<RouteResponse>> => {
    return handleApiCall(() => RoutesApi.updateRoute(id, route));
  };

  const deleteRoute = async (id: number): Promise<CrudResponse<void>> => {
    return handleApiCall(() => RoutesApi.deleteRoute(id));
  };

  const createRouteWithWaypoints = async (
    routeWithWaypoints: RouteWithWaypointsRequest
  ): Promise<ResponseDTO> => {
    return handleApiCall(() => RoutesApi.createRouteWithWaypoints(routeWithWaypoints));
  };

  return {
    loading,
    error,
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    createRouteWithWaypoints,
  };
};