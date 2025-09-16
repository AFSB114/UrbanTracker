import type { MapMouseEvent } from "mapbox-gl";

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

export interface RouteType {
  number: string;
  description?: string;
  active: boolean;
}

export interface RouteWaypointType {
  sequence: number;
  lng: number;
  lat: number;
}

interface GeometryType {
  coordinates: GeoJSON.Feature<GeoJSON.LineString>;
  type: string;
  properties?: Object;
}

export interface ShowRouteType {
  type: string;
  geometry: GeometryType;
}

export interface MapboxContextType { 
  waypointList: RouteWaypointType[];
  handleAddWaypoint: (e: MapMouseEvent) => void;

}