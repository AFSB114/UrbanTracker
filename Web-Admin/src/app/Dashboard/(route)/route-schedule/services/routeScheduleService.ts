import { RouteScheduleApi } from './api/routeScheduleApi';
import { RouteScheduleRequest, RouteScheduleResponse, BulkRouteScheduleRequest } from '../types/routeScheduleTypes';

export const routeScheduleService = {
  async getAllRouteSchedules(): Promise<RouteScheduleResponse[]> {
    const response = await RouteScheduleApi.getAll();
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error fetching route schedules');
  },

  async getRouteScheduleById(id: number): Promise<RouteScheduleResponse> {
    const response = await RouteScheduleApi.getById(id);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error fetching route schedule');
  },

  async createRouteSchedule(data: RouteScheduleRequest): Promise<RouteScheduleResponse> {
    const response = await RouteScheduleApi.create(data);
    console.log('Create Response:', response); // Debug log
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error creating route schedule');
  },

  async updateRouteSchedule(id: number, data: RouteScheduleRequest): Promise<RouteScheduleResponse> {
    const response = await RouteScheduleApi.update(id, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error updating route schedule');
  },

  async deleteRouteSchedule(id: number): Promise<void> {
    const response = await RouteScheduleApi.delete(id);
    if (!response.success) {
      throw new Error(response.message || 'Error deleting route schedule');
    }
  },

  async getRouteSchedulesByRoute(routeId: number): Promise<RouteScheduleResponse[]> {
    const response = await RouteScheduleApi.getByRoute(routeId);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error fetching route schedules by route');
  },

  async createRouteSchedules(data: BulkRouteScheduleRequest): Promise<RouteScheduleResponse[]> {
    const response = await RouteScheduleApi.createBulk(data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error creating route schedules');
  },

  async updateRouteSchedules(routeId: number, data: BulkRouteScheduleRequest): Promise<RouteScheduleResponse[]> {
    const response = await RouteScheduleApi.updateBulk(routeId, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error updating route schedules');
  },

  async deleteRouteSchedulesByRoute(routeId: number): Promise<void> {
    const response = await RouteScheduleApi.deleteByRoute(routeId);
    if (!response.success) {
      throw new Error(response.message || 'Error deleting route schedules by route');
    }
  },
};