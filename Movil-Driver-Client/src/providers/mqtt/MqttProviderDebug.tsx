import { useCallback, useEffect, useMemo, useState } from 'react';
import MqttContext from '../context/MqttContext';
import mqtt, { type MqttClient } from 'mqtt';
import type { MqttConnectionStatusType } from '../types';
import { Alert } from 'react-native';

export default function MqttProviderDebug({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<MqttConnectionStatusType>('Desconectado');

  useEffect(() => {
    console.log('🔍 Iniciando diagnóstico de MQTT...');
    
    // Intentar primero con localhost para ver si funciona localmente
    const ip = '192.168.1.18'; // Cambiado temporalmente para diagnóstico
    const port = 1883;
    const url = `mqtt://${ip}:${port}`;
    
    console.log('📡 URL de conexión:', url);

    const options = {
      clientId: `debug_client_${Date.now()}`,
      keepalive: 30,
      clean: true,
      connectTimeout: 5000, // Reducido para diagnóstico rápido
      reconnectPeriod: 100, // Deshabilitado para diagnóstico
    };

    console.log('⚙️ Opciones de conexión:', JSON.stringify(options, null, 2));

    try {
      console.log('🚀 Creando cliente MQTT...');
      const mqttClient = mqtt.connect(url, options);
      
      console.log('📋 Cliente creado, configurando eventos...');

      // Timeout manual
      const timeoutId = setTimeout(() => {
        console.log('⏰ TIMEOUT: La conexión tardó más de 10 segundos');
        setConnectionStatus('Error de conexión');
        mqttClient.end(true);
      }, 10000);

      mqttClient.on('connect', (connack) => {
        console.log('✅ ¡CONEXIÓN EXITOSA!');
        console.log('📝 Detalles de conexión:', connack);
        clearTimeout(timeoutId);
        setConnectionStatus('Conectado');
      });

      mqttClient.on('error', (err) => {
        console.log('❌ ERROR en cliente MQTT:');
        console.log('  - Tipo:', typeof err);
        console.log('  - Mensaje:', err.message);
        console.log('  - Código:', err.code);
        console.log('  - Stack:', err.stack);
        console.log('  - Error completo:', JSON.stringify(err, null, 2));
        clearTimeout(timeoutId);
        setConnectionStatus('Error de conexión');
      });

      mqttClient.on('reconnect', () => {
        console.log('🔄 Intentando reconectar...');
        setConnectionStatus('Reconectando');
      });

      mqttClient.on('close', () => {
        console.log('🔌 Conexión cerrada');
        clearTimeout(timeoutId);
        setConnectionStatus('Desconectado');
      });

      mqttClient.on('offline', () => {
        console.log('📴 Cliente offline');
        setConnectionStatus('Desconectado');
      });

      mqttClient.on('disconnect', (packet) => {
        console.log('🔌 Desconectado:', packet);
        setConnectionStatus('Desconectado');
      });

      console.log('📡 Cliente configurado, esperando conexión...');
      setClient(mqttClient);

      return () => {
        console.log('🧹 Limpiando cliente MQTT...');
        clearTimeout(timeoutId);
        if (mqttClient) {
          mqttClient.end();
        }
      };
    } catch (error) {
      console.log('💥 Error al crear cliente MQTT:', error);
      setConnectionStatus('Error de conexión');
    }
  }, []);

  const publish = useCallback((topic: string, message: string) => {
    console.log(`📤 Intentando publicar en topic "${topic}":`, message);
    if (client && connectionStatus === 'Conectado') {
      client.publish(topic, message, (error) => {
        if (error) {
          console.log('❌ Error al publicar:', error);
          Alert.alert('Error al publicar mensaje', error.message);
        } else {
          console.log('✅ Mensaje publicado exitosamente');
        }
      });
    } else {
      console.log('⚠️ No se puede publicar: Cliente no conectado');
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
