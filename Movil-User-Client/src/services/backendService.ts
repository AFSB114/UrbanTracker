import { BACKEND_BASE_URL, ROUTES_ENDPOINT, WAYPOINTS_ENDPOINT } from '../constants/api';
import type { ApiResponse, Route, RouteWaypoint } from '../types/types';

export const fetchRoutes = async (): Promise<ApiResponse<Route[]>> => {
  try {
    const url = `${BACKEND_BASE_URL}${ROUTES_ENDPOINT}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<Route[]> = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};

export const fetchWaypoints = async (routeId: number): Promise<ApiResponse<RouteWaypoint[]>> => {
  try {
    const url = `${BACKEND_BASE_URL}${WAYPOINTS_ENDPOINT}/${routeId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<RouteWaypoint[]> = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching waypoints:', error);
    throw error;
  }
};
