import { LoginCredentials, User } from '@/types/auth';
import { LOGIN_ENDPOINT } from '@Config/endPoints';
import { API_CONFIG, fetchWithRetry, getErrorMessage } from '@Config/api';

// Constantes para AsyncStorage
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Simular delay de red
const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper para obtener AsyncStorage
const getAsyncStorage = () => require('@react-native-async-storage/async-storage').default;

export class AuthService {
  /**
   * Realiza login con credenciales
   */
  static async login(
    credentials: LoginCredentials
  ): Promise<{ success: boolean; token?: string; user?: User; error?: string }> {
    try {
      // Adaptar payload al backend: userName en lugar de identificacion
      const payload = { userName: credentials.identificacion, password: credentials.password };
      console.log('🔐 AuthService.login ->', {
        endpoint: LOGIN_ENDPOINT,
        payload: { ...payload, password: '***' },
      });

      // Create a timeout promise using configured timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network request timed out')), API_CONFIG.TIMEOUT)
      );

      // Race between fetch and timeout
      const resp = await Promise.race([
        fetch(LOGIN_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        }),
        timeoutPromise
      ]) as Response;

      const isJson = resp.headers.get('content-type')?.includes('application/json');
      console.log('🔐 AuthService.login <- respuesta', {
        status: resp.status,
        ok: resp.ok,
        isJson,
      });

      if (!resp.ok) {
        let errorMessage = 'Credenciales inválidas';

        if (isJson) {
          const errorBody = await resp.json().catch(() => null);
          console.log('🔐 AuthService.login <- errorBody', errorBody);
          errorMessage = errorBody?.message || errorBody?.error || errorMessage;
        } else {
          const text = await resp.text().catch(() => '');
          console.log('🔐 AuthService.login <- errorText', text);
          if (text) errorMessage = text;
        }
        return { success: false, error: errorMessage };
      }

      const rawData = isJson ? await resp.json() : await resp.text().then((t) => JSON.parse(t));
      console.log('🔐 AuthService.login <- success body keys', rawData ? Object.keys(rawData) : []);

      // Aceptar distintas formas de respuesta
      const token = rawData?.token;
      let user = rawData?.user || rawData?.data?.user || null;

      if (!token) {
        console.warn('⚠️ AuthService.login: no se encontró token en la respuesta');
        return { success: false, error: 'Respuesta inválida del servidor' };
      }

      // Asegurar que el user tenga el id como number si existe
      if (user && user.id) {
        user = {
          ...user,
          id: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id,
        };
      }

      console.log('💾 [AuthService.login] Guardando token en AsyncStorage...');
      const AsyncStorage = getAsyncStorage();
      await AsyncStorage.setItem(TOKEN_KEY, String(token));
      console.log('✅ [AuthService.login] Token guardado en AsyncStorage');

      if (user) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log('✅ [AuthService.login] Usuario guardado en AsyncStorage');
      }

      return { success: true, token: String(token), user: user || undefined };
    } catch (error) {
      console.error('Error en login:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Error de conexión';
      if (error instanceof Error) {
        if (error.message.includes('timed out')) {
          errorMessage = 'Tiempo de espera agotado. Verifica tu conexión a internet.';
        } else if (error.message.includes('Network Error')) {
          errorMessage = 'Error de red. Verifica tu conexión a internet.';
        }
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Cierra sesión
   */
  static async logout(): Promise<void> {
    try {
      const AsyncStorage = getAsyncStorage();
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  /**
   * Obtiene el token guardado
   */
  static async getToken(): Promise<string | null> {
    try {
      const AsyncStorage = getAsyncStorage();
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  }

  /**
   * Obtiene el usuario guardado
   */
  static async getUser(): Promise<User | null> {
    try {
      const AsyncStorage = getAsyncStorage();
      const userString = await AsyncStorage.getItem(USER_KEY);
      if (!userString) return null;

      const user = JSON.parse(userString);
      // Asegurar que el id sea number
      if (user && user.id) {
        user.id = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
      }
      return user;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }

  /**
   * Verifica si hay una sesión válida
   */
  static async checkAuthStatus(): Promise<{
    isAuthenticated: boolean;
    user?: User;
    token?: string;
  }> {
    try {
      const token = await this.getToken();
      const user = await this.getUser();

      console.log('🔍 Verificando estado de autenticación:', {
        tokenExists: !!token,
        userExists: !!user,
        tokenPreview: token ? token.substring(0, 20) + '...' : 'null',
      });

      if (token && user) {
        // Confiar en el backend para la validez del token; aquí solo revisamos existencia
        console.log('✅ Sesión válida encontrada');
        return {
          isAuthenticated: true,
          user,
          token,
        };
      }

      console.log('❌ No se encontró sesión válida');
      return { isAuthenticated: false };
    } catch (error) {
      console.error('❌ Error verificando auth status:', error);
      return { isAuthenticated: false };
    }
  }

  /**
   * Obtiene la edad del token en milisegundos
   */
  private static getTokenAge(token: string): number {
    try {
      // Extraer timestamp del token mock
      const timestampMatch = token.match(/mock_token_(\d+)/);
      if (timestampMatch) {
        const tokenTimestamp = parseInt(timestampMatch[1]);
        return Date.now() - tokenTimestamp;
      }
      // Si no es un token mock, asumir que es muy antiguo
      return Infinity;
    } catch (error) {
      return Infinity;
    }
  }

  /**
   * Limpia completamente la sesión (para testing)
   */
  static async clearSession(): Promise<void> {
    try {
      console.log('🧼 Limpiando sesión completa...');
      const AsyncStorage = getAsyncStorage();
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      console.log('✅ Sesión limpiada exitosamente');
    } catch (error) {
      console.error('❌ Error limpiando sesión:', error);
    }
  }

  /**
   * Verifica si existe alguna sesión guardada (para debugging)
   */
  static async hasStoredSession(): Promise<boolean> {
    try {
      const token = await this.getToken();
      const user = await this.getUser();
      return !!(token && user);
    } catch (error) {
      return false;
    }
  }
}
