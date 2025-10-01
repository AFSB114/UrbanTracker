import React from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { VehicleTelemetryMessage } from '../panels/routes-detail';

interface VehicleMarkerProps {
  vehicle: VehicleTelemetryMessage;
}

export function VehicleMarker({ vehicle }: VehicleMarkerProps) {
  return (
    <Marker
      longitude={vehicle.longitude}
      latitude={vehicle.latitude}
      anchor="bottom"
    >
      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white">
        🚌
      </div>
    </Marker>
  );
}