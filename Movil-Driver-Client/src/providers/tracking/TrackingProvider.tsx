import React, { useReducer, useMemo, useContext } from 'react';
import TrackingContext, { TrackingState, TrackingContextType } from '@Contexts/tracking/trackingContext';
import { RouteTrajectorieService } from '@/services/api/routeTrajectorieService';
import { AuthService } from '@/services/api/authService';
import AuthContext from '@/contexts/auth/authContext';

// Estado inicial
const initialState: TrackingState = {
  isRecorridoActive: false,
  startTime: null,
  endTime: null,
  routeTrajectorieId: null,
};

// Tipos de acciones
type TrackingAction =
  | { type: 'START_RECORRIDO'; payload: { startTime: string; routeTrajectorieId?: string } }
  | { type: 'END_RECORRIDO'; payload: { endTime: string } }
  | { type: 'RESET_RECORRIDO' };

// Reducer
function trackingReducer(state: TrackingState, action: TrackingAction): TrackingState {
  switch (action.type) {
    case 'START_RECORRIDO':
      return {
        ...state,
        isRecorridoActive: true,
        startTime: action.payload.startTime,
        endTime: null,
        routeTrajectorieId: action.payload.routeTrajectorieId || null,
      };
    case 'END_RECORRIDO':
      return {
        ...state,
        isRecorridoActive: false,
        endTime: action.payload.endTime,
      };
    case 'RESET_RECORRIDO':
      return initialState;
    default:
      return state;
  }
}

interface TrackingProviderProps {
  children: React.ReactNode;
}

export default function TrackingProvider({ children }: TrackingProviderProps) {
  const [state, dispatch] = useReducer(trackingReducer, initialState);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('TrackingProvider must be used within an AuthProvider');
  }

  const { user } = authContext;

  const startRecorrido = async () => {
    try {
      const now = new Date();
      const startTime = now.toISOString(); // Usar ISO para API
      const displayTime = now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      console.log('🚀 Iniciando recorrido a las:', displayTime);

      // Obtener información del usuario para el registro
      const user = await AuthService.getUser();
      if (!user?.id) {
        console.warn('⚠️ No se pudo obtener información del usuario para el registro de trayectoria');
        // Continuar con el flujo normal sin bloquear
        dispatch({
          type: 'START_RECORRIDO',
          payload: { startTime: displayTime }
        });
        return;
      }

      // Crear registro en la API
      const createResult = await RouteTrajectorieService.create({
        driverId: user.id,
        vehicleId: user.vehicleId || "1",
        routeId: user.routeId,
        startTime: startTime,
      });

      if (createResult.success && createResult.data) {
        console.log('✅ Registro de trayectoria creado:', createResult.data.id);
        dispatch({
          type: 'START_RECORRIDO',
          payload: {
            startTime: displayTime,
            routeTrajectorieId: createResult.data.id
          }
        });
      } else {
        console.warn('⚠️ Error creando registro de trayectoria, continuando con flujo normal:', createResult.error);
        // Continuar con el flujo normal sin bloquear
        dispatch({
          type: 'START_RECORRIDO',
          payload: { startTime: displayTime }
        });
      }
    } catch (error) {
      console.error('❌ Error en startRecorrido:', error);
      // En caso de error, continuar con el flujo básico
      const now = new Date();
      const displayTime = now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      dispatch({
        type: 'START_RECORRIDO',
        payload: { startTime: displayTime }
      });
    }
  };

  const endRecorrido = async () => {
    try {
      const now = new Date();
      const endTime = now.toISOString(); // Usar ISO para API
      const displayTime = now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      console.log('🏁 Finalizando recorrido a las:', displayTime);

      // Si hay un registro de trayectoria, actualizarlo
      if (state.routeTrajectorieId) {
        const updateResult = await RouteTrajectorieService.update(state.routeTrajectorieId, {
          endTime: endTime,
        });

        if (updateResult.success) {
          console.log('✅ Registro de trayectoria actualizado:', state.routeTrajectorieId);
        } else {
          console.warn('⚠️ Error actualizando registro de trayectoria:', updateResult.error);
          // Continuar con el flujo normal
        }
      } else {
        console.log('ℹ️ No hay registro de trayectoria para actualizar');
      }

      dispatch({
        type: 'END_RECORRIDO',
        payload: { endTime: displayTime }
      });
    } catch (error) {
      console.error('❌ Error en endRecorrido:', error);
      // En caso de error, continuar con el flujo básico
      const now = new Date();
      const displayTime = now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      dispatch({
        type: 'END_RECORRIDO',
        payload: { endTime: displayTime }
      });
    }
  };

  const resetRecorrido = () => {
    console.log('🔄 Reseteando recorrido');
    dispatch({ type: 'RESET_RECORRIDO' });
  };

  const contextValue: TrackingContextType = useMemo(
    () => ({
      isRecorridoActive: state.isRecorridoActive,
      startTime: state.startTime,
      endTime: state.endTime,
      routeTrajectorieId: state.routeTrajectorieId,
      startRecorrido,
      endRecorrido,
      resetRecorrido,
    }),
    [state]
  );

  return (
    <TrackingContext.Provider value={contextValue}>
      {children}
    </TrackingContext.Provider>
  );
}