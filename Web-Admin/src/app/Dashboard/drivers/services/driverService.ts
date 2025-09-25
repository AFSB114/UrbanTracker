import type { Driver, DriverFormData } from '../types/driverTypes';
import type { ApiResponseWrapper, DriverApiResponse } from './api/types';

const API_URL = 'http://localhost:8080/api/v1/public/driver';

export const driverService = {
  getAll: async (): Promise<Driver[]> => {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      console.error("Error cargando conductores:", response.status, await response.text());
      throw new Error("Error al cargar conductores");
    }
    const result: ApiResponseWrapper<DriverApiResponse[]> = await response.json();
    console.log("Respuesta GET:", result);

    // Map API response to Driver interface and filter out inactive drivers
    return result.data
      .filter((driverApi: DriverApiResponse) => driverApi.active)
      .map((driverApi: DriverApiResponse): Driver => ({
        id: driverApi.id,
        idNumber: driverApi.userId.toString(), // Assuming userId is the idNumber, adjust if needed
        firstName: driverApi.userProfile.firstName,
        lastName: driverApi.userProfile.lastName,
        email: driverApi.userProfile.email,
        phone: driverApi.userProfile.phone,
        createdAt: driverApi.createdAt,
        updatedAt: driverApi.updatedAt,
        active: driverApi.active,
      }));
  },

  create: async (data: DriverFormData): Promise<Driver> => {
    console.log("Enviando datos al backend:", data);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Error creando conductor:", response.status, await response.text());
      throw new Error("No se pudo crear el conductor");
    }

    const result: ApiResponseWrapper<DriverApiResponse> = await response.json();
    console.log("Respuesta POST:", result);

    // Map API response to Driver interface
    const driverApi = result.data;
    return {
      id: driverApi.id,
      idNumber: driverApi.userId.toString(),
      firstName: driverApi.userProfile.firstName,
      lastName: driverApi.userProfile.lastName,
      email: driverApi.userProfile.email,
      phone: driverApi.userProfile.phone,
      createdAt: driverApi.createdAt,
      updatedAt: driverApi.updatedAt,
      active: driverApi.active,
    };
  },

  update: async (id: number, data: DriverFormData): Promise<Driver> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id }), // Include id in the body
    });

    if (!response.ok) {
      console.error("Error actualizando conductor:", response.status, await response.text());
      throw new Error("No se pudo actualizar el conductor");
    }

    const result: ApiResponseWrapper<DriverApiResponse> = await response.json();
    console.log("Respuesta PUT:", result);

    // Map API response to Driver interface
    const driverApi = result.data;
    return {
      id: driverApi.id,
      idNumber: driverApi.userId.toString(),
      firstName: driverApi.userProfile.firstName,
      lastName: driverApi.userProfile.lastName,
      email: driverApi.userProfile.email,
      phone: driverApi.userProfile.phone,
      createdAt: driverApi.createdAt,
      updatedAt: driverApi.updatedAt,
      active: driverApi.active,
    };
  },

  delete: async (id: number): Promise<void> => {
    console.log("Eliminando conductor con ID:", id);
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      console.error("Error eliminando conductor:", response.status, await response.text());
      throw new Error("No se pudo eliminar el conductor");
    }
    console.log("Conductor eliminado exitosamente");
  },
};