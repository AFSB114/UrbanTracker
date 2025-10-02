import { API_ENDPOINTS, getCommonHeaders } from '@/config/api';

export interface VehicleAssignmentResponse {
  id: string;
  vehicleId: string;
  driverId: string;
  assignmentStatus: string;
  vehicle?: {
    id: string;
    licensePlate: string;
    model: string;
    // otros campos del vehículo
  };
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    // otros campos del conductor
  };
}

export interface RouteAssignmentResponse {
  id: string;
  routeId: string;
  vehicleId: string;
  route?: {
    id: string;
    name: string;
    description?: string;
    // otros campos de la ruta
  };
}

export class DriverService {
  /**
   * Obtiene la asignación activa de vehículo para un usuario (conductor)
   */
  static async getVehicleAssignment(
    userId: number
  ): Promise<{ success: boolean; data?: VehicleAssignmentResponse; error?: string }> {
    try {
      console.log('🔍 [DriverService.getVehicleAssignment] Iniciando consulta...');
      console.log(
        '👤 [DriverService.getVehicleAssignment] userId:',
        userId,
        'tipo:',
        typeof userId
      );

      const token = await this.getToken();
      if (!token) {
        console.log('❌ [DriverService.getVehicleAssignment] No hay token de autenticación');
        return { success: false, error: 'No hay token de autenticación' };
      }

      console.log(
        '🔑 [DriverService.getVehicleAssignment] Token obtenido, longitud:',
        token.length
      );

      const url = API_ENDPOINTS.VEHICLE_ASSIGNMENT.GET_BY_USER(userId);
      console.log('🌐 [DriverService.getVehicleAssignment] URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: getCommonHeaders(token),
      });

      console.log(
        '📡 [DriverService.getVehicleAssignment] Respuesta HTTP:',
        response.status,
        response.statusText
      );
      console.log(
        '📡 [DriverService.getVehicleAssignment] Headers de respuesta:',
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Error desconocido');
        console.error(
          '❌ [DriverService.getVehicleAssignment] Error HTTP:',
          response.status,
          errorText
        );
        return { success: false, error: `Error ${response.status}: ${errorText}` };
      }

      const result = await response.json();
      console.log(
        '📦 [DriverService.getVehicleAssignment] Respuesta JSON completa:',
        JSON.stringify(result, null, 2)
      );
      console.log('📦 [DriverService.getVehicleAssignment] result.data:', result.data);
      console.log('📦 [DriverService.getVehicleAssignment] result.success:', result.success);

      if (result.data) {
        console.log('🚗 [DriverService.getVehicleAssignment] Vehículo asignado encontrado:');
        console.log('   - ID:', result.data.id);
        console.log('   - vehicleId:', result.data.vehicleId);
        console.log('   - driverId:', result.data.driverId);
        console.log('   - assignmentStatus:', result.data.assignmentStatus);
        if (result.data.vehicle) {
          console.log(
            '   - Vehículo:',
            result.data.vehicle.licensePlate,
            result.data.vehicle.model
          );
        }
      } else {
        console.log(
          '⚠️ [DriverService.getVehicleAssignment] No se encontró asignación de vehículo'
        );
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error('❌ [DriverService.getVehicleAssignment] Error en la consulta:', error);
      console.error(
        '❌ [DriverService.getVehicleAssignment] Stack trace:',
        error instanceof Error ? error.stack : 'No stack trace'
      );
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtiene las rutas asignadas a un vehículo
   */
  static async getRouteAssignments(
    vehicleId: string
  ): Promise<{ success: boolean; data?: RouteAssignmentResponse[]; error?: string }> {
    try {
      console.log('🔍 [DriverService.getRouteAssignments] Iniciando consulta...');
      console.log(
        '🚗 [DriverService.getRouteAssignments] vehicleId:',
        vehicleId,
        'tipo:',
        typeof vehicleId
      );

      const token = await this.getToken();
      if (!token) {
        console.log('❌ [DriverService.getRouteAssignments] No hay token de autenticación');
        return { success: false, error: 'No hay token de autenticación' };
      }

      console.log('🔑 [DriverService.getRouteAssignments] Token obtenido, longitud:', token.length);

      const url = API_ENDPOINTS.ROUTE_ASSIGNMENT.GET_BY_VEHICLE(vehicleId);
      console.log('🌐 [DriverService.getRouteAssignments] URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: getCommonHeaders(token),
      });

      console.log(
        '📡 [DriverService.getRouteAssignments] Respuesta HTTP:',
        response.status,
        response.statusText
      );
      console.log(
        '📡 [DriverService.getRouteAssignments] Headers de respuesta:',
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Error desconocido');
        console.error(
          '❌ [DriverService.getRouteAssignments] Error HTTP:',
          response.status,
          errorText
        );
        return { success: false, error: `Error ${response.status}: ${errorText}` };
      }

      const result = await response.json();
      console.log(
        '📦 [DriverService.getRouteAssignments] Respuesta JSON completa:',
        JSON.stringify(result, null, 2)
      );
      console.log('📦 [DriverService.getRouteAssignments] result.data:', result.data);
      console.log('📦 [DriverService.getRouteAssignments] result.success:', result.success);

      if (result.data && result.data.length > 0) {
        console.log(
          '🛣️ [DriverService.getRouteAssignments] Rutas asignadas encontradas:',
          result.data.length
        );
        result.data.forEach((route: RouteAssignmentResponse, index: number) => {
          console.log(`   - Ruta ${index + 1}:`);
          console.log('     - ID:', route.id);
          console.log('     - routeId:', route.routeId);
          console.log('     - vehicleId:', route.vehicleId);
          if (route.route) {
            console.log('     - Ruta info:', route.route.name, route.route.description);
          }
        });
      } else {
        console.log(
          '⚠️ [DriverService.getRouteAssignments] No se encontraron rutas asignadas al vehículo'
        );
      }

      return { success: true, data: result.data || [] };
    } catch (error) {
      console.error('❌ [DriverService.getRouteAssignments] Error en la consulta:', error);
      console.error(
        '❌ [DriverService.getRouteAssignments] Stack trace:',
        error instanceof Error ? error.stack : 'No stack trace'
      );
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Obtiene el token de autenticación
   */
  private static async getToken(): Promise<string | null> {
    try {
      console.log('🔑 [DriverService.getToken] Obteniendo token de AsyncStorage...');
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const token = await AsyncStorage.getItem('auth_token');
      console.log(
        '🔑 [DriverService.getToken] Token obtenido:',
        token ? 'Presente' : 'Nulo',
        token ? `(${token.length} chars)` : ''
      );
      return token;
    } catch (error) {
      console.error('❌ [DriverService.getToken] Error obteniendo token:', error);
      return null;
    }
  }
}
