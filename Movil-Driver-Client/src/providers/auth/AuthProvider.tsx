import React, { useEffect, useReducer, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@Services/api/authService';
import { DriverService } from '@Services/api/driverService';
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
  driverInfoFetched: false, // Nueva bandera para evitar bucles
};

// Tipos de acciones
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'UPDATE_DRIVER_INFO'; payload: { vehicleId?: string; routeId?: string } }
  | { type: 'SET_DRIVER_INFO_FETCHED'; payload: boolean }
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
        driverInfoFetched: false, // Resetear bandera al hacer logout
      };
    case 'UPDATE_DRIVER_INFO':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              vehicleId: action.payload.vehicleId,
              routeId: action.payload.routeId,
            }
          : null,
      };
    case 'SET_DRIVER_INFO_FETCHED':
      return {
        ...state,
        driverInfoFetched: action.payload,
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

  // Consultar información del conductor después del login exitoso (solo una vez)
  useEffect(() => {
    if (state.isAuthenticated && state.user && !state.driverInfoFetched) {
      console.log(
        '🔄 [AuthProvider] Usuario autenticado, consultando información del conductor...'
      );
      fetchDriverInfoAfterLogin();
      requestLocationPermissionsAfterLogin();
    }
  }, [state.isAuthenticated, state.user, state.driverInfoFetched]);

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

  const fetchDriverInfoAfterLogin = async () => {
    try {
      console.log(
        '🔍 [AuthProvider.fetchDriverInfoAfterLogin] Iniciando consulta de información del conductor...'
      );
      console.log('👤 [AuthProvider.fetchDriverInfoAfterLogin] Usuario actual:', {
        id: state.user?.id,
        identificacion: state.user?.identificacion,
        idType: typeof state.user?.id,
      });

      if (!state.user?.id || state.user.id === 0) {
        console.log(
          'ℹ️ [AuthProvider.fetchDriverInfoAfterLogin] No hay usuario válido para consultar información del conductor'
        );
        console.log('   - user.id:', state.user?.id);
        console.log('   - condición:', !state.user?.id || state.user.id === 0);
        return;
      }

      console.log(
        '🚗 [AuthProvider.fetchDriverInfoAfterLogin] Consultando asignación de vehículo para userId:',
        state.user.id
      );

      // Consultar asignación de vehículo
      const vehicleResult = await DriverService.getVehicleAssignment(state.user.id);

      console.log('📊 [AuthProvider.fetchDriverInfoAfterLogin] Resultado de consulta de vehículo:');
      console.log('   - success:', vehicleResult.success);
      console.log('   - error:', vehicleResult.error);
      console.log('   - hasData:', !!vehicleResult.data);

      if (vehicleResult.success && vehicleResult.data) {
        const vehicleId = vehicleResult.data.vehicleId;
        console.log(
          '✅ [AuthProvider.fetchDriverInfoAfterLogin] Vehículo asignado encontrado:',
          vehicleId
        );

        // Si hay vehículo asignado, consultar rutas
        if (vehicleId) {
          console.log(
            '🛣️ [AuthProvider.fetchDriverInfoAfterLogin] Consultando rutas para vehicleId:',
            vehicleId
          );
          const routeResult = await DriverService.getRouteAssignments(vehicleId);

          console.log(
            '📊 [AuthProvider.fetchDriverInfoAfterLogin] Resultado de consulta de rutas:'
          );
          console.log('   - success:', routeResult.success);
          console.log('   - error:', routeResult.error);
          console.log('   - hasData:', !!routeResult.data);
          console.log('   - dataLength:', routeResult.data?.length || 0);

          if (routeResult.success && routeResult.data && routeResult.data.length > 0) {
            const routeId = routeResult.data[0].routeId; // Tomar la primera ruta activa
            console.log(
              '✅ [AuthProvider.fetchDriverInfoAfterLogin] Ruta asignada encontrada:',
              routeId
            );

            // Actualizar el estado con la información del conductor
            const updatePayload = { vehicleId, routeId };
            console.log(
              '🔄 [AuthProvider.fetchDriverInfoAfterLogin] Actualizando estado del usuario:',
              updatePayload
            );

            dispatch({
              type: 'UPDATE_DRIVER_INFO',
              payload: updatePayload,
            });

            // Guardar el usuario actualizado en AsyncStorage
            const updatedUser = {
              ...state.user,
              vehicleId,
              routeId,
            };
            await AsyncStorage.setItem('auth_user', JSON.stringify(updatedUser));

            console.log(
              '✅ [AuthProvider.fetchDriverInfoAfterLogin] Información del conductor actualizada en el estado y AsyncStorage'
            );
            console.log('   - Nuevo estado del usuario:', {
              id: state.user.id,
              vehicleId: vehicleId,
              routeId: routeId,
            });

            // Marcar que se completó la consulta de información del conductor
            dispatch({ type: 'SET_DRIVER_INFO_FETCHED', payload: true });
          } else {
            console.log(
              '⚠️ [AuthProvider.fetchDriverInfoAfterLogin] No se encontraron rutas asignadas al vehículo'
            );
            console.log('   - Actualizando solo con vehicleId');

            const updatePayload = { vehicleId };
            dispatch({
              type: 'UPDATE_DRIVER_INFO',
              payload: updatePayload,
            });

            // Guardar el usuario actualizado en AsyncStorage
            const updatedUser = {
              ...state.user,
              vehicleId,
            };
            await AsyncStorage.setItem('auth_user', JSON.stringify(updatedUser));

            console.log(
              '✅ [AuthProvider.fetchDriverInfoAfterLogin] Estado actualizado solo con vehicleId'
            );

            // Marcar que se completó la consulta de información del conductor
            dispatch({ type: 'SET_DRIVER_INFO_FETCHED', payload: true });
          }
        } else {
          console.log(
            '⚠️ [AuthProvider.fetchDriverInfoAfterLogin] Conductor no tiene vehículo asignado'
          );
        }

        // Marcar que se completó la consulta de información del conductor
        dispatch({ type: 'SET_DRIVER_INFO_FETCHED', payload: true });
      } else {
        console.log(
          '⚠️ [AuthProvider.fetchDriverInfoAfterLogin] No se encontró asignación de vehículo activa para el conductor'
        );
        console.log('   - Error:', vehicleResult.error);

        // Marcar que se completó la consulta (aunque sin resultados)
        dispatch({ type: 'SET_DRIVER_INFO_FETCHED', payload: true });
      }
    } catch (error) {
      console.error(
        '❌ [AuthProvider.fetchDriverInfoAfterLogin] Error consultando información del conductor:',
        error
      );
      console.error(
        '❌ [AuthProvider.fetchDriverInfoAfterLogin] Stack trace:',
        error instanceof Error ? error.stack : 'No stack trace'
      );

      // Marcar que se completó la consulta (aunque con error)
      dispatch({ type: 'SET_DRIVER_INFO_FETCHED', payload: true });

      // No mostrar alerta al usuario, solo loggear el error
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

  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await AuthService.login(credentials);

      if (result.success && result.token) {
        const normalizedUser: User = result.user ?? {
          id: 0, // ID temporal, se actualizará cuando se obtenga del backend
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
