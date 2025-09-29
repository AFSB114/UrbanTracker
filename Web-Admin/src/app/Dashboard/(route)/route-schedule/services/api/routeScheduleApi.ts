import { ApiClient } from '../../../../utils/apiClient';
import { RouteScheduleRequest, RouteScheduleResponse, BulkRouteScheduleRequest } from '../../types/routeScheduleTypes';
import { API_ENDPOINTS } from './config';
import type { CrudResponse } from '../../../routes/services/api/types';

const apiClient = new ApiClient("http://localhost:8080");

export class RouteScheduleApi {
  static async getAll(): Promise<CrudResponse<RouteScheduleResponse[]>> {
    return apiClient.get<CrudResponse<RouteScheduleResponse[]>>(API_ENDPOINTS.ROUTE_SCHEDULES);
  }

  static async getById(id: number): Promise<CrudResponse<RouteScheduleResponse>> {
    return apiClient.get<CrudResponse<RouteScheduleResponse>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/${id}`);
  }

  static async create(data: RouteScheduleRequest): Promise<CrudResponse<RouteScheduleResponse>> {
    return apiClient.post<CrudResponse<RouteScheduleResponse>>(API_ENDPOINTS.ROUTE_SCHEDULES, data);
  }

  static async update(id: number, data: RouteScheduleRequest): Promise<CrudResponse<RouteScheduleResponse>> {
    return apiClient.put<CrudResponse<RouteScheduleResponse>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/${id}`, data);
  }

  static async delete(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/${id}`);
  }

  static async getByRoute(routeId: number): Promise<CrudResponse<RouteScheduleResponse[]>> {
    return apiClient.get<CrudResponse<RouteScheduleResponse[]>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/route/${routeId}`);
  }

  static async createBulk(data: BulkRouteScheduleRequest): Promise<CrudResponse<RouteScheduleResponse[]>> {
    return apiClient.post<CrudResponse<RouteScheduleResponse[]>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/bulk`, data.schedules);
  }

  static async updateBulk(routeId: number, data: BulkRouteScheduleRequest): Promise<CrudResponse<RouteScheduleResponse[]>> {
    return apiClient.put<CrudResponse<RouteScheduleResponse[]>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/bulk/${routeId}`, data.schedules);
  }

  static async deleteByRoute(routeId: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.ROUTE_SCHEDULES}/route/${routeId}`);
  }
}