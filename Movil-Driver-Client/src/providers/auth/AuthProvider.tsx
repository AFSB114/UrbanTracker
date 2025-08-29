import React, { createContext, useContext, useEffect, useReducer, useMemo } from 'react';
import { AuthService } from '@/auth/services/authService';
import { AuthContextType, AuthState, LoginCredentials, User } from '@/types';

// Estado inicial
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true,
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

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar sesión al inicializar
  useEffect(() => {
    checkAuthStatus();
  }, []);

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

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await AuthService.login(credentials);
      
      if (result.success && result.user && result.token) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: result.user,
            token: result.token,
          },
        });
        return true;
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        console.error('Login failed:', result.error);
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      console.error('Login error:', error);
      return false;
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

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
