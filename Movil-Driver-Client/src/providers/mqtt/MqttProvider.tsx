import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import MqttContext from '@Contexts/mqtt/mqttContext';
import mqtt, { type MqttClient } from 'mqtt';
import type { MqttConnectionStatus, MqttProviderConditionalProps } from '@/types/mqtt';
import { Alert } from 'react-native';
import { MQTT_CONFIG, generateClientId, createConnectionStatusMessage } from '@/config/mqtt';

export default function MqttProvider({
  children,
  shouldConnect = false,
  isAuthenticated = false,
}: MqttProviderConditionalProps) {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<MqttConnectionStatus>('Desconectado');
  const clientRef = useRef<MqttClient | null>(null);
  const isConnectingRef = useRef(false);

  useEffect(() => {
    // Solo conectar si está autenticado Y shouldConnect es true
    if (!isAuthenticated || !shouldConnect) {
      // Si hay un cliente conectado, desconectarlo
      if (clientRef.current) {
        console.log('🔌 Desconectando MQTT porque no se cumplen condiciones...');
        clientRef.current.end(true);
        clientRef.current = null;
        setClient(null);
        setConnectionStatus('Desconectado');
      }
      return;
    }

    // Evitar múltiples conexiones simultáneas
    if (isConnectingRef.current || (clientRef.current && connectionStatus === 'Conectado')) {
      console.log('✅ MQTT ya está conectado o conectándose');
      return;
    }

    console.log('🌐 Iniciando conexión MQTT condicional...');
    console.log('  - Autenticado:', isAuthenticated);
    console.log('  - Debe conectar:', shouldConnect);

    isConnectingRef.current = true;
    const url = MQTT_CONFIG.BROKER_URL;
    console.log('🔗 URL WebSocket:', url);

    const options = {
      clientId: generateClientId(),
      keepalive: MQTT_CONFIG.KEEPALIVE,
      clean: true,
      connectTimeout: MQTT_CONFIG.CONNECT_TIMEOUT,
      reconnectPeriod: MQTT_CONFIG.RECONNECT_PERIOD,
      // Configuraciones adicionales para estabilidad
      reschedulePings: true,
      queueQoSZero: false,
    };

    console.log('⚙️ Opciones WebSocket:', JSON.stringify(options, null, 2));

    try {
      const mqttClient = mqtt.connect(url, options);
      clientRef.current = mqttClient;

      const timeoutId = setTimeout(() => {
        console.log('⏰ TIMEOUT WebSocket: La conexión tardó más de 15 segundos');
        setConnectionStatus('Error de conexión');
        if (mqttClient) {
          mqttClient.end(true);
        }
        isConnectingRef.current = false;
      }, MQTT_CONFIG.TIMEOUTS.CONNECTION);

      mqttClient.on('connect', (connack) => {
        console.log('✅ ¡CONEXIÓN WEBSOCKET CONDICIONAL EXITOSA!');
        console.log('📝 Detalles connack:', connack);
        clearTimeout(timeoutId);
        setConnectionStatus('Conectado');
        setClient(mqttClient);
        isConnectingRef.current = false;

        // Esperar más tiempo antes de publicar el estado de conexión
        setTimeout(() => {
          try {
            if (mqttClient && mqttClient.connected) {
              const connectionMessage = createConnectionStatusMessage(options.clientId);
              const messageString = JSON.stringify(connectionMessage);

              console.log('📤 Publicando estado de conexión...');
              mqttClient.publish(
                MQTT_CONFIG.TOPICS.DRIVER_STATUS,
                messageString,
                { qos: 0 }, // Usar QoS 0 para evitar problemas
                (error) => {
                  if (error) {
                    console.log('❌ Error publicando estado de conexión:', error);
                  } else {
                    console.log('✅ Estado de conexión publicado exitosamente');
                  }
                }
              );
            }
          } catch (error) {
            console.log('❌ Error preparando mensaje de conexión:', error);
          }
        }, 3000); // Esperar 3 segundos
      });

      mqttClient.on('error', (err) => {
        console.log('❌ ERROR WebSocket Condicional:');
        console.log('  - Mensaje:', err.message);
        console.log('  - Código:', (err as any).code ?? 'N/A');
        console.log('  - Stack:', err.stack);
        clearTimeout(timeoutId);
        setConnectionStatus('Error de conexión');
        isConnectingRef.current = false;
      });

      mqttClient.on('reconnect', () => {
        console.log('🔄 Reconectando WebSocket Condicional...');
        setConnectionStatus('Reconectando');
      });

      mqttClient.on('close', () => {
        console.log('🔌 WebSocket Condicional cerrado');
        clearTimeout(timeoutId);
        setConnectionStatus('Desconectado');
        setClient(null);
        clientRef.current = null;
        isConnectingRef.current = false;
      });

      mqttClient.on('offline', () => {
        console.log('📴 WebSocket Condicional offline');
        setConnectionStatus('Desconectado');
        setClient(null);
        clientRef.current = null;
        isConnectingRef.current = false;
      });

      return () => {
        console.log('🧹 Limpiando WebSocket Condicional...');
        clearTimeout(timeoutId);
        if (mqttClient) {
          mqttClient.end(true);
        }
        isConnectingRef.current = false;
      };
    } catch (error) {
      console.log('💥 Error al crear WebSocket cliente condicional:', error);
      setConnectionStatus('Error de conexión');
      isConnectingRef.current = false;
    }
  }, [isAuthenticated, shouldConnect]); // Removidas las dependencias problemáticas

  const publish = useCallback(
    (topic: string, message: string) => {
      // Validaciones básicas
      if (!topic || !message) {
        console.log('❌ Error: Topic o mensaje vacío');
        return;
      }

      const currentClient = clientRef.current;
      if (!currentClient) {
        console.log('❌ Error: Cliente MQTT no disponible');
        return;
      }

      if (!currentClient.connected) {
        console.log('❌ Error: Cliente no conectado. Estado actual:', connectionStatus);
        return;
      }

      try {
        console.log(`📤 Publicando via WebSocket Condicional en "${topic}":`, message);

        // Validar que el mensaje sea JSON válido
        JSON.parse(message);

        // Usar QoS 0 para evitar problemas de desconexión
        currentClient.publish(topic, message, { qos: 0 }, (error) => {
          if (error) {
            console.log('❌ Error WebSocket Condicional publish:', error);
            console.log('  - Topic:', topic);
            console.log('  - Mensaje:', message);
            console.log('  - Error:', error.message);
            // No mostrar alerta para evitar interrupciones
            console.log('⚠️ Error de publicación, pero manteniendo conexión');
          } else {
            console.log('✅ Mensaje WebSocket Condicional publicado exitosamente');
            console.log('  - Topic:', topic);
          }
        });
      } catch (error) {
        console.log('❌ Error validando JSON del mensaje:', error);
        // No mostrar alerta para evitar interrupciones
        console.log('⚠️ Error de validación JSON, pero manteniendo conexión');
      }
    },
    [connectionStatus] // Solo dependencia necesaria
  );

  const values = useMemo(
    () => ({
      client,
      connectionStatus,
      publish,
    }),
    [client, connectionStatus, publish]
  );

  return <MqttContext.Provider value={values}>{children}</MqttContext.Provider>;
}
