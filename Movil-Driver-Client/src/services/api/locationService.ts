import type { Location } from '@/types/location';
import { MQTT_CONFIG, generateLocationTopic } from '@/config/mqtt';

export class LocationService {
  /**
   * Publica ubicación a través de MQTT usando el hook existente
   */
  static publishLocationData(
    location: Location,
    publishFunction?: (topic: string, data: any) => boolean,
    routeId?: string,
    vehicleId: string = '123-456',
    driverId?: string
  ): boolean {
    try {
      // Validar datos de ubicación
      if (!this.validateLocationData(location)) {
        console.error('❌ Datos de ubicación inválidos:', location);
        return false;
      }

      //  Generar topic dinámico - con routeId o fallback
      let topic: string;
      let actualRouteId: string | null;

      if (routeId) {
        // Ruta asignada - usar topic específico de la ruta
        topic = generateLocationTopic(routeId);
        actualRouteId = routeId;
        console.log('🛣️ Publicando en ruta asignada - Topic:', topic);
      } else {
        //  Sin ruta asignada - usar topic por vehículo y conductor
        const vehicleTopic = `vehicles/${vehicleId}/telemetry`;
        const driverTopic = `drivers/${driverId || 'unknown'}/telemetry`;
        
        // Priorizar topic por vehículo, fallback por conductor
        topic = vehicleTopic;
        actualRouteId = null;
        console.log('🚗 Publicando sin ruta asignada - Topic:', topic);
      }

      const message = {
        vehicleId,
        routeId: actualRouteId,
        timestamp: new Date(location.timestamp).toISOString(),
        latitude: location.latitude,
        longitude: location.longitude,
        source: 'MOVILE',
        
        hasAssignedRoute: !!routeId,
        trackingType: routeId ? 'assigned_route' : 'free_tracking'
      };

      // Si se proporciona función de publicación, usarla
      if (publishFunction) {
        const success = publishFunction(topic, message);
        if (success) {
          console.log('✅ Ubicación publicada exitosamente:', {
            topic,
            message,
            trackingType: routeId ? 'ruta_asignada' : 'libre'
          });
        }
        return success;
      }

      // Si no hay función de publicación, simular éxito para compatibilidad
      console.log('📍 Ubicación preparada para publicación:', {
        topic,
        message,
        trackingType: routeId ? 'ruta_asignada' : 'libre'
      });
      return true;
    } catch (error) {
      console.error('❌ Error publicando ubicación:', error);
      return false;
    }
  }

  /**
   * Valida si los datos de ubicación son válidos
   */
  static validateLocationData(location: Location): boolean {
    return (
      location &&
      typeof location.latitude === 'number' &&
      typeof location.longitude === 'number' &&
      typeof location.timestamp === 'number' &&
      location.latitude >= -90 &&
      location.latitude <= 90 &&
      location.longitude >= -180 &&
      location.longitude <= 180 &&
      location.timestamp > 0
    );
  }

  /**
   * Calcula distancia entre dos puntos geográficos
   */
  static calculateDistance(
    point1: { latitude: number; longitude: number },
    point2: { latitude: number; longitude: number }
  ): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) *
        Math.cos(this.toRadians(point2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Convertir a metros
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
