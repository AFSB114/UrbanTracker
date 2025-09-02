import type React from 'react';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationProviderConditionalProps {
  children: React.ReactNode;
  shouldTrack: boolean;
  isAuthenticated: boolean;
}

export type LocationPermissionStatus = 'granted' | 'denied' | 'prompt';

export interface LocationContextType {
  location: Location | null;
  permissionStatus: LocationPermissionStatus;
  isTracking: boolean;
  requestLocation: () => Promise<void>;
  toggleTracking: () => void;
}
