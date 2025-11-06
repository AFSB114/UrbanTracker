import { API_BASE_URL } from '@/config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export interface RouteAssignment {
  id: number;
  routeId: number;
  routeNumber: string;
  vehicleId: number;
  vehiclePlate: string;
  assignmentStatus: string;
  note?: string;
}

export interface DriverAssignedVehicleRoute {
  licencePlate: string;
  numberRoute: number;
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
   static async getRouteAssignments(vehicleId: number): Promise<{ success: boolean; data?: RouteAssignment[]; error?: string }> {
     try {
       const token = await this.getAuthToken();
       if (!token) {
         return { success: false, error: 'No autenticado' };
       }

       const response = await fetch(`${API_BASE_URL}/route-assignment/vehicle/${vehicleId}`, {
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
         return { success: false, error: result.message || 'No se pudo obtener las asignaciones de rutas' };
       }
     } catch (error) {
       console.error('Error obteniendo asignaciones de rutas:', error);
       return {
         success: false,
         error: error instanceof Error ? error.message : 'Error desconocido'
       };
     }
   }

  /**
    * Obtiene la placa del vehículo y el número de ruta asignados para un conductor
    */
   static async getAssignedVehicleAndRoute(driverId: number): Promise<{ success: boolean; data?: DriverAssignedVehicleRoute; error?: string }> {
     try {
       console.log('🚗 [DriverService.getAssignedVehicleAndRoute] Iniciando consulta para driverId:', driverId);
       const token = await this.getAuthToken();
       if (!token) {
         console.log('❌ [DriverService.getAssignedVehicleAndRoute] No hay token disponible');
         return { success: false, error: 'No autenticado' };
       }

       console.log('📡 [DriverService.getAssignedVehicleAndRoute] Enviando petición con token');
       const response = await fetch(`${API_BASE_URL}/driver/assigned-vehicle-route/${driverId}`, {
         method: 'GET',
         headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
         },
       });

       console.log('📡 [DriverService.getAssignedVehicleAndRoute] Respuesta HTTP:', response.status);

       if (!response.ok) {
         console.log('❌ [DriverService.getAssignedVehicleAndRoute] Error HTTP:', response.status);
         throw new Error(`Error HTTP: ${response.status}`);
       }

       const result = await response.json();
       console.log('📊 [DriverService.getAssignedVehicleAndRoute] Resultado:', result);

       if (result.success && result.data) {
         console.log('✅ [DriverService.getAssignedVehicleAndRoute] Datos obtenidos:', result.data);
         return { success: true, data: result.data };
       } else {
         console.log('⚠️ [DriverService.getAssignedVehicleAndRoute] Respuesta sin éxito:', result);
         return { success: false, error: result.message || 'No se pudo obtener la información del vehículo y ruta' };
       }
     } catch (error) {
       console.error('❌ [DriverService.getAssignedVehicleAndRoute] Error:', error);
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
      const token = await AsyncStorage.getItem('auth_token');
      console.log('🔑 [DriverService.getAuthToken] Token obtenido:', token ? 'presente' : 'null');
      return token;
    } catch (error) {
      console.error('❌ [DriverService.getAuthToken] Error obteniendo token:', error);
      return null;
    }
  }
}
