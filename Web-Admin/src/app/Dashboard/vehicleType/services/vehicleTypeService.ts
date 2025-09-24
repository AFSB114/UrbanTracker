import { VehicleType } from '../types/vehicleTypes';

const API_URL = 'http://localhost:8080/api/v1/vehicle-type';

export const vehicleTypeService = {
  getAll: async (): Promise<VehicleType[]> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.error("Error cargando tipos de vehículo:", response.status, await response.text());
      throw new Error("Error al cargar tipos de vehículo");
    }
    const result = await response.json();
    console.log("Respuesta GET:", result);
    return result.data;
  },

  create: async (data: VehicleType): Promise<VehicleType> => {
    console.log("Enviando datos al backend:", data);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error creando tipo de vehículo:", response.status, await response.text());
      throw new Error("No se pudo crear el tipo de vehículo");
    }

    const result = await response.json();
    console.log("Respuesta POST:", result);
    return result.data; // <- Aquí devolvemos solo el objeto tipo de vehículo
  },

  update: async (id: number, data: VehicleType): Promise<VehicleType> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error actualizando tipo de vehículo:", response.status, await response.text());
      throw new Error("No se pudo actualizar el tipo de vehículo");
    }

    const result = await response.json();
    console.log("Respuesta PUT:", result);
    return result.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Error eliminando tipo de vehículo:", response.status, await response.text());
      throw new Error("No se pudo eliminar el tipo de vehículo");
    }
  }
};