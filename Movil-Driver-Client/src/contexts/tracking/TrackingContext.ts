import { createContext } from 'react';

export interface TrackingState {
  isRecorridoActive: boolean;
  startTime: string | null;
  endTime: string | null;
}

export interface TrackingContextType {
  // Estado
  isRecorridoActive: boolean;
  startTime: string | null;
  endTime: string | null;
  
  // Métodos
  startRecorrido: () => void;
  endRecorrido: () => void;
  resetRecorrido: () => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export default TrackingContext;
