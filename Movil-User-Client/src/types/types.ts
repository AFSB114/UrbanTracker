export interface Route {
  id: number;
  numberRoute: string;
  description: string;
  totalDistance: number;
  active: boolean;
}

export interface RouteWaypoint {
  id: number;
  routeId: number;
  sequence: number;
  longitude: number;
  latitude: number;
}

export interface Waypoint {
  long: number;
  lat: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
