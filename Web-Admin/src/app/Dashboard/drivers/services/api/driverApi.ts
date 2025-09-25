import type { DriverFormData } from '../../types/driverTypes';
import { ApiClient } from '../../../utils/apiClient';
import { API_ENDPOINTS } from './config';
import type { CrudResponse, DriverApiResponse } from './types';

const apiClient = new ApiClient('http://localhost:8080');

export class DriversApi {
  static async getAllDrivers(): Promise<CrudResponse<DriverApiResponse[]>> {
    return apiClient.get<CrudResponse<DriverApiResponse[]>>(API_ENDPOINTS.DRIVERS);
  }

  static async getDriverById(id: number): Promise<CrudResponse<DriverApiResponse>> {
    return apiClient.get<CrudResponse<DriverApiResponse>>(`${API_ENDPOINTS.DRIVERS}/${id}`);
  }

  static async createDriver(driverData: DriverFormData): Promise<CrudResponse<DriverApiResponse>> {
    return apiClient.post<CrudResponse<DriverApiResponse>>(API_ENDPOINTS.DRIVERS, driverData);
  }

  static async updateDriver(id: number, driverData: DriverFormData): Promise<CrudResponse<DriverApiResponse>> {
    return apiClient.put<CrudResponse<DriverApiResponse>>(`${API_ENDPOINTS.DRIVERS}/${id}`, { ...driverData, id });
  }

  static async deleteDriver(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(`${API_ENDPOINTS.DRIVERS}/${id}`);
  }
}