import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, User } from '@/types';

// Constantes para AsyncStorage
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Simular delay de red
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AuthService {
  /**
   * Realiza login con credenciales
   */
  static async login(credentials: LoginCredentials): Promise<{ success: boolean; token?: string; user?: User; error?: string }> {
    try {
      // Simular llamada a API
      await mockDelay(1000);
      
      // Validación mock - en producción esto sería una llamada real a la API
      if (credentials.identificacion && credentials.password) {
        // Mock successful login
        const mockToken = `mock_token_${Date.now()}`;
        const mockUser: User = {
          id: '1',
          identificacion: credentials.identificacion,
          nombre: 'Conductor de Prueba',
          email: 'conductor@urbantracker.com',
          role: 'driver'
        };
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem(TOKEN_KEY, mockToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        
        return {
          success: true,
          token: mockToken,
          user: mockUser
        };
      } else {
        return {
          success: false,
          error: 'Credenciales inválidas'
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: 'Error de conexión'
      };
    }
  }

  /**
   * Cierra sesión
   */
  static async logout(): Promise<void> {
    try {
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
      const userString = await AsyncStorage.getItem(USER_KEY);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }

  /**
   * Verifica si hay una sesión válida
   */
  static async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User; token?: string }> {
    try {
      const token = await this.getToken();
      const user = await this.getUser();
      
      console.log('🔍 Verificando estado de autenticación:', {
        tokenExists: !!token,
        userExists: !!user,
        tokenPreview: token ? token.substring(0, 20) + '...' : 'null'
      });
      
      if (token && user) {
        // Verificar que el token no sea muy antiguo (ej: más de 24 horas)
        const tokenAge = this.getTokenAge(token);
        const maxAge = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
        
        console.log('🕰️ Edad del token:', {
          ageInHours: Math.floor(tokenAge / (60 * 60 * 1000)),
          isExpired: tokenAge > maxAge
        });
        
        if (tokenAge > maxAge) {
          console.log('⚠️ Token expirado, limpiando sesión...');
          await this.logout();
          return { isAuthenticated: false };
        }
        
        // En producción, aquí verificarías la validez del token con la API
        console.log('✅ Sesión válida encontrada');
        return {
          isAuthenticated: true,
          user,
          token
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
