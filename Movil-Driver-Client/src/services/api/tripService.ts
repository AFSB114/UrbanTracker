import { API_BASE_URL } from '@/config/api';

export interface TripHistory {
  id: number;
  routeId: number;
  vehicleId: number;
  startTime: string;
  endTime?: string;
  trajectoryStatus: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export class TripService {
  /**
   * Obtiene el historial de viajes para un conductor
   * Nota: Actualmente usa el endpoint general, pero debería filtrarse por conductor
   */
  static async getTripHistory(driverId: number): Promise<{ success: boolean; data?: TripHistory[]; error?: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, error: 'No autenticado' };
      }

      // Por ahora, obtenemos todas las trayectorias
      // TODO: Implementar endpoint específico para obtener trayectorias por conductor
      const response = await fetch(`${API_BASE_URL}/public/route-trajectorie`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Filtrar trayectorias que podrían pertenecer al conductor
        // Esto es temporal hasta que se implemente el endpoint específico
        const filteredTrips = result.data.filter((trip: TripHistory) => {
          // Aquí podríamos agregar lógica para filtrar por vehicleId si está disponible
          return trip.active === false; // Solo mostrar viajes completados
        });

        return { success: true, data: filteredTrips };
      } else {
        return { success: false, error: result.message || 'No se pudo obtener el historial de viajes' };
      }
    } catch (error) {
      console.error('Error obteniendo historial de viajes:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Obtiene el historial de viajes para un vehículo específico
   */
  static async getTripHistoryByVehicle(vehicleId: number): Promise<{ success: boolean; data?: TripHistory[]; error?: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, error: 'No autenticado' };
      }

      // Por ahora, obtenemos todas las trayectorias y filtramos por vehicleId
      // TODO: Implementar endpoint específico para obtener trayectorias por vehículo
      const response = await fetch(`${API_BASE_URL}/public/route-trajectorie`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const filteredTrips = result.data.filter((trip: TripHistory) =>
          trip.vehicleId === vehicleId && trip.active === false
        );

        return { success: true, data: filteredTrips };
      } else {
        return { success: false, error: result.message || 'No se pudo obtener el historial de viajes' };
      }
    } catch (error) {
      console.error('Error obteniendo historial de viajes por vehículo:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Formatea los datos del historial para mostrar en la UI
   */
  static formatTripHistoryForDisplay(trips: TripHistory[]): Array<{
    id: string;
    fecha: string;
    inicio: string;
    fin: string;
  }> {
    return trips.map(trip => ({
      id: trip.id.toString(),
      fecha: new Date(trip.startTime).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      inicio: new Date(trip.startTime).toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      fin: trip.endTime ? new Date(trip.endTime).toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit'
      }) : 'En curso'
    }));
  }

  /**
   * Obtiene el token de autenticación almacenado
   */
  private static async getAuthToken(): Promise<string | null> {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  }
}