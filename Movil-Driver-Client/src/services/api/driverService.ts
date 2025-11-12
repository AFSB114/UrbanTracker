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
   /**
 * Obtiene la placa del vehículo y el número de ruta asignados para un conductor
 * ✅ CORREGIDO: Usa los endpoints reales que existen en el backend
 */
static async getAssignedVehicleAndRoute(driverId: number): Promise<{ success: boolean; data?: DriverAssignedVehicleRoute; error?: string }> {
  try {
    console.log('🚗 [DriverService.getAssignedVehicleAndRoute] Iniciando consulta para driverId:', driverId);
    const token = await this.getAuthToken();
    if (!token) {
      console.log('❌ [DriverService.getAssignedVehicleAndRoute] No hay token disponible');
      return { success: false, error: 'No autenticado' };
    }

    // ✅ PASO 1: Obtener asignación del vehículo usando el endpoint REAL
    console.log('📡 [DriverService.getAssignedVehicleAndRoute] Consultando vehículo asignado...');
    const vehicleResponse = await fetch(`${API_BASE_URL}/vehicle-assigment/user/${driverId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 [DriverService.getAssignedVehicleAndRoute] Respuesta vehículo HTTP:', vehicleResponse.status);

    if (!vehicleResponse.ok) {
      console.log('❌ [DriverService.getAssignedVehicleAndRoute] Error obteniendo vehículo:', vehicleResponse.status);
      throw new Error(`Error obteniendo vehículo: ${vehicleResponse.status}`);
    }

    const vehicleResult = await vehicleResponse.json();
    console.log('📊 [DriverService.getAssignedVehicleAndRoute] Resultado vehículo:', vehicleResult);

    if (!vehicleResult.success || !vehicleResult.data) {
      console.log('⚠️ [DriverService.getAssignedVehicleAndRoute] No se encontró asignación de vehículo');
      return { success: false, error: vehicleResult.message || 'No se encontró asignación de vehículo' };
    }

    const vehicleData = vehicleResult.data;
    const vehicleId = vehicleData.vehicle?.id;

    if (!vehicleId) {
      console.log('⚠️ [DriverService.getAssignedVehicleAndRoute] No se encontró ID del vehículo');
      return { success: false, error: 'Datos del vehículo incompletos' };
    }

    // ✅ PASO 2: Obtener asignación de ruta usando el endpoint REAL
    console.log('🛣️ [DriverService.getAssignedVehicleAndRoute] Consultando ruta asignada para vehicleId:', vehicleId);
    let routeNumber = 0;
    let routeData = null;

    try {
      const routeResponse = await fetch(`${API_BASE_URL}/route-assignment/vehicle/${vehicleId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 [DriverService.getAssignedVehicleAndRoute] Respuesta ruta HTTP:', routeResponse.status);

      if (routeResponse.ok) {
        const routeResult = await routeResponse.json();
        console.log('📊 [DriverService.getAssignedVehicleAndRoute] Resultado ruta:', routeResult);

        if (routeResult.success && routeResult.data && routeResult.data.length > 0) {
          routeData = routeResult.data[0];
          routeNumber = routeData.routeId || routeData.route?.id || 0;
          console.log('✅ [DriverService.getAssignedVehicleAndRoute] Ruta encontrada:', routeNumber);
        } else {
          console.log('⚠️ [DriverService.getAssignedVehicleAndRoute] No se encontró ruta asignada');
        }
      } else {
        console.log('⚠️ [DriverService.getAssignedVehicleAndRoute] Error consultando ruta:', routeResponse.status);
      }
    } catch (routeError) {
      console.warn('⚠️ [DriverService.getAssignedVehicleAndRoute] Error consultando ruta:', routeError);
    }

    // ✅ PASO 3: Combinar datos en el formato esperado
    const combinedData: DriverAssignedVehicleRoute = {
      licencePlate: vehicleData.vehicle?.licensePlate || 'Sin placa',
      numberRoute: routeNumber
    };

    console.log('✅ [DriverService.getAssignedVehicleAndRoute] Datos finales combinados:', combinedData);
    return { 
      success: true, 
      data: combinedData
    };

  } catch (error) {
    console.error('❌ [DriverService.getAssignedVehicleAndRoute] Error general:', error);
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
