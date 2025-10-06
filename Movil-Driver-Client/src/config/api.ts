// Configuración de API
import Constants from 'expo-constants';
export const API_CONFIG = {
  BASE_URL: (Constants.expoConfig?.extra?.apiUrl as string) || 'http://192.168.0.110:8080/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Alias para compatibilidad
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Endpoints de la API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_CONFIG.BASE_URL}/public/auth/login`,
  },
  REPORTS: {
    SEND: `${API_CONFIG.BASE_URL}/reports`,
    LIST: `${API_CONFIG.BASE_URL}/reports`,
    STATS: `${API_CONFIG.BASE_URL}/reports/stats`,
  },
  TRACKING: {
    START: `${API_CONFIG.BASE_URL}/tracking/start`,
    END: `${API_CONFIG.BASE_URL}/tracking/end`,
    STATUS: `${API_CONFIG.BASE_URL}/tracking/status`,
  },
  ROUTE_TRAJECTORIE: {
    CREATE: `${API_CONFIG.BASE_URL}/public/route-trajectorie`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/public/route-trajectorie/${id}`,
  },
  VEHICLE_ASSIGNMENT: {
    GET_BY_USER: (userId: number) => `${API_CONFIG.BASE_URL}/vehicle-assigment/user/${userId}`,
  },
  ROUTE_ASSIGNMENT: {
    GET_BY_VEHICLE: (vehicleId: string) =>
      `${API_CONFIG.BASE_URL}/route-assignment/vehicle/${vehicleId}`,
  },
} as const;

// Headers comunes para las peticiones
export const getCommonHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// Configuración de manejo de errores
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión',
  TIMEOUT_ERROR: 'Tiempo de espera agotado',
  UNAUTHORIZED: 'No autorizado',
  FORBIDDEN: 'Acceso denegado',
  NOT_FOUND: 'Recurso no encontrado',
  SERVER_ERROR: 'Error interno del servidor',
  UNKNOWN_ERROR: 'Error desconocido',
} as const;
