import type { Driver, DriverFormData, DriverStatistics } from '../../types/driverTypes';
import { ApiClient } from './client';
import { API_ENDPOINTS } from './config';
import type { ApiResponse, PaginatedResponse } from './types';

const apiClient = new ApiClient('http://localhost:8085');
export interface GetDriversParams {
  page?: number;
  limit?: number;
  search?: string;
}

export class DriversApi {
  static async getDrivers(params: GetDriversParams = {}): Promise<PaginatedResponse<Driver>> {
    const queryParams: Record<string, string | number> = {};
    
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.search) queryParams.search = params.search;

    return apiClient.get<PaginatedResponse<Driver>>(API_ENDPOINTS.DRIVERS, queryParams);
  }

  static async createDriver(driverData: DriverFormData): Promise<ApiResponse<Driver>> {
    return apiClient.post<ApiResponse<Driver>>(API_ENDPOINTS.DRIVERS, driverData);
  }

  static async updateDriver(id: number, driverData: DriverFormData): Promise<ApiResponse<Driver>> {
    return apiClient.put<ApiResponse<Driver>>(`${API_ENDPOINTS.DRIVERS}/${id}`, driverData);
  }

  static async deleteDriver(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`${API_ENDPOINTS.DRIVERS}/${id}`);
  }

}