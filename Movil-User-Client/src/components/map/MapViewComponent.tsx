import { View, Text, ActivityIndicator } from 'react-native';
import Mapbox, { Camera, MapView, UserLocation } from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { MAPBOX_API_TOKEN } from '@env';
import RouteMapComponent from './RouteMapComponent';
import { useMapRoutes } from '../../hooks/useMapRoutes';

interface MapViewComponentProps {
  onRouteSelected?: (routeId: number, routeNumber: string) => void;
}

export default function MapViewComponent({ onRouteSelected }: MapViewComponentProps) {
  const mapRef = useRef(null);
  const camera = useRef<Camera>(null);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/dark-v11');
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mapRoutes, addRouteToMap } = useMapRoutes();

  // Initialize Mapbox with better error handling
  try {
    if (MAPBOX_API_TOKEN && MAPBOX_API_TOKEN.startsWith('pk.')) {
      Mapbox.setAccessToken(MAPBOX_API_TOKEN);
      console.log('✅ Mapbox token set successfully');
    } else {
      console.error('❌ Invalid Mapbox token format. Token should start with "pk."');
      console.log('Current token starts with:', MAPBOX_API_TOKEN?.substring(0, 3));
    }
  } catch (error) {
    console.error('❌ Error setting Mapbox token:', error);
  }

  useEffect(() => {
    if (isStyleLoaded) {
      camera.current?.setCamera({
        centerCoordinate: [-75.2810060736973, 2.9342900126616227],
        zoomLevel: 12,
        pitch: 0,
        heading: 0,
        animationDuration: 1000,
      });
    }
  }, [isStyleLoaded]);

  return (
    <View className="h-full w-full flex-1">
      <MapView
        style={{ flex: 1 }}
        styleURL={mapStyle}
        scaleBarEnabled={false}
        logoEnabled={false}
        onDidFinishLoadingStyle={() => {
          console.log('Map style loaded successfully:', mapStyle);
          setIsStyleLoaded(true);
          setIsLoading(false);
          setMapError(null);
        }}
        onMapLoadingError={() => {
          console.error('Map failed to load with style:', mapStyle);
          console.log('API Token configured:', !!MAPBOX_API_TOKEN);
          console.log('Token starts with pk.:', MAPBOX_API_TOKEN?.startsWith('pk.'));
          setIsLoading(false);

          // Try fallback style
          if (mapStyle === 'mapbox://styles/mapbox/dark-v11') {
            console.log('Trying fallback style...');
            setMapStyle('mapbox://styles/mapbox/streets-v12');
            setIsLoading(true);
          } else {
            setMapError('Error al cargar el mapa. Verifica tu conexión a internet y el token de Mapbox.');
          }
        }}
        onDidFinishLoadingMap={() => {
          console.log('Map finished loading with style:', mapStyle);
          setIsLoading(false);
        }}
        attributionEnabled={false}>
        <Camera ref={camera} />
        <UserLocation visible={true} androidRenderMode="normal" animated />
        {mapRoutes.map((route) => (
          <RouteMapComponent
            key={route.id}
            waypoints={route.waypoints}
            color={route.color}
            id={route.id}
          />
        ))}
      </MapView>

      {/* Loading Overlay */}
      {isLoading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-gray-800 p-4 rounded-lg items-center">
            <ActivityIndicator size="large" color="#007AFF" />
            <Text className="text-white mt-2">Cargando mapa...</Text>
          </View>
        </View>
      )}

      {/* Error Overlay */}
      {mapError && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-red-800 p-4 rounded-lg items-center max-w-xs">
            <Text className="text-white text-center">{mapError}</Text>
            <Text className="text-gray-300 text-xs mt-2 text-center">
              Token: {MAPBOX_API_TOKEN?.substring(0, 10)}...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
