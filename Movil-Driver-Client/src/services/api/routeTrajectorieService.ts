import { API_ENDPOINTS, getCommonHeaders } from '@/config/api';
import { AuthService } from './authService';

export interface RouteTrajectorieCreateData {
  driverId: number;
  vehicleId: number;
  routeId?: string | null;
  startTime: string;
}

export interface RouteTrajectorieUpdateData {
  endTime: string;
}

export interface RouteTrajectorieResponse {
  id: string;
  driverId: string;
  startTime: string;
  endTime?: string;
  routeId?: string;
  createdAt: string;
  updatedAt: string;
}

export class RouteTrajectorieService {

  static async create(
    data: RouteTrajectorieCreateData
  ): Promise<{ success: boolean; data?: RouteTrajectorieResponse; error?: string }> {
    try {
      const token = await AuthService.getToken();
      if (!token) {
        return { success: false, error: 'No hay token de autenticación' };
      }

      console.log('📍 Creando registro de trayectoria de ruta:', data);

      const response = await fetch(API_ENDPOINTS.ROUTE_TRAJECTORIE.CREATE, {
        method: 'POST',
        headers: getCommonHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Error desconocido');
        console.error('❌ Error creando trayectoria:', response.status, errorText);
        return { success: false, error: `Error ${response.status}: ${errorText}` };
      }

      const result: RouteTrajectorieResponse = await response.json();
      console.log('✅ Registro de trayectoria creado exitosamente:', result.id);

      return { success: true, data: result };
    } catch (error) {
      console.error('❌ Error en create route trajectorie:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  static async update(
    id: string,
    data: RouteTrajectorieUpdateData
  ): Promise<{ success: boolean; data?: RouteTrajectorieResponse; error?: string }> {
    try {
      const token = await AuthService.getToken();
      if (!token) {
        return { success: false, error: 'No hay token de autenticación' };
      }

      console.log('📍 Actualizando registro de trayectoria:', id, data);

      const response = await fetch(API_ENDPOINTS.ROUTE_TRAJECTORIE.UPDATE(id), {
        method: 'PUT',
        headers: getCommonHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Error desconocido');
        console.error('❌ Error actualizando trayectoria:', response.status, errorText);
        return { success: false, error: `Error ${response.status}: ${errorText}` };
      }

      const result: RouteTrajectorieResponse = await response.json();
      console.log('✅ Registro de trayectoria actualizado exitosamente:', result.id);

      return { success: true, data: result };
    } catch (error) {
      console.error('❌ Error en update route trajectorie:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }
}
