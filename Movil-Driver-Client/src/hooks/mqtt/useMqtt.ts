import { useContext } from 'react';
import MqttContext from '@Contexts/mqtt/mqttContext';
import type { MqttContextType } from '@/types/mqtt';

export const useMqtt = (): MqttContextType => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error('useMqtt must be used within a MqttProvider');
  }
  return context;
};

// Hook personalizado para publicaciones más robustas
export const useMqttPublish = () => {
  const { client, connectionStatus, publish } = useMqtt();

  const publishSafely = (topic: string, data: any) => {
    try {
      // Validar que el cliente esté conectado
      if (connectionStatus !== 'Conectado') {
        console.log('❌ No se puede publicar: Cliente no conectado. Estado:', connectionStatus);
        return false;
      }

      // Validar que el topic no esté vacío
      if (!topic || typeof topic !== 'string') {
        console.log('❌ No se puede publicar: Topic inválido');
        return false;
      }

      // Validar que los datos no estén vacíos
      if (!data) {
        console.log('❌ No se puede publicar: Datos vacíos');
        return false;
      }

      // Convertir a JSON
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      
      // Validar que el JSON sea válido
      try {
        JSON.parse(message);
      } catch (error) {
        console.log('❌ No se puede publicar: JSON inválido');
        return false;
      }

      // Publicar con QoS 0 para evitar desconexiones
      publish(topic, message);
      return true;
    } catch (error) {
      console.log('❌ Error en publishSafely:', error);
      return false;
    }
  };

  const publishLocation = (location: { latitude: number; longitude: number; timestamp: number }) => {
    const message = {
      lat: location.latitude,
      lon: location.longitude,
      timestamp: location.timestamp,
    };
    const success = publishSafely('user/123/location', message);
    if (success) {
      console.log('📍 Ubicación publicada exitosamente');
    }
    return success;
  };

  const publishRecorridoStatus = (isActive: boolean, startTime?: string, endTime?: string) => {
    const message = {
      type: 'recorrido_status',
      isActive,
      startTime,
      endTime,
      timestamp: new Date().toISOString(),
    };
    const success = publishSafely('driver/recorrido', message);
    if (success) {
      console.log('📊 Estado de recorrido publicado exitosamente');
    }
    return success;
  };

  const publishConnectionStatus = (clientId: string) => {
    const message = {
      type: 'connection_status',
      status: 'connected',
      timestamp: new Date().toISOString(),
      clientId,
    };
    const success = publishSafely('driver/status', message);
    if (success) {
      console.log('🔗 Estado de conexión publicado exitosamente');
    }
    return success;
  };

  return {
    client,
    connectionStatus,
    publish,
    publishSafely,
    publishLocation,
    publishRecorridoStatus,
    publishConnectionStatus,
  };
};

export default useMqtt;
