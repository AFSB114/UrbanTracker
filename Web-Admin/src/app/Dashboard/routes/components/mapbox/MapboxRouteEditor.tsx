import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import type { RouteWaypoint } from '../../types/routeTypes';

interface RouteWaypoint {
  waypoint_id?: string;
  route_id?: number;
  sequence_order: number;
  latitude: number;
  longitude: number;
  created_at?: string;
  destine?: 'OUTBOUND' | 'RETURN';
}

interface RouteEditorProps {
  waypoints?: RouteWaypoint[];
  onWaypointsChange: (waypoints: RouteWaypoint[]) => void;
  isEditing?: boolean;
  height?: string;
  isVisible?: boolean; //  prop para controlar visibilidad
  routeType?: 'return' | 'outbound' | 'both';
}

const FixedMapboxRouteEditor: React.FC<RouteEditorProps> = ({
  waypoints = [],
  onWaypointsChange,
  isEditing = true,
  height = '500px',
  isVisible = true,
  routeType = 'both'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [waypointsM, setWaypointsM] = useState<RouteWaypoint[]>([]);
  const [currentWaypoints, setCurrentWaypoints] = useState<RouteWaypoint[]>(waypoints);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');

  // Limpiar mapa cuando se desmonte
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Inicializar mapa cuando se hace visible
  useEffect(() => {
    if (!isVisible || map.current || !mapContainer.current) return;

    try {
      console.log('Inicializando mapa...');
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-75.28337599253602, 2.9357328464917685], 
        zoom: 12,
        pitch: 0
      });

      map.current.on('load', () => {
        console.log('Mapa cargado');
        setIsLoaded(true);
        setError('');
        initializeMapLayers();
        
        if (isEditing) {
          map.current?.on('click', handleMapClick);
        }
      });

      map.current.on('error', (e) => {
        console.error('Error del mapa:', e);
        setError(`Error del mapa: ${e.error?.message || 'Error desconocido'}`);
      });

    } catch (err: unknown) {
      console.error('Error inicializando mapa:', err);
      setError(`Error: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
    }
  }, [isVisible, isEditing]);

  useEffect(() => {
    
    
  },[waypointsM])

  // Redimensionar mapa cuando cambie la visibilidad
  useEffect(() => {
    if (isVisible && map.current && isLoaded) {
      // Pequeño delay para que el modal termine de renderizarse
      setTimeout(() => {
        map.current?.resize();
      }, 100);
    }
  }, [isVisible, isLoaded]);

  const initializeMapLayers = useCallback(() => {
    if (!map.current) return;

    try {
      // Limpiar capas existentes si existen
      if (map.current.getLayer('route-line-outbound')) map.current.removeLayer('route-line-outbound');
      if (map.current.getLayer('route-line-return')) map.current.removeLayer('route-line-return');
      if (map.current.getLayer('waypoints')) map.current.removeLayer('waypoints');
      if (map.current.getLayer('waypoint-labels')) map.current.removeLayer('waypoint-labels');
      if (map.current.getSource('route-line-outbound')) map.current.removeSource('route-line-outbound');
      if (map.current.getSource('route-line-return')) map.current.removeSource('route-line-return');
      if (map.current.getSource('waypoints')) map.current.removeSource('waypoints');

      // Capa para la línea outbound
      map.current.addSource('route-line-outbound', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      });

      map.current.addLayer({
        id: 'route-line-outbound',
        type: 'line',
        source: 'route-line-outbound',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#00ff88',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });

      // Capa para la línea return
      map.current.addSource('route-line-return', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      });

      map.current.addLayer({
        id: 'route-line-return',
        type: 'line',
        source: 'route-line-return',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#ff0088',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });

      // Capa para los puntos
      map.current.addSource('waypoints', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      map.current.addLayer({
        id: 'waypoints',
        type: 'circle',
        source: 'waypoints',
        paint: {
          'circle-radius': 8,
          'circle-color': '#00ff88',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      map.current.addLayer({
        id: 'waypoint-labels',
        type: 'symbol',
        source: 'waypoints',
        layout: {
          'text-field': ['get', 'sequence'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-anchor': 'center'
        },
        paint: {
          'text-color': '#000000',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1
        }
      });

      console.log('Capas inicializadas correctamente');
    } catch (err) {
      console.error('Error inicializando capas:', err);
    }
  }, []);

  const handleMapClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    if (!isEditing) return;



    const newWaypoint: RouteWaypoint = {
      sequence_order: currentWaypoints.length + 1,
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng
    };

    const updatedWaypoints = [...currentWaypoints, newWaypoint];
    setCurrentWaypoints(updatedWaypoints);
    onWaypointsChange(updatedWaypoints);
  }, [currentWaypoints, isEditing, onWaypointsChange]);

  const updateMapData = useCallback(() => {
    if (!map.current || !isLoaded) return;

    try {
      // Actualizar waypoints
      const waypointFeatures = currentWaypoints.map((waypoint, index) => ({
        type: 'Feature' as const,
        properties: {
          sequence: waypoint.sequence_order || index + 1,
          waypoint_id: waypoint.waypoint_id
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [waypoint.longitude, waypoint.latitude]
        }
      }));

      const waypointSource = map.current.getSource('waypoints') as mapboxgl.GeoJSONSource;
      if (waypointSource) {
        waypointSource.setData({
          type: 'FeatureCollection',
          features: waypointFeatures
        });
      }

      // Actualizar línea outbound
      const outboundWaypoints = currentWaypoints.filter(wp => wp.destine === 'OUTBOUND');
      const outboundCoordinates = outboundWaypoints.map(wp => [wp.longitude, wp.latitude]);
      const outboundSource = map.current.getSource('route-line-outbound') as mapboxgl.GeoJSONSource;

      if (outboundSource) {
        if (outboundCoordinates.length >= 2) {
          outboundSource.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: outboundCoordinates
            }
          });
        } else {
          outboundSource.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: []
            }
          });
        }
      }

      // Actualizar línea return
      const returnWaypoints = currentWaypoints.filter(wp => wp.destine === 'RETURN');
      const returnCoordinates = returnWaypoints.map(wp => [wp.longitude, wp.latitude]);
      const returnSource = map.current.getSource('route-line-return') as mapboxgl.GeoJSONSource;

      if (returnSource) {
        if (returnCoordinates.length >= 2) {
          returnSource.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: returnCoordinates
            }
          });
        } else {
          returnSource.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: []
            }
          });
        }
      }

      // Ajustar vista
      if (currentWaypoints.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        currentWaypoints.forEach(wp => {
          bounds.extend([wp.longitude, wp.latitude]);
        });
        
        if (currentWaypoints.length === 1) {
          map.current.flyTo({
            center: [currentWaypoints[0].longitude, currentWaypoints[0].latitude],
            zoom: 14
          });
        } else {
          map.current.fitBounds(bounds, { padding: 50 });
        }
      }

      // Mostrar/ocultar capas basadas en routeType
      if (routeType === 'outbound') {
        map.current.setLayoutProperty('route-line-outbound', 'visibility', 'visible');
        map.current.setLayoutProperty('route-line-return', 'visibility', 'none');
      } else if (routeType === 'return') {
        map.current.setLayoutProperty('route-line-outbound', 'visibility', 'none');
        map.current.setLayoutProperty('route-line-return', 'visibility', 'visible');
      } else { // both
        map.current.setLayoutProperty('route-line-outbound', 'visibility', 'visible');
        map.current.setLayoutProperty('route-line-return', 'visibility', 'visible');
      }
    } catch (err) {
      console.error('Error actualizando datos del mapa:', err);
    }
  }, [currentWaypoints, isLoaded, routeType]);

  // Actualizar mapa cuando cambien los waypoints
  useEffect(() => {
    updateMapData();
  }, [updateMapData]);

  // Sincronizar waypoints externos
  useEffect(() => {
    setCurrentWaypoints(waypoints);
  }, [waypoints]);

  const clearWaypoints = useCallback(() => {
    setCurrentWaypoints([]);
    onWaypointsChange([]);
  }, [onWaypointsChange]);

  const undoLastWaypoint = useCallback(() => {
    if (currentWaypoints.length > 0) {
      const updatedWaypoints = currentWaypoints.slice(0, -1);
      setCurrentWaypoints(updatedWaypoints);
      onWaypointsChange(updatedWaypoints);
    }
  }, [currentWaypoints, onWaypointsChange]);

  if (!isVisible) {
    return (
      <div
        style={{ height }}
        className="bg-zinc-200 rounded flex items-center justify-center"
      >
        <span className="text-zinc-500">Mapa oculto</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Mostrar errores */}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-20">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Controles del mapa */}
      {isEditing && (
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={undoLastWaypoint}
            disabled={currentWaypoints.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
          >
            Deshacer
          </button>
          <button
            onClick={clearWaypoints}
            disabled={currentWaypoints.length === 0}
            className="bg-red-800 hover:bg-red-900 disabled:bg-zinc-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
          >
            Limpiar
          </button>
        </div>
      )}

      {/* Estado del mapa */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-900 bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <div>Cargando mapa...</div>
          </div>
        </div>
      )}

      {/* Información de la ruta */}
      {currentWaypoints.length > 0 && (
        <div className="absolute bottom-4 left-4 z-10 bg-black bg-opacity-70 text-white p-3 rounded">
          <div className="text-sm">
            <div>Puntos: {currentWaypoints.length}</div>
            {currentWaypoints.length >= 2 && (
              <div className="text-green-400">✓ Ruta válida</div>
            )}
            {isEditing && (
              <div className="text-xs text-zinc-300 mt-1">
                Click en el mapa para agregar puntos
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contenedor del mapa */}
      <div
        ref={mapContainer}
        style={{ height }}
        className="w-full rounded-lg overflow-hidden"
      />
    </div>
  );
};

export default FixedMapboxRouteEditor;