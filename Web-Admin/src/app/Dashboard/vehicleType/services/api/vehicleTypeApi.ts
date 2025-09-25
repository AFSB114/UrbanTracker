import type { VehicleType, VehicleTypeFormData } from '../../types/vehicleTypes';
import { ApiClient } from '../../../utils/apiClient';
import { API_ENDPOINTS } from './config';
import type { CrudResponse } from './types';

const apiClient = new ApiClient('http://localhost:8080');

export class VehicleTypesApi {
  static async getAllVehicleTypes(): Promise<CrudResponse<VehicleType[]>> {
    return apiClient.get<CrudResponse<VehicleType[]>>(API_ENDPOINTS.VEHICLE_TYPES);
  }

  static async getVehicleTypeById(id: number): Promise<CrudResponse<VehicleType>> {
    return apiClient.get<CrudResponse<VehicleType>>(`${API_ENDPOINTS.VEHICLE_TYPES}/${id}`);
  }

  static async createVehicleType(vehicleTypeData: VehicleTypeFormData): Promise<CrudResponse<VehicleType>> {
    return apiClient.post<CrudResponse<VehicleType>>(API_ENDPOINTS.VEHICLE_TYPES, vehicleTypeData);
  }

  static async updateVehicleType(id: number, vehicleTypeData: VehicleTypeFormData): Promise<CrudResponse<VehicleType>> {
    return apiClient.put<CrudResponse<VehicleType>>(`${API_ENDPOINTS.VEHICLE_TYPES}/${id}`, vehicleTypeData);
  }

  static async deleteVehicleType(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.VEHICLE_TYPES}/${id}`);
  }
}