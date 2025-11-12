// Configuración de API
import Constants from 'expo-constants';

// Configuración de URLs con fallback
export const API_ENDPOINTS_CONFIG = {
  // URL principal desde app.json
  PRIMARY: (Constants.expoConfig?.extra?.apiUrl as string) || 'http://10.3.235.237:8080/api/v1',
  
  // URLs de fallback con diferentes IPs comunes
  FALLBACKS: [
    'http://192.168.1.100:8080/api/v1',
    'http://localhost:8080/api/v1',
    'http://127.0.0.1:8080/api/v1',
    'http://10.0.2.2:8080/api/v1', 
  ],
  
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
  HEALTH_CHECK_ENDPOINT: '/health'
} as const;

export const API_CONFIG = {
  BASE_URL: API_ENDPOINTS_CONFIG.PRIMARY,
  TIMEOUT: API_ENDPOINTS_CONFIG.TIMEOUT,
  RETRY_ATTEMPTS: API_ENDPOINTS_CONFIG.RETRY_ATTEMPTS,
} as const;

// Función para probar conectividad con el backend
export const testBackendConnectivity = async (baseUrl: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${baseUrl}${API_ENDPOINTS_CONFIG.HEALTH_CHECK_ENDPOINT}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok || response.status !== 404; // Accept 404 as server is running
  } catch (error) {
    return false;
  }
};

// Función para encontrar la URL del backend disponible
export const findAvailableBackend = async (): Promise<string> => {
  const urls = [API_ENDPOINTS_CONFIG.PRIMARY, ...API_ENDPOINTS_CONFIG.FALLBACKS];
  
  for (const url of urls) {
    if (await testBackendConnectivity(url)) {
      console.log(`✅ Backend found at: ${url}`);
      return url;
    }
  }
  
  console.warn('⚠️ No available backend found, using primary URL');
  return API_ENDPOINTS_CONFIG.PRIMARY;
};

// Función mejorada de fetch con reintentos
export const fetchWithRetry = async (url: string, options: RequestInit, retries = API_CONFIG.RETRY_ATTEMPTS): Promise<Response> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`⚠️ Attempt ${attempt}/${retries} failed:`, lastError.message);
      
      if (attempt === retries) break;
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  throw lastError;
};

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
    CREATE: `${API_CONFIG.BASE_URL}/route-trajectorie`,
    UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/route-trajectorie/${id}`,
  },
  VEHICLE_ASSIGNMENT: {
    GET_BY_USER: (userId: number) => `${API_CONFIG.BASE_URL}/vehicle-assigment/user/${userId}`,
  },
  ROUTE_ASSIGNMENT: {
    GET_BY_VEHICLE: (vehicleId: number) => 
      `${API_CONFIG.BASE_URL}/route-assignment/vehicle/${vehicleId}`,
  },
} as const;


// Headers comunes para las peticiones
export const getCommonHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// Configuración de manejo de errores mejorada
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión - Verifica tu conexión a internet',
  TIMEOUT_ERROR: 'Tiempo de espera agotado - El servidor no responde',
  UNAUTHORIZED: 'No autorizado - Verifica tus credenciales',
  FORBIDDEN: 'Acceso denegado - No tienes permisos',
  NOT_FOUND: 'Recurso no encontrado - El endpoint no existe',
  SERVER_ERROR: 'Error interno del servidor - Intenta más tarde',
  BACKEND_OFFLINE: 'Backend no disponible - Verifica que el servidor esté funcionando',
  UNKNOWN_ERROR: 'Error desconocido',
} as const;

// Función para obtener mensaje de error detallado
export const getErrorMessage = (error: any): string => {
  if (error?.name === 'AbortError' || error?.message?.includes('timed out')) {
    return ERROR_MESSAGES.TIMEOUT_ERROR;
  }
  
  if (error?.message?.includes('Network Error') || error?.message?.includes('Failed to fetch')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error?.status === 401) {
    return ERROR_MESSAGES.UNAUTHORIZED;
  }
  
  if (error?.status === 403) {
    return ERROR_MESSAGES.FORBIDDEN;
  }
  
  if (error?.status === 404) {
    return ERROR_MESSAGES.NOT_FOUND;
  }
  
  if (error?.status >= 500) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  
  return error?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};
