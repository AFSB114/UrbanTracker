import type { RouteResponse, RouteRequest, RouteWithWaypointsRequest } from '../../types/routeTypes';
import { ApiClient } from '../../../utils/apiClient';
import { API_ENDPOINTS } from './config';
import type { CrudResponse } from './types';

const apiClient = new ApiClient('http://localhost:8085');

export class RoutesApi {
  static async getAllRoutes(): Promise<CrudResponse<RouteResponse[]>> {
    return apiClient.get<CrudResponse<RouteResponse[]>>(API_ENDPOINTS.ROUTES);
  }

  static async getRouteById(id: number): Promise<CrudResponse<RouteResponse>> {
    return apiClient.get<CrudResponse<RouteResponse>>(`${API_ENDPOINTS.ROUTES}/${id}`);
  }

  static async createRoute(routeData: RouteRequest): Promise<CrudResponse<RouteResponse>> {
    return apiClient.post<CrudResponse<RouteResponse>>(API_ENDPOINTS.ROUTES, routeData);
  }

  static async updateRoute(id: number, routeData: RouteRequest): Promise<CrudResponse<RouteResponse>> {
    return apiClient.put<CrudResponse<RouteResponse>>(`${API_ENDPOINTS.ROUTES}/${id}`, routeData);
  }

  static async deleteRoute(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.ROUTES}/${id}`);
  }

  static async createRouteWithWaypoints(routeWithWaypointsData: RouteWithWaypointsRequest): Promise<CrudResponse<RouteResponse>> {
    return apiClient.post<CrudResponse<RouteResponse>>(`${API_ENDPOINTS.ROUTES}/with-waypoints`, routeWithWaypointsData);
  }
}