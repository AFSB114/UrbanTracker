import { useState, useEffect, useRef } from 'react';

// Tipo para la ubicación recibida
export interface LocationData {
  lat: number;
  lon: number;
  timestamp: number;
}

export interface MQTTConfig {
  broker: string;
  port: number;
  username?: string;
  password?: string;
  topic: string;
}

export const useMQTT = (config: MQTTConfig) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastLocation, setLastLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    // Función para conectar al broker MQTT
    const connectToMQTT = async () => {
      try {
        // Para React Native, necesitamos usar la implementación de WebSocket para MQTT
        const mqtt = require('react-native-mqtt');
        
        const clientId = `mobile_client_${Math.random().toString(16).slice(3)}`;
        
        const client = mqtt.createClient({
          uri: `ws://${config.broker}:${config.port}`,
          clientId,
          username: config.username,
          password: config.password,
          automaticReconnect: true,
          reconnectPeriod: 3000,
        });

        clientRef.current = client;

        // Event listeners
        client.on('connected', () => {
          console.log('Conectado al broker MQTT');
          setIsConnected(true);
          setError(null);
          
          // Suscribirse al topic
          client.subscribe(config.topic, { qos: 0 }, (err: any) => {
            if (err) {
              console.error('Error suscribiéndose al topic:', err);
              setError('Error suscribiéndose al topic');
            } else {
              console.log(`Suscrito al topic: ${config.topic}`);
            }
          });
        });

        client.on('message', (topic: string, message: any) => {
          try {
            const payload = message.toString();
            console.log('Mensaje recibido:', payload);
            
            const locationData: LocationData = JSON.parse(payload);
            
            // Validar que los datos tengan el formato esperado
            if (typeof locationData.lat === 'number' && 
                typeof locationData.lon === 'number' && 
                typeof locationData.timestamp === 'number') {
              setLastLocation(locationData);
            } else {
              console.error('Formato de ubicación inválido:', locationData);
              setError('Formato de ubicación inválido');
            }
          } catch (parseError) {
            console.error('Error parseando mensaje MQTT:', parseError);
            setError('Error parseando mensaje MQTT');
          }
        });

        client.on('error', (err: any) => {
          console.error('Error MQTT:', err);
          setError('Error de conexión MQTT');
          setIsConnected(false);
        });

        client.on('offline', () => {
          console.log('Cliente MQTT desconectado');
          setIsConnected(false);
        });

        client.on('reconnect', () => {
          console.log('Reconectando al broker MQTT...');
        });

        // Conectar
        client.connect();

      } catch (connectionError) {
        console.error('Error conectando a MQTT:', connectionError);
        setError('Error conectando al broker');
      }
    };

    connectToMQTT();

    // Cleanup function
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
    };
  }, [config.broker, config.port, config.topic, config.username, config.password]);

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      setIsConnected(false);
      setLastLocation(null);
    }
  };

  const reconnect = () => {
    if (clientRef.current) {
      clientRef.current.connect();
    }
  };

  return {
    isConnected,
    lastLocation,
    error,
    disconnect,
    reconnect,
  };
};
