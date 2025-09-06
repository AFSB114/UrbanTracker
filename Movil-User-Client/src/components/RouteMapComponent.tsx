import { MAPBOX_API_TOKEN } from '@Env';
import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { useState, useEffect, useCallback } from 'react';
import type { Waypoint } from '~/types/types';

export default function RouteMapComponent({ waypoints, color, id }: { waypoints: Waypoint[], color: string, id: string }) {
  const [route, setRoute] = useState<any>(null);

  const getRoute = useCallback(async () => {
    try {
      await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints.map((wp) => `${wp.long},${wp.lat}`).join(';')}?geometries=geojson&access_token=${MAPBOX_API_TOKEN}&overview=full`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.routes && data.routes.length > 0) {
            console.log(data);
            setRoute({
              type: 'Feature',
              geometry: data.routes[0].geometry,
            });
          }
        });
    } catch (error) {
      console.error('Error fetching route:', error);
    }
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
          lineWidth: 3,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </ShapeSource>
  );
}
