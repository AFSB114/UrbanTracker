import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { useState, useEffect, useCallback } from 'react';
import type { Waypoint } from '../../types/types';
import { fetchRoute } from '../../services/mapService';

export default function RouteMapComponent({ waypoints, color, id }: { waypoints: Waypoint[], color: string, id: string }) {
  const [route, setRoute] = useState<any>(null);

  const getRoute = useCallback(async () => {
    const routeData = await fetchRoute(waypoints);
    setRoute(routeData);
  }, [waypoints]);

  useEffect(() => {
    getRoute();
  }, [getRoute]);

  if (!route) return null;

  return (
    <ShapeSource id={`routeSource${id}`} shape={route}>
      <LineLayer
        id={`routeLayer${id}`}
        style={{
          lineColor: color,
          lineWidth: 5,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </ShapeSource>
  );
}
