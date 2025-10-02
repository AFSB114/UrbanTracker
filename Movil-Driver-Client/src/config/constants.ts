// Constantes generales de la aplicación
export const APP_CONFIG = {
  NAME: 'UrbanTracker Driver',
  VERSION: '1.0.0',
  DESCRIPTION: 'Aplicación de seguimiento para conductores',
} as const;

// Configuración de ubicación
export const LOCATION_CONFIG = {
  UPDATE_INTERVAL: 5000, // 5 segundos
  DISTANCE_INTERVAL: 10, // 10 metros
  ACCURACY_THRESHOLD: 20, // 20 metros de precisión
  TIMEOUT: 15000, // 15 segundos de timeout
} as const;

// Configuración de MQTT
export const MQTT_TOPICS = {
  // LOCATION ahora es dinámico: route/{routeId}
  TRACKING_STATUS: 'driver/recorrido',
  CONNECTION_STATUS: 'driver/status',
  REPORTS: 'driver/reports',
} as const;

// Estados de conexión
export const CONNECTION_STATUS = {
  CONNECTED: 'Conectado',
  CONNECTING: 'Conectando',
  RECONNECTING: 'Reconectando',
  DISCONNECTED: 'Desconectado',
  ERROR: 'Error',
} as const;

// Estados de tracking
export const TRACKING_STATUS = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  PAUSED: 'Pausado',
} as const;

// Estados de recorrido
export const RECORRIDO_STATUS = {
  STARTED: 'En Recorrido',
  STOPPED: 'Detenido',
  PAUSED: 'Pausado',
} as const;

// Configuración de UI
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  MODAL_ANIMATION: 'slide',
} as const;

// Colores de estado
export const STATUS_COLORS = {
  SUCCESS: '#10b981', // green-500
  WARNING: '#f59e0b', // yellow-500
  ERROR: '#ef4444',   // red-500
  INFO: '#3b82f6',    // blue-500
  NEUTRAL: '#6b7280', // gray-500
} as const;

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PHONE: 'Teléfono inválido',
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max: number) => `No puede exceder ${max} caracteres`,
} as const;

// Configuración de almacenamiento local
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'auth_user',
  SETTINGS: 'app_settings',
  LAST_LOCATION: 'last_location',
} as const;