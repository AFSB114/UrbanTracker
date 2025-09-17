import { MAPBOX_DIRECTIONS_URL } from '../constants/api';
import { MAPBOX_API_TOKEN } from '@env';
import type { Waypoint } from '../types/types';

export const fetchRoute = async (waypoints: Waypoint[]): Promise<any> => {
  try {
    const coordinates = waypoints.map((wp) => `${wp.long},${wp.lat}`).join(';');
    const url = `${MAPBOX_DIRECTIONS_URL}/${coordinates}?geometries=geojson&access_token=${MAPBOX_API_TOKEN}&overview=full`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      return {
        type: 'Feature',
        geometry: data.routes[0].geometry,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
};
