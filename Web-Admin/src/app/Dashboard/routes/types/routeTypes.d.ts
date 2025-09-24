export interface RouteWaypointRequest {
  destination: "OUTBOUND" | "RETURN";
  sequence: number;
  latitude: number;
  longitude: number;
  type: string; // e.g. 'WAYPOINT' | 'GEOMETRY' | 'COMPLETE' | 'SELECTED'
  // Destination for the waypoint: OUTBOUND (ida) or RETURN (vuelta)
  destine?: "OUTBOUND" | "RETURN";
}

export interface RouteRequest {
  number: string;
  description?: string;
  totalDistance: number;
}

export interface RouteWithWaypointsRequest extends RouteRequest {
  waypoints: RouteWaypointRequest[];
  active?: boolean;
}

export interface RouteWaypointResponse {
  id?: number;
  active: boolean;
  routeId: number;
  sequence: number;
  latitude: number;
  longitude: number;
  destination?: "OUTBOUND" | "RETURN";
}

export interface RouteResponse {
  id?: number;
  active: boolean;
  numberRoute: string;
  description?: string;
  totalDistance: number;
  routeWaypoints: RouteWaypointResponse[];
}

export interface CrudResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  operation?: string;
  entityType?: string;
  timestamp: string;
  validationErrors?: string[];
}

export interface ResponseDTO<T> {
  message: string;
  status: string;
  data?: T;
}

// Type aliases for backward compatibility
export type Route = RouteResponse;
export type RouteWaypoint = RouteWaypointResponse;
export type RouteWithWaypoints = RouteResponse;
