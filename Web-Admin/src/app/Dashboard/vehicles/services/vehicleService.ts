
import type { Vehicle, VehiculeFormData } from '../types/vehiculeTypes';
import { VehiclesApi } from './api/vehicleApi';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    const result = await VehiclesApi.getAllVehicles();
    if (!result.success) {
      console.error("Error cargando vehículos:", result.message);
      throw new Error(result.message || "Error al cargar vehículos");
    }
    console.log("Respuesta GET:", result);
    return result.data || [];
  },

  create: async (data: VehiculeFormData): Promise<Vehicle> => {
    console.log("Enviando datos al backend:", data);
    const result = await VehiclesApi.createVehicle(data);
    if (!result.success) {
      console.error("Error creando vehículo:", result.message);
      throw new Error(result.message || "No se pudo crear el vehículo");
    }
    console.log("Respuesta POST:", result);
    return result.data!;
  },

  update: async (id: number, data: VehiculeFormData): Promise<Vehicle> => {
    const result = await VehiclesApi.updateVehicle(id, data);
    if (!result.success) {
      console.error("Error actualizando vehículo:", result.message);
      throw new Error(result.message || "No se pudo actualizar el vehículo");
    }
    console.log("Respuesta PUT:", result);
    return result.data!;
  },

  delete: async (id: number): Promise<void> => {
    const result = await VehiclesApi.deleteVehicle(id);
    if (!result.success) {
      console.error("Error eliminando vehículo:", result.message);
      throw new Error(result.message || "No se pudo eliminar el vehículo");
    }
  }
};



