import type { RouteAssignment, RouteAssignmentFormData } from "../types/routeAssignmentTypes";
import { RouteAssignmentApi } from './api/routeAssignmentApi';

export const routeAssignmentService = {
  getAll: async (): Promise<RouteAssignment[]> => {
    const result = await RouteAssignmentApi.getAllRouteAssignments();
    if (!result.success) {
      console.error("Error cargando asignaciones de rutas:", result.message);
      throw new Error(result.message || "Error al cargar asignaciones de rutas");
    }
    console.log("Respuesta GET:", result);
    return result.data || [];
  },

  create: async (data: RouteAssignmentFormData): Promise<RouteAssignment> => {
    console.log("Enviando datos al backend:", data);
    const result = await RouteAssignmentApi.createRouteAssignment(data);
    if (!result.success) {
      console.error("Error creando asignación de ruta:", result.message);
      throw new Error(result.message || "No se pudo crear la asignación de ruta");
    }
    console.log("Respuesta POST:", result);
    return result.data!;
  },

  update: async (id: number, data: RouteAssignmentFormData): Promise<RouteAssignment> => {
    const result = await RouteAssignmentApi.updateRouteAssignment(id, data);
    if (!result.success) {
      console.error("Error actualizando asignación de ruta:", result.message);
      throw new Error(result.message || "No se pudo actualizar la asignación de ruta");
    }
    console.log("Respuesta PUT:", result);
    return result.data!;
  },

  delete: async (id: number): Promise<void> => {
    const result = await RouteAssignmentApi.deleteRouteAssignment(id);
    if (!result.success) {
      console.error("Error eliminando asignación de ruta:", result.message);
      throw new Error(result.message || "No se pudo eliminar la asignación de ruta");
    }
  },
};