import { useCallback, useEffect, useMemo, useState } from 'react';
import MqttContext from '../context/MqttContext';
import mqtt, { type MqttClient } from 'mqtt';
import type { MqttConnectionStatusType } from '../types';
import { Alert } from 'react-native';

interface MqttProviderConditionalProps {
  children: React.ReactNode;
  shouldConnect: boolean; // Prop para controlar si debe conectarse
  isAuthenticated: boolean; // Prop para verificar autenticación
}

export default function MqttProviderConditional({ 
  children, 
  shouldConnect = false, 
  isAuthenticated = false 
}: MqttProviderConditionalProps) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<MqttConnectionStatusType>('Desconectado');

  useEffect(() => {
    // Solo conectar si está autenticado Y shouldConnect es true
    if (!isAuthenticated || !shouldConnect) {
      // Si hay un cliente conectado, desconectarlo
      if (client) {
        console.log('🔌 Desconectando MQTT porque no se cumplen condiciones...');
        client.end();
        setClient(null);
        setConnectionStatus('Desconectado');
      }
      return;
    }

    // Si ya hay un cliente conectado, no crear otro
    if (client && connectionStatus === 'Conectado') {
      console.log('✅ MQTT ya está conectado');
      return;
    }

    console.log('🌐 Iniciando conexión MQTT condicional...');
    console.log('  - Autenticado:', isAuthenticated);
    console.log('  - Debe conectar:', shouldConnect);
    
    const ip = '172.30.7.183';
    const port = 9001; // Puerto WebSocket
    const url = `ws://${ip}:${port}`;
    
    console.log('🔗 URL WebSocket:', url);

    const options = {
      clientId: `mobile_conditional_${Math.random().toString(16).substr(2, 8)}`,
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
        console.log('✅ ¡CONEXIÓN WEBSOCKET CONDICIONAL EXITOSA!');
        console.log('📝 Detalles connack:', connack);
        clearTimeout(timeoutId);
        setConnectionStatus('Conectado');
      });

      mqttClient.on('error', (err) => {
        console.log('❌ ERROR WebSocket Condicional:');
        console.log('  - Mensaje:', err.message);
        console.log('  - Código:', err.code);
        console.log('  - Stack:', err.stack);
        clearTimeout(timeoutId);
        setConnectionStatus('Error de conexión');
      });

      mqttClient.on('reconnect', () => {
        console.log('🔄 Reconectando WebSocket Condicional...');
        setConnectionStatus('Reconectando');
      });

      mqttClient.on('close', () => {
        console.log('🔌 WebSocket Condicional cerrado');
        clearTimeout(timeoutId);
        setConnectionStatus('Desconectado');
      });

      mqttClient.on('offline', () => {
        console.log('📴 WebSocket Condicional offline');
        setConnectionStatus('Desconectado');
      });

      setClient(mqttClient);

      return () => {
        console.log('🧹 Limpiando WebSocket Condicional...');
        clearTimeout(timeoutId);
        if (mqttClient) {
          mqttClient.end();
        }
      };
    } catch (error) {
      console.log('💥 Error al crear WebSocket cliente condicional:', error);
      setConnectionStatus('Error de conexión');
    }
  }, [isAuthenticated, shouldConnect]); // Solo re-ejecutar cuando cambie la auth o shouldConnect

  const publish = useCallback((topic: string, message: string) => {
    console.log(`📤 Publicando via WebSocket Condicional en "${topic}":`, message);
    if (client && connectionStatus === 'Conectado') {
      client.publish(topic, message, (error) => {
        if (error) {
          console.log('❌ Error WebSocket Condicional publish:', error);
          Alert.alert('Error al publicar mensaje', error.message);
        } else {
          console.log('✅ Mensaje WebSocket Condicional publicado');
        }
      });
    } else {
      console.log('⚠️ WebSocket Condicional no conectado');
      console.log('  - Cliente existe:', !!client);
      console.log('  - Estado:', connectionStatus);
      console.log('  - Autenticado:', isAuthenticated);
      console.log('  - Debe conectar:', shouldConnect);
    }
  }, [client, connectionStatus, isAuthenticated, shouldConnect]);

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
