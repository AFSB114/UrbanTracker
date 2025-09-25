import type { VehicleAssigment, VehicleAssigmentFormData } from '../../types/VehicleAssigmentsType';
import { ApiClient } from '../../../utils/apiClient';
import { API_ENDPOINTS } from './config';
import type { CrudResponse } from './types';

const apiClient = new ApiClient('http://localhost:8080');

export class VehicleAssignmentsApi {
  static async getAllVehicleAssignments(): Promise<CrudResponse<VehicleAssigment[]>> {
    return apiClient.get<CrudResponse<VehicleAssigment[]>>(API_ENDPOINTS.VEHICLE_ASSIGNMENTS);
  }

  static async getVehicleAssignmentById(id: number): Promise<CrudResponse<VehicleAssigment>> {
    return apiClient.get<CrudResponse<VehicleAssigment>>(`${API_ENDPOINTS.VEHICLE_ASSIGNMENTS}/${id}`);
  }

  static async createVehicleAssignment(assignmentData: VehicleAssigmentFormData): Promise<CrudResponse<VehicleAssigment>> {
    return apiClient.post<CrudResponse<VehicleAssigment>>(API_ENDPOINTS.VEHICLE_ASSIGNMENTS, assignmentData);
  }

  static async updateVehicleAssignment(id: number, assignmentData: VehicleAssigmentFormData): Promise<CrudResponse<VehicleAssigment>> {
    return apiClient.put<CrudResponse<VehicleAssigment>>(`${API_ENDPOINTS.VEHICLE_ASSIGNMENTS}/${id}`, assignmentData);
  }

  static async deleteVehicleAssignment(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.VEHICLE_ASSIGNMENTS}/${id}`);
  }
}