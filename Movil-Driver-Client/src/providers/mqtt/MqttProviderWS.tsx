import { useCallback, useEffect, useMemo, useState } from 'react';
import MqttContext from '../context/MqttContext';
import mqtt, { type MqttClient } from 'mqtt';
import type { MqttConnectionStatusType } from '../types';
import { Alert } from 'react-native';

export default function MqttProviderWS({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<MqttConnectionStatusType>('Desconectado');

  useEffect(() => {
    console.log('🌐 Iniciando conexión MQTT via WebSocket...');
    
    const ip = '172.30.7.183';
    const port = 9001; // Puerto WebSocket
    const url = `ws://${ip}:${port}`;
    
    console.log('🔗 URL WebSocket:', url);

    const options = {
      clientId: `mobile_ws_${Math.random().toString(16).substr(2, 8)}`,
      keepalive: 60,
      clean: true,
      connectTimeout: 30000,
      reconnectPeriod: 1000,
    };

    console.log('⚙️ Opciones WebSocket:', JSON.stringify(options, null, 2));

    try {
      const mqttClient = mqtt.connect(url, options);

      const timeoutId = setTimeout(() => {
        console.log('⏰ TIMEOUT WebSocket: La conexión tardó más de 15 segundos');
        setConnectionStatus('Error de conexión');
        mqttClient.end(true);
      }, 15000);

      mqttClient.on('connect', (connack) => {
        console.log('✅ ¡CONEXIÓN WEBSOCKET EXITOSA!');
        console.log('📝 Detalles connack:', connack);
        clearTimeout(timeoutId);
        setConnectionStatus('Conectado');
      });

      mqttClient.on('error', (err) => {
        console.log('❌ ERROR WebSocket:');
        console.log('  - Mensaje:', err.message);
        console.log('  - Código:', err.code);
        console.log('  - Stack:', err.stack);
        clearTimeout(timeoutId);
        setConnectionStatus('Error de conexión');
      });

      mqttClient.on('reconnect', () => {
        console.log('🔄 Reconectando WebSocket...');
        setConnectionStatus('Reconectando');
      });

      mqttClient.on('close', () => {
        console.log('🔌 WebSocket cerrado');
        clearTimeout(timeoutId);
        setConnectionStatus('Desconectado');
      });

      mqttClient.on('offline', () => {
        console.log('📴 WebSocket offline');
        setConnectionStatus('Desconectado');
      });

      setClient(mqttClient);

      return () => {
        console.log('🧹 Limpiando WebSocket...');
        clearTimeout(timeoutId);
        if (mqttClient) {
          mqttClient.end();
        }
      };
    } catch (error) {
      console.log('💥 Error al crear WebSocket cliente:', error);
      setConnectionStatus('Error de conexión');
    }
  }, []);

  const publish = useCallback((topic: string, message: string) => {
    console.log(`📤 Publicando via WebSocket en "${topic}":`, message);
    if (client && connectionStatus === 'Conectado') {
      client.publish(topic, message, (error) => {
        if (error) {
          console.log('❌ Error WebSocket publish:', error);
          Alert.alert('Error al publicar mensaje', error.message);
        } else {
          console.log('✅ Mensaje WebSocket publicado');
        }
      });
    } else {
      console.log('⚠️ WebSocket no conectado');
      console.log('  - Cliente existe:', !!client);
      console.log('  - Estado:', connectionStatus);
    }
  }, [client, connectionStatus]);

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
