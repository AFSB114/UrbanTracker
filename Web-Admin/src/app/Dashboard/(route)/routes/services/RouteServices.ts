import { useState } from 'react';
import { RoutesApi } from './api/routeApi';
import type { RouteRequest, RouteResponse, CrudResponse,  CompleteRouteData, RouteDetailsResponse } from '../types/routeTypes';

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

  const getRouteById = async (id: number, type: 'GEOMETRY' | 'WAYPOINT'): Promise<CrudResponse<RouteDetailsResponse>> => {
    return handleApiCall(() => RoutesApi.getRouteById(id, type));
  };

  const createRoute = async (route: RouteRequest): Promise<CrudResponse<RouteResponse>> => {
    return handleApiCall(() => RoutesApi.createRoute(route));
  };

  const updateRoute = async (
    id: number,
    route: CompleteRouteData
  ): Promise<CrudResponse<RouteResponse>> => {
    return handleApiCall(() => RoutesApi.updateRoute(id, route));
  };

  const deleteRoute = async (id: number): Promise<CrudResponse<void>> => {
    return handleApiCall(() => RoutesApi.deleteRoute(id));
  };

  const createRouteWithImages = async (
    routeData: CompleteRouteData
  ): Promise<CrudResponse<RouteResponse>> => {
    return handleApiCall(() => RoutesApi.createRouteWithImages(routeData));
  };

  return {
    loading,
    error,
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    createRouteWithImages,
  };
};