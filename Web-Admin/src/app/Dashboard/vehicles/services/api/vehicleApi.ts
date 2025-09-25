import type { Vehicle, VehiculeFormData } from '../../types/vehiculeTypes';
import { ApiClient } from '../../../utils/apiClient';
import { API_ENDPOINTS } from './config';
import type { CrudResponse } from './types';

const apiClient = new ApiClient('http://localhost:8080');

export class VehiclesApi {
  static async getAllVehicles(): Promise<CrudResponse<Vehicle[]>> {
    return apiClient.get<CrudResponse<Vehicle[]>>(API_ENDPOINTS.VEHICLES);
  }

  static async getVehicleById(id: number): Promise<CrudResponse<Vehicle>> {
    return apiClient.get<CrudResponse<Vehicle>>(`${API_ENDPOINTS.VEHICLES}/${id}`);
  }

  static async createVehicle(vehicleData: VehiculeFormData): Promise<CrudResponse<Vehicle>> {
    return apiClient.post<CrudResponse<Vehicle>>(API_ENDPOINTS.VEHICLES, vehicleData);
  }

  static async updateVehicle(id: number, vehicleData: VehiculeFormData): Promise<CrudResponse<Vehicle>> {
    return apiClient.put<CrudResponse<Vehicle>>(`${API_ENDPOINTS.VEHICLES}/${id}`, vehicleData);
  }

  static async deleteVehicle(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.VEHICLES}/${id}`);
  }
}