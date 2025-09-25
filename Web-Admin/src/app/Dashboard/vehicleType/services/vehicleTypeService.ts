import { VehicleType, VehicleTypeFormData } from '../types/vehicleTypes';
import { VehicleTypesApi } from './api/vehicleTypeApi';

export const vehicleTypeService = {
  getAll: async (): Promise<VehicleType[]> => {
    const result = await VehicleTypesApi.getAllVehicleTypes();
    if (!result.success) {
      console.error("Error cargando tipos de vehículo:", result.message);
      throw new Error(result.message || "Error al cargar tipos de vehículo");
    }
    console.log("Respuesta GET:", result);
    return result.data || [];
  },

  create: async (data: VehicleTypeFormData): Promise<VehicleType> => {
    console.log("Enviando datos al backend:", data);
    const result = await VehicleTypesApi.createVehicleType(data);
    if (!result.success) {
      console.error("Error creando tipo de vehículo:", result.message);
      throw new Error(result.message || "No se pudo crear el tipo de vehículo");
    }
    console.log("Respuesta POST:", result);
    return result.data!;
  },

  update: async (id: number, data: VehicleTypeFormData): Promise<VehicleType> => {
    const result = await VehicleTypesApi.updateVehicleType(id, data);
    if (!result.success) {
      console.error("Error actualizando tipo de vehículo:", result.message);
      throw new Error(result.message || "No se pudo actualizar el tipo de vehículo");
    }
    console.log("Respuesta PUT:", result);
    return result.data!;
  },

  delete: async (id: number): Promise<void> => {
    const result = await VehicleTypesApi.deleteVehicleType(id);
    if (!result.success) {
      console.error("Error eliminando tipo de vehículo:", result.message);
      throw new Error(result.message || "No se pudo eliminar el tipo de vehículo");
    }
  }
};