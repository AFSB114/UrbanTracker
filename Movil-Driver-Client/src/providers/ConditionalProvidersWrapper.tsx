import React from 'react';
import useAuth from '@/auth/hooks/useAuth';
import MqttProviderConditional from '@/mqtt/provider/MqttProviderConditional';
import LocationProviderConditional from '@/location/provider/LocationProviderConditional';
import TrackingProvider from '@/tracking/provider/TrackingProvider';
import useTracking from '@/tracking/hooks/useTracking';

// Componente interno que tiene acceso al contexto de tracking
function ProvidersWithTracking({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { isRecorridoActive } = useTracking();

  return (
    <MqttProviderConditional 
      shouldConnect={isRecorridoActive} 
      isAuthenticated={isAuthenticated}
    >
      <LocationProviderConditional 
        shouldTrack={isRecorridoActive} 
        isAuthenticated={isAuthenticated}
      >
        {children}
      </LocationProviderConditional>
    </MqttProviderConditional>
  );
}

// Wrapper principal
export default function ConditionalProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TrackingProvider>
      <ProvidersWithTracking>
        {children}
      </ProvidersWithTracking>
    </TrackingProvider>
  );
}
