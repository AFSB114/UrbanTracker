import React, { useReducer, useMemo } from 'react';
import TrackingContext, { TrackingState, TrackingContextType } from '../context/TrackingContext';

// Estado inicial
const initialState: TrackingState = {
  isRecorridoActive: false,
  startTime: null,
  endTime: null,
};

// Tipos de acciones
type TrackingAction =
  | { type: 'START_RECORRIDO'; payload: { startTime: string } }
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

export function TrackingProvider({ children }: TrackingProviderProps) {
  const [state, dispatch] = useReducer(trackingReducer, initialState);

  const startRecorrido = () => {
    const now = new Date();
    const startTime = now.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    
    console.log('🚀 Iniciando recorrido a las:', startTime);
    dispatch({ 
      type: 'START_RECORRIDO', 
      payload: { startTime } 
    });
  };

  const endRecorrido = () => {
    const now = new Date();
    const endTime = now.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    
    console.log('🏁 Finalizando recorrido a las:', endTime);
    dispatch({ 
      type: 'END_RECORRIDO', 
      payload: { endTime } 
    });
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

export default TrackingProvider;
