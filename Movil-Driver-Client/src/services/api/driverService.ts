import { API_BASE_URL } from '@/config/api';

export interface VehicleAssignment {
  id: number;
  vehicleId: number;
  vehiclePlate: string;
  vehicleName: string;
  driverId: number;
  driverName: string;
  note?: string;
  assignmentStatus: string;
  active: boolean;
}

export class DriverService {
  /**
   * Obtiene la asignación de vehículo activa para un conductor
   */
  static async getVehicleAssignment(driverId: number): Promise<{ success: boolean; data?: VehicleAssignment; error?: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, error: 'No autenticado' };
      }

      const response = await fetch(`${API_BASE_URL}/vehicle-assigment/user/${driverId}`, {
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
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'No se pudo obtener la asignación de vehículo' };
      }
    } catch (error) {
      console.error('Error obteniendo asignación de vehículo:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Obtiene las asignaciones de rutas para un vehículo
   */
  static async getRouteAssignments(vehicleId: number): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return { success: false, error: 'No autenticado' };
      }

      // TODO: Implementar endpoint específico para obtener asignaciones de rutas por vehículo
      // Por ahora, retornamos un array vacío ya que no hay endpoint específico
      console.log('⚠️ getRouteAssignments no implementado completamente, retornando array vacío');
      return { success: true, data: [] };
    } catch (error) {
      console.error('Error obteniendo asignaciones de rutas:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  /**
   * Obtiene el token de autenticación almacenado
   */
  private static async getAuthToken(): Promise<string | null> {
    try {
      // Asumiendo que el token se almacena en AsyncStorage
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  }
}
