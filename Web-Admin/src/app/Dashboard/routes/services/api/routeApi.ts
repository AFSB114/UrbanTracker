import type {
  RouteResponse,
  RouteRequest,
  RouteWithWaypointsRequest,
  CompleteRouteData,
  RouteWaypointRequest,
} from "../../types/routeTypes";
import { ApiClient } from "../../../utils/apiClient";
import { API_ENDPOINTS } from "./config";
import type { CrudResponse } from "./types";

const apiClient = new ApiClient("http://localhost:8080");

export class RoutesApi {
  static async getAllRoutes(): Promise<CrudResponse<RouteResponse[]>> {
    return apiClient.get<CrudResponse<RouteResponse[]>>(API_ENDPOINTS.ROUTES);
  }

  static async getRouteById(id: number): Promise<CrudResponse<RouteResponse>> {
    return apiClient.get<CrudResponse<RouteResponse>>(
      `${API_ENDPOINTS.ROUTES}/${id}`
    );
  }

  static async createRoute(
    routeData: RouteRequest
  ): Promise<CrudResponse<RouteResponse>> {
    return apiClient.post<CrudResponse<RouteResponse>>(
      API_ENDPOINTS.ROUTES,
      routeData
    );
  }

  static async updateRoute(
    id: number,
    routeData: RouteRequest
  ): Promise<CrudResponse<RouteResponse>> {
    return apiClient.put<CrudResponse<RouteResponse>>(
      `${API_ENDPOINTS.ROUTES}/${id}`,
      routeData
    );
  }

  static async deleteRoute(id: number): Promise<CrudResponse<void>> {
    return apiClient.delete<CrudResponse<void>>(
      `${API_ENDPOINTS.ROUTES}/${id}`
    );
  }

  static async createRouteWithWaypoints(
    routeWithWaypointsData: RouteWithWaypointsRequest
  ): Promise<CrudResponse<RouteResponse>> {
    return apiClient.post<CrudResponse<RouteResponse>>(
      `${API_ENDPOINTS.ROUTES}/with-waypoints`,
      routeWithWaypointsData
    );
  }

  static async createRouteWithImages(
    routeData: CompleteRouteData
  ): Promise<CrudResponse<RouteResponse>> {
    const formData = new FormData();

    // Construir los waypoints combinando outbound y return con destine
    const waypointsGeometry: RouteWaypointRequest[] = [
      ...routeData.outboundRoute.geometry?.coordinates.map((c, i) => ({
        latitude: c[1],
        longitude: c[0],
        type: "GEOMETRY",
        destine: "OUTBOUND" as const,
        sequence: i,
      })),
      ...routeData.returnRoute.geometry?.coordinates.map((c, i) => ({
        latitude: c[1],
        longitude: c[0],
        type: "GEOMETRY",
        destine: "RETURN" as const,
        sequence: i,
      })),
    ];

    // Construir los waypoints combinando outbound y return con destine
    const waypoints: RouteWaypointRequest[] = [
      ...routeData.outboundRoute.waypoints.map((w) => ({
        ...w,
        destine: "OUTBOUND" as const,
      })),
      ...routeData.returnRoute.waypoints.map((w) => ({
        ...w,
        destine: "RETURN" as const,
      })),
    ];

    const uniqueWaypoints = [
      ...new Map(
        waypoints.map((wp) => [`${wp.sequence}-${wp.type}-${wp.destine}`, wp])
      ).values(),
    ];

    const waypointList = [...uniqueWaypoints, ...waypointsGeometry];

    // Calcular totalDistance (por ahora 0, ya que no está disponible en CompleteRouteData)
    const totalDistance = 0;
    console.log(
      uniqueWaypoints.filter(
        (wp) =>
          wp.destine?.toUpperCase().trim() === "OUTBOUND" &&
          wp.type === "WAYPOINT"
      )
    );

    // Agregar campos del RouteWithWaypointsRequest
    formData.append("numberRoute", routeData.numberRoute);
    formData.append("description", routeData.description);
    formData.append("totalDistance", totalDistance.toString());
    formData.append("waypoints", JSON.stringify(waypointList));

    // Agregar imágenes si existen
    if (routeData.outboundImage) {
      formData.append("outboundImage", routeData.outboundImage);
    }
    if (routeData.returnImage) {
      formData.append("returnImage", routeData.returnImage);
    }

    return apiClient.postFormData<CrudResponse<RouteResponse>>(
      `${API_ENDPOINTS.ROUTES}/with-images`,
      formData
    );
  }
}
