import { createContext } from 'react';

export interface TrackingState {
  isRecorridoActive: boolean;
  startTime: string | null;
  endTime: string | null;
  routeTrajectorieId: string | null;
}

export interface TrackingContextType {
  // Estado
  isRecorridoActive: boolean;
  startTime: string | null;
  endTime: string | null;
  routeTrajectorieId: string | null;

  // Métodos
  startRecorrido: () => void;
  endRecorrido: () => void;
  resetRecorrido: () => void;
}

const trackingContext = createContext<TrackingContextType | undefined>(undefined);

export default trackingContext;
