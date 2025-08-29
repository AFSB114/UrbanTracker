import { useContext } from 'react';
import LocationContext from '@Contexts/location/LocationContext';
import type { LocationContextType } from '@/location/types';

const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de un LocationProvider');
  }
  return context;
};

export default useLocation;