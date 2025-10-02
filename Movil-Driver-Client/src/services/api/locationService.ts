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
    vehicleId: string = '123-456'
  ): boolean {
    try {
      // Validar datos de ubicación
      if (!this.validateLocationData(location)) {
        console.error('❌ Datos de ubicación inválidos:', location);
        return false;
      }

      // Generar topic dinámico basado en routeId
      const topic = generateLocationTopic(routeId || 'default');
      console.log('📍 Publicando ubicación en topic:', topic);

      const message = {
        vehicleId,
        routeId: routeId || null,
        timestamp: new Date(location.timestamp).toISOString(),
        latitude: location.latitude,
        longitude: location.longitude,
        source: 'MOVILE',
      };

      // Si se proporciona función de publicación, usarla
      if (publishFunction) {
        const success = publishFunction(topic, message);
        if (success) {
          console.log('📍 Ubicación publicada exitosamente en topic:', topic, message);
        }
        return success;
      }

      // Si no hay función de publicación, simular éxito para compatibilidad
      console.log('📍 Ubicación preparada para publicación (sin MQTT) en topic:', topic, message);
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
