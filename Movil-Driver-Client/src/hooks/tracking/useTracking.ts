import { useContext } from 'react';
import trackingContext, { TrackingContextType } from '@Contexts/tracking/trackingContext';

export const useTracking = (): TrackingContextType => {
  const context = useContext(trackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export default useTracking;
