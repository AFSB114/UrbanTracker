
import type { Vehicle, VehiculeFormData } from '../types/vehiculeTypes';

const API_URL = 'http://localhost:8080/api/v1/public/vehicle';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.error("Error cargando vehículos:", response.status, await response.text());
      throw new Error("Error al cargar vehículos");
    }
    const result = await response.json();
    console.log("Respuesta GET:", result);
    return result.data;
  },

  create: async (data: VehiculeFormData): Promise<Vehicle> => {
    console.log("Enviando datos al backend:", data);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error creando vehículo:", response.status, await response.text());
      throw new Error("No se pudo crear el vehículo");
    }

    const result = await response.json();
    console.log("Respuesta POST:", result);
    return result.data; // <- Aquí devolvemos solo el objeto vehículo
  },

  update: async (id: number, data: VehiculeFormData): Promise<Vehicle> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error actualizando vehículo:", response.status, await response.text());
      throw new Error("No se pudo actualizar el vehículo");
    }

    const result = await response.json();
    console.log("Respuesta PUT:", result);
    return result.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Error eliminando vehículo:", response.status, await response.text());
      throw new Error("No se pudo eliminar el vehículo");
    }
  }
};



