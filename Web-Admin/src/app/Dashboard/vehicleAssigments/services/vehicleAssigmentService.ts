import type { VehicleAssigment, VehicleAssigmentFormData } from "../types/VehicleAssigmentsType";
import { VehicleAssignmentsApi } from './api/vehicleAssigmentApi';

export const vehicleAssigmentService = {
  getAll: async (): Promise<VehicleAssigment[]> => {
    const result = await VehicleAssignmentsApi.getAllVehicleAssignments();
    if (!result.success) {
      console.error("Error cargando asignaciones de vehículos:", result.message);
      throw new Error(result.message || "Error al cargar asignaciones de vehículos");
    }
    console.log("Respuesta GET:", result);
    return result.data || [];
  },

  create: async (data: VehicleAssigmentFormData): Promise<VehicleAssigment> => {
    console.log("Enviando datos al backend:", data);
    const result = await VehicleAssignmentsApi.createVehicleAssignment(data);
    if (!result.success) {
      console.error("Error creando asignación de vehículo:", result.message);
      throw new Error(result.message || "No se pudo crear la asignación de vehículo");
    }
    console.log("Respuesta POST:", result);
    return result.data!;
  },

  update: async (id: number, data: VehicleAssigmentFormData): Promise<VehicleAssigment> => {
    const result = await VehicleAssignmentsApi.updateVehicleAssignment(id, data);
    if (!result.success) {
      console.error("Error actualizando asignación de vehículo:", result.message);
      throw new Error(result.message || "No se pudo actualizar la asignación de vehículo");
    }
    console.log("Respuesta PUT:", result);
    return result.data!;
  },

  delete: async (id: number): Promise<void> => {
    const result = await VehicleAssignmentsApi.deleteVehicleAssignment(id);
    if (!result.success) {
      console.error("Error eliminando asignación de vehículo:", result.message);
      throw new Error(result.message || "No se pudo eliminar la asignación de vehículo");
    }
  },
};