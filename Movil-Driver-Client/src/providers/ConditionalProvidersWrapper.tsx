import type { ReactNode } from 'react';
import { useAuth } from '@Hooks/auth';
import MqttProvider from '@/providers/mqtt/MqttProvider';
import LocationProvider from '@/providers/location/LocationProvider';
import TrackingProvider from '@Providers/tracking/TrackingProvider';
import { useTracking } from '@Hooks/tracking';

// Componente interno que tiene acceso al contexto de tracking
function ProvidersWithTracking({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { isRecorridoActive } = useTracking();

  return (
    <MqttProvider shouldConnect={isAuthenticated} isAuthenticated={isAuthenticated}>
      <LocationProvider shouldTrack={isRecorridoActive} isAuthenticated={isAuthenticated}>
        {children}
      </LocationProvider>
    </MqttProvider>
  );
}

// Wrapper principal
export default function ConditionalProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TrackingProvider>
      <ProvidersWithTracking>{children}</ProvidersWithTracking>
    </TrackingProvider>
  );
}
