import type { VehicleAssigment, VehicleAssigmentFormData } from "../types/VehicleAssigmentsType";

const API_URL = 'http://localhost:8080/api/v1/vehicle-assigment';

export const vehicleAssigmentService = {
  getAll: async (): Promise<VehicleAssigment[]> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.error("Error cargando asignaciones de vehículos:", response.status, await response.text());
      throw new Error("Error al cargar asignaciones de vehículos");
    }
    const result = await response.json();
    console.log("Respuesta GET:", result);
    return result.data;
  },

  create: async (data: VehicleAssigmentFormData): Promise<VehicleAssigment> => {
    console.log("Enviando datos al backend:", data);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error creando asignación de vehículo:", response.status, await response.text());
      throw new Error("No se pudo crear la asignación de vehículo");
    }

    const result = await response.json();
    console.log("Respuesta POST:", result);
    return result.data; 
  },

  update: async (id: number, data: VehicleAssigmentFormData): Promise<VehicleAssigment> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error actualizando asignación de vehículo:", response.status, await response.text());
      throw new Error("No se pudo actualizar la asignación de vehículo");
    }

    const result = await response.json();
    console.log("Respuesta PUT:", result);
    return result.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Error eliminando asignación de vehículo:", response.status, await response.text());
      throw new Error("No se pudo eliminar la asignación de vehículo");
    }
  },
};