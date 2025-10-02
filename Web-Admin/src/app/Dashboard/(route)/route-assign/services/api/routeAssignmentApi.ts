import type { RouteAssignment, RouteAssignmentFormData } from '../../types/routeAssignmentTypes';
import { ApiClient } from '../../../../utils/apiClient';
import { API_ENDPOINTS } from './config';
import type { CrudResponse } from './types';

const apiClient = new ApiClient('http://localhost:8080');

export class RouteAssignmentApi {
  static async getAllRouteAssignments(): Promise<CrudResponse<RouteAssignment[]>> {
    return apiClient.get<CrudResponse<RouteAssignment[]>>(API_ENDPOINTS.ROUTE_ASSIGNMENTS);
  }

  static async getRouteAssignmentById(id: number): Promise<CrudResponse<RouteAssignment>> {
    return apiClient.get<CrudResponse<RouteAssignment>>(`${API_ENDPOINTS.ROUTE_ASSIGNMENTS}/${id}`);
  }

  static async createRouteAssignment(assignmentData: RouteAssignmentFormData): Promise<CrudResponse<RouteAssignment>> {
    return apiClient.post<CrudResponse<RouteAssignment>>(API_ENDPOINTS.ROUTE_ASSIGNMENTS, assignmentData);
  }

  static async updateRouteAssignment(id: number, assignmentData: RouteAssignmentFormData): Promise<CrudResponse<RouteAssignment>> {
    return apiClient.put<CrudResponse<RouteAssignment>>(`${API_ENDPOINTS.ROUTE_ASSIGNMENTS}/${id}`, assignmentData);
  }

  static async deleteRouteAssignment(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.ROUTE_ASSIGNMENTS}/${id}`);
  }
}