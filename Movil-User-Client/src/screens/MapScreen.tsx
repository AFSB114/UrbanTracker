import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';

// Components
import Header from '../components/ui/Header';
import MapViewComponent from '../components/map/MapViewComponent';
import MapBottomSheet from '../components/bottomsheet/MapBottomSheet';

// Hooks
import { useMapRoutes } from '../hooks/useMapRoutes';

export default function MapScreen() {
  // Calcular snap points para el bottom sheet
  const { height } = Dimensions.get('window');
  const snapPoints = useMemo(
    () => [
      Math.max(120, height * 0.15), // Colapsado - solo barra visible
      height * 0.9, // Expandido - casi toda la pantalla
    ],
    [height]
  );

  // Hook para manejar rutas del mapa
  const { addRouteToMap } = useMapRoutes();

  // Función para manejar cuando se selecciona una ruta desde el bottom sheet
  const handleRouteSelected = (routeId: number, routeNumber: string) => {
    console.log('Route selected:', routeId, routeNumber);
    addRouteToMap(routeId, routeNumber);
  };

  return (
    <View className="relative flex-1 bg-black">
      <Header />

      {/* Mapa - siempre visible */}
      <View className="flex-1">
        <MapViewComponent onRouteSelected={handleRouteSelected} />
      </View>

      {/* Bottom Sheet con navegación interna */}
      <MapBottomSheet snapPoints={snapPoints} onViewRouteOnMap={handleRouteSelected} />
    </View>
  );
}
