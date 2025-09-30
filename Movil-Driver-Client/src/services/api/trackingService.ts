export interface TrackingData {
  type: string;
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  timestamp: string;
}

export interface RecorridoStatus {
  isRecorridoActive: boolean;
  startTime?: string;
  endTime?: string;
}

import { MQTT_CONFIG } from '@/config/mqtt';

export class TrackingService {
  /**
   * Publica el estado del recorrido a través de MQTT
   */
  static publishRecorridoStatus(
    status: RecorridoStatus,
    publishFunction?: (topic: string, data: any) => boolean
  ): boolean {
    try {
      const message: TrackingData = {
        type: 'recorrido_status',
        isActive: status.isRecorridoActive,
        startTime: status.startTime,
        endTime: status.endTime,
        timestamp: new Date().toISOString(),
      };

      // Si se proporciona función de publicación, usarla
      if (publishFunction) {
        const success = publishFunction(MQTT_CONFIG.TOPICS.DRIVER_RECORRIDO, message);
        if (success) {
          console.log('📊 Estado de recorrido publicado exitosamente:', message);
        }
        return success;
      }

      // Si no hay función de publicación, simular éxito para compatibilidad
      console.log('📊 Estado de recorrido preparado para publicación (sin MQTT):', message);
      return true;
    } catch (error) {
      console.error('❌ Error publicando estado de recorrido:', error);
      return false;
    }
  }

  /**
   * Publica estado de conexión del conductor
   */
  static publishConnectionStatus(
    clientId: string,
    publishFunction?: (topic: string, data: any) => boolean
  ): boolean {
    try {
      const message = {
        type: 'connection_status',
        status: 'connected',
        timestamp: new Date().toISOString(),
        clientId,
      };

      // Si se proporciona función de publicación, usarla
      if (publishFunction) {
        const success = publishFunction(MQTT_CONFIG.TOPICS.DRIVER_STATUS, message);
        if (success) {
          console.log('🔗 Estado de conexión publicado exitosamente:', message);
        }
        return success;
      }

      // Si no hay función de publicación, simular éxito para compatibilidad
      console.log('🔗 Estado de conexión preparado para publicación (sin MQTT):', message);
      return true;
    } catch (error) {
      console.error('❌ Error publicando estado de conexión:', error);
      return false;
    }
  }

  /**
   * Calcula duración del recorrido en minutos
   */
  static calculateRecorridoDuration(startTime?: string, endTime?: string): number {
    if (!startTime) return 0;

    const start = new Date(startTime).getTime();
    const end = endTime ? new Date(endTime).getTime() : Date.now();

    return Math.floor((end - start) / (1000 * 60)); // Convertir a minutos
  }

  /**
   * Formatea tiempo de recorrido para mostrar en UI
   */
  static formatRecorridoTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}min`;
  }

  /**
   * Valida si un estado de recorrido es válido
   */
  static validateRecorridoStatus(status: RecorridoStatus): boolean {
    // Si está activo, debe tener hora de inicio
    if (status.isRecorridoActive && !status.startTime) {
      return false;
    }

    // Si no está activo pero tiene hora de fin, debe tener hora de inicio
    if (!status.isRecorridoActive && status.endTime && !status.startTime) {
      return false;
    }

    return true;
  }
}