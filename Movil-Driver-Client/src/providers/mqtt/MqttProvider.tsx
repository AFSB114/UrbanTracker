import { useCallback, useEffect, useMemo, useState } from 'react';
import MqttContext from '../context/MqttContext';
import mqtt, { type MqttClient } from 'mqtt';
import type { MqttConnectionStatusType } from '../types';
import { Alert } from 'react-native';

export default function MqttProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<MqttConnectionStatusType>('Desconectado');

  useEffect(() => {
    const ip = '192.168.1.18';

    // Configuración más específica para evitar protocol errors
    const options = {
      clientId: `mobile_driver_${Math.random().toString(16).substr(2, 8)}`,
      protocolVersion: 4, // MQTT 3.1.1
      keepalive: 60,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30000,
      rejectUnauthorized: false
    };

    console.log('Intentando conectar a MQTT con opciones:', options);
    const mqttClient = mqtt.connect(`mqtt://${ip}:1883`, options);

    mqttClient.on('connect', () => {
      setConnectionStatus('Conectado');
      console.log('Conexión establecida', '¡Bienvenido a Movil-Driver!');
    });

    mqttClient.on('error', (err) => {
      setConnectionStatus('Error de conexión');
      console.error('❌ Error de conexión MQTT:', err);
      console.error('Tipo de error:', typeof err);
      console.error('Mensaje del error:', err.message || 'Sin mensaje');
      console.error('Stack trace:', err.stack || 'No disponible');
      // No cerrar inmediatamente, dejar que el cliente maneje la reconexión
    });

    mqttClient.on('reconnect', () => {
      setConnectionStatus('Reconectando');
    });

    mqttClient.on('close', () => {
      setConnectionStatus('Desconectado');
      console.log('Conexión perdida', `Se perdió la conexión con el servidor ${ip}`);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  const publish = useCallback((topic: string, message: string) => {
    if (client) {
      client.publish(topic, message, (error) => {
        if (error) {
          Alert.alert('Error al publicar mensaje', error.message);
        }
      });
    }
  },[client]);

  const values = useMemo(
    () => ({
      client,
      connectionStatus,
      publish
    }),
    [client, connectionStatus, publish]
  );

  return <MqttContext.Provider value={values}>{children}</MqttContext.Provider>;
}
