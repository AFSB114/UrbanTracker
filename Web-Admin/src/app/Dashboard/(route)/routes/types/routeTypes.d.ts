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
  waypoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface RouteDetailsResponse {
  id?: number;
  active: boolean;
  numberRoute: string;
  description?: string;
  totalDistance: number;
  outboundImage?: File;
  returnImage?: File;
  waypoints: RouteWaypointResponse[];
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
  totalDistance: number;
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

export interface RouteStatistics {
  totalRoutes: number;
  activeRoutes: number;
  inactiveRoutes: number;
  newThisMonth: number;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export interface PaginationConfig {
  page: number;
  itemsPerPage: number;
}

export interface UseRoutesReturn {
  routes: RouteResponse[];
  filteredRoutes: RouteResponse[];
  paginatedRoutes: RouteResponse[];
  searchTerm: string;
  statusFilter: string;
  statistics: RouteStatistics;
  pagination: PaginationData;
  loading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  fetchRoutes: () => Promise<void>;
}
