import { useContext } from 'react';
import locationContext from '@/contexts/location/locationContext';
import type { LocationContextType } from '@Types/location';

const useLocation = (): LocationContextType => {
  const context = useContext(locationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de un LocationProvider');
  }
  return context;
};

export default useLocation;