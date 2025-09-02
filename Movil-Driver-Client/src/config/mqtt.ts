// Configuración MQTT
export const MQTT_CONFIG = {
  // Broker configuration
  BROKER_URL: 'ws://172.30.7.183:9001',
  BROKER_HOST: '172.30.7.183',
  BROKER_PORT: 9001,
  
  // Client configuration
  CLIENT_ID_PREFIX: 'mobile_driver_',
  KEEPALIVE: 60,
  CONNECT_TIMEOUT: 30000,
  RECONNECT_PERIOD: 1000,
  
  // QoS levels - Usar QoS 0 para evitar desconexiones
  QOS: {
    AT_MOST_ONCE: 0,    // Fire and forget - Más estable
    AT_LEAST_ONCE: 1,   // Acknowledged delivery
    EXACTLY_ONCE: 2,    // Assured delivery
  },
  
  // Topics
  TOPICS: {
    DRIVER_STATUS: 'driver/status',
    DRIVER_RECORRIDO: 'driver/recorrido',
    USER_LOCATION: 'user/123/location',
  },
  
  // Message types
  MESSAGE_TYPES: {
    CONNECTION_STATUS: 'connection_status',
    RECORRIDO_STATUS: 'recorrido_status',
    LOCATION_UPDATE: 'location_update',
  },
  
  // Connection status
  CONNECTION_STATUS: {
    CONNECTED: 'Conectado',
    DISCONNECTED: 'Desconectado',
    RECONNECTING: 'Reconectando',
    ERROR: 'Error de conexión',
  },
  
  // Timeouts - Aumentados para mayor estabilidad
  TIMEOUTS: {
    CONNECTION: 20000,    // 20 segundos para conexión inicial
    PUBLISH_DELAY: 3000,  // 3 segundos antes de publicar después de conectar
    PUBLISH_INTERVAL: 1000, // 1 segundo entre publicaciones
  },
  
  // Configuraciones de estabilidad
  STABILITY: {
    MAX_RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 2000,
    PUBLISH_RETRY_DELAY: 1000,
  },
};

// Función para generar client ID único
export const generateClientId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(16).substr(2, 8);
  return `${MQTT_CONFIG.CLIENT_ID_PREFIX}${timestamp}_${random}`;
};

// Función para validar topic
export const isValidTopic = (topic: string): boolean => {
  return topic && typeof topic === 'string' && topic.length > 0;
};

// Función para validar mensaje JSON
export const isValidJsonMessage = (message: any): boolean => {
  try {
    if (typeof message === 'string') {
      JSON.parse(message);
    } else {
      JSON.stringify(message);
    }
    return true;
  } catch {
    return false;
  }
};

// Función para crear mensaje de estado de conexión
export const createConnectionStatusMessage = (clientId: string) => ({
  type: MQTT_CONFIG.MESSAGE_TYPES.CONNECTION_STATUS,
  status: 'connected',
  timestamp: new Date().toISOString(),
  clientId,
});

// Función para crear mensaje de estado de recorrido
export const createRecorridoStatusMessage = (
  isActive: boolean, 
  startTime?: string, 
  endTime?: string
) => ({
  type: MQTT_CONFIG.MESSAGE_TYPES.RECORRIDO_STATUS,
  isActive,
  startTime,
  endTime,
  timestamp: new Date().toISOString(),
});

// Función para crear mensaje de ubicación
export const createLocationMessage = (
  latitude: number, 
  longitude: number, 
  timestamp: number
) => ({
  lat: latitude,
  lon: longitude,
  timestamp,
});
