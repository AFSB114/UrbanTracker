import type { Driver, DriverFormData } from '../types/driverTypes';
import { DriversApi } from './api/driverApi';
import type { DriverApiResponse } from './api/types';

export const driverService = {
  getAll: async (): Promise<Driver[]> => {
    const result = await DriversApi.getAllDrivers();
    if (!result.success) {
      console.error("Error cargando conductores:", result.message);
      throw new Error(result.message || "Error al cargar conductores");
    }
    console.log("Respuesta GET:", result);

    // Map API response to Driver interface and filter out inactive drivers
    return (result.data || [])
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
    const result = await DriversApi.createDriver(data);
    if (!result.success) {
      console.error("Error creando conductor:", result.message);
      throw new Error(result.message || "No se pudo crear el conductor");
    }
    console.log("Respuesta POST:", result);

    // Map API response to Driver interface
    const driverApi = result.data!;
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
    const result = await DriversApi.updateDriver(id, data);
    if (!result.success) {
      console.error("Error actualizando conductor:", result.message);
      throw new Error(result.message || "No se pudo actualizar el conductor");
    }
    console.log("Respuesta PUT:", result);

    // Map API response to Driver interface
    const driverApi = result.data!;
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
    const result = await DriversApi.deleteDriver(id);
    if (!result.success) {
      console.error("Error eliminando conductor:", result.message);
      throw new Error(result.message || "No se pudo eliminar el conductor");
    }
    console.log("Conductor eliminado exitosamente");
  },
};