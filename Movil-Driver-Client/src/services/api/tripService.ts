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
    */
   static async getTripHistory(vehicleId: number): Promise<{ success: boolean; data?: TripHistory[]; error?: string }> {
     console.log('🔍 [TripService.getTripHistory] Iniciando consulta para vehicleId:', vehicleId);
     try {
       const token = await this.getAuthToken();
       if (!token) {
         console.log('❌ [TripService.getTripHistory] No hay token disponible');
         return { success: false, error: 'No autenticado' };
       }

       const url = `${API_BASE_URL}/route-trajectorie/vehicle/${vehicleId}`;
       console.log('📡 [TripService.getTripHistory] URL:', url);

       const response = await fetch(url, {
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json',
         },
       });

       console.log('📡 [TripService.getTripHistory] Respuesta HTTP:', response.status);

       if (!response.ok) {
         console.log('❌ [TripService.getTripHistory] Error HTTP:', response.status);
         throw new Error(`Error HTTP: ${response.status}`);
       }

       const result = await response.json();
       console.log('📊 [TripService.getTripHistory] Resultado JSON:', result);

       if (result.success && result.data) {
         // Filtrar solo viajes completados
         const completedTrips = result.data.filter((trip: TripHistory) => trip.active === false);
         console.log('✅ [TripService.getTripHistory] Viajes completados filtrados:', completedTrips.length);
         return { success: true, data: completedTrips };
       } else {
         console.log('⚠️ [TripService.getTripHistory] Respuesta sin éxito:', result);
         return { success: false, error: result.message || 'No se pudo obtener el historial de viajes' };
       }
     } catch (error) {
       console.error('❌ [TripService.getTripHistory] Error:', error);
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
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  }
}