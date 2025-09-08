
export interface RouteWaypoint {
  waypoint_id?: string;
  route_id?: number;
  sequence_order: number;
  latitude: number;
  longitude: number;
  created_at?: string;
}

export interface IRoute {
  route_id?: string;
  route_number: string;
  description?: string;
  total_distance_km?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}
