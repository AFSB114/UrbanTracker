export interface RouteWaypointRequest {
  routeId?: number;
  sequence: number;
  latitude: number;
  longitude: number;
  type: 'WAYPOINT' | 'GEOMETRY';
  destine?: "OUTBOUND" | "RETURN";
}

export interface RouteRequest {
  numberRoute: string;
  description?: string;
  totalDistance: number;
}

export interface RouteWithWaypointsRequest extends RouteRequest {
  waypoints: RouteWaypointRequest[];
}

export interface RouteWaypointResponse {
  id?: number;
  active: boolean;
  routeId?: number;
  sequence: number;
  latitude: number;
  longitude: number;
  type: "WAYPOINT" | "GEOMETRY";
  destine?: "OUTBOUND" | "RETURN";
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

// New types for refactored route system
export interface RouteFormData {
  numberRoute: string;
  description: string;
  outboundImage: File | null;
  returnImage: File | null;
}

export interface RouteData {
  waypoints: RouteWaypointRequest[];
  geometry: GeoJSON.Geometry | null;
  distance: number;
}

export interface RouteFormState {
  formData: RouteFormData;
  outboundRoute: RouteData;
  returnRoute: RouteData;
  currentView: 'outbound' | 'return' | 'both';
}

export interface CompleteRouteData {
  numberRoute: string;
  description: string;
  outboundImage?: File;
  returnImage?: File;
  outboundRoute: { waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry };
  returnRoute: { waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry };
}

export interface MapEditorProps {
  mode: 'edit' | 'view';
  routeType: 'outbound' | 'return' | 'both';
  initialWaypoints?: RouteWaypointRequest[];
  initialGeometry?: GeoJSON.Geometry;
  onSave?: (waypoints: RouteWaypointRequest[], geometry: GeoJSON.Geometry) => void;
  onCancel?: () => void;
}
