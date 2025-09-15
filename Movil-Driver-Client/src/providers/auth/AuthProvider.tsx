import React, { useEffect, useReducer, useMemo } from 'react';
import { AuthService } from '@Services/api/authService';
import { AuthContextType, AuthState, LoginCredentials, User } from '@/types/auth';
import AuthContext from '@/contexts/auth/authContext';
import * as ExpoLocation from 'expo-location';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';

// Estado inicial
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
};

// Tipos de acciones
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'RESTORE_SESSION'; payload: { user: User; token: string } };

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    default:
      return state;
  }
}

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar sesión al inicializar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Solicitar permisos de ubicación después del login exitoso
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      requestLocationPermissionsAfterLogin();
    }
  }, [state.isAuthenticated, state.user]);

  const requestLocationPermissionsAfterLogin = async () => {
    try {
      console.log('🔍 Solicitando permisos de ubicación después del login...');

      // Verificar estado actual de permisos
      const { status } = await ExpoLocation.getForegroundPermissionsAsync();

      if (status === ExpoLocation.PermissionStatus.GRANTED) {
        console.log('✅ Permisos de ubicación ya concedidos');
        return;
      }

      // Solicitar permisos
      const { status: newStatus } = await ExpoLocation.requestForegroundPermissionsAsync();

      if (newStatus === ExpoLocation.PermissionStatus.GRANTED) {
        console.log('✅ Permisos de ubicación concedidos después del login');
      } else {
        console.log('❌ Permisos de ubicación denegados después del login');
        Alert.alert(
          'Permisos de Ubicación Requeridos',
          'Para el correcto funcionamiento de la aplicación, necesitas habilitar los permisos de ubicación.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Abrir Configuración',
              onPress: () => {
                if (Platform.OS === 'android') {
                  Linking.openSettings();
                } else {
                  Linking.openURL('app-settings:');
                }
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('❌ Error solicitando permisos después del login:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      console.log('🔄 Iniciando verificación de estado de autenticación...');
      dispatch({ type: 'SET_LOADING', payload: true });

      // Verificar si ya hay una sesión guardada
      const hasSession = await AuthService.hasStoredSession();
      console.log('📁 Sesión almacenada encontrada:', hasSession);

      const authStatus = await AuthService.checkAuthStatus();
      console.log('🔍 Resultado de verificación:', authStatus);

      if (authStatus.isAuthenticated && authStatus.user && authStatus.token) {
        console.log('✅ Restaurando sesión válida para usuario:', authStatus.user.identificacion);
        dispatch({
          type: 'RESTORE_SESSION',
          payload: {
            user: authStatus.user,
            token: authStatus.token,
          },
        });
      } else {
        console.log('❌ No se encontró sesión válida, redirigiendo a login');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('❌ Error checking auth status:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await AuthService.login(credentials);

      if (result.success && result.token) {
        const normalizedUser: User = result.user ?? {
          id: 'self',
          identificacion: credentials.identificacion,
        };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: normalizedUser,
            token: result.token,
          },
        });
        return { success: true };
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        console.error('Login failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      console.error('Login error:', error);
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Aun si hay error, limpiamos el estado local
      dispatch({ type: 'LOGOUT' });
    }
  };

  const contextValue: AuthContextType = useMemo(
    () => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.token,
      isLoading: state.isLoading,
      login,
      logout,
      checkAuthStatus,
    }),
    [state]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
