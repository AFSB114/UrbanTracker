import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

// Componentes
import SearchBar from '../components/ui/SearchBar';
import RouteItem from '../components/ui/RouteItem';
import { RootStackParamList } from '../components/navigation/AppNavigator';

// Datos de ejemplo
const mockRoutes = [
  {
    id: '1',
    number: '999',
    name: 'Ruta Principal',
    destination: 'Alberto Galindo - Conj. María Paula',
    distance: '150m hacia la carrera 15',
    isActive: true,
  },
  {
    id: '2',
    number: '888',
    name: 'Ruta Norte',
    destination: 'Centro Comercial - Universidad',
    distance: '300m hacia la calle 45',
    isActive: true,
  },
  {
    id: '3',
    number: '777',
    name: 'Ruta Sur',
    destination: 'Terminal - Hospital',
    distance: '500m hacia la avenida 30',
    isActive: false,
  },
  {
    id: '4',
    number: '666',
    name: 'Ruta Este',
    destination: 'Parque Central - Estación',
    distance: '200m hacia la diagonal 25',
    isActive: true,
  },
];

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { height: screenHeight } = Dimensions.get('window');

export default function MapScreen() {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchText, setSearchText] = useState('');
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  // Snap points para los 3 estados del bottom sheet
  const snapPoints = useMemo(() => [
    `${15}%`, // Colapsado
    `${50}%`, // Medio
    `${90}%`, // Expandido
  ], []);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const handleRoutePress = (routeId: string, routeName: string) => {
    navigation.navigate('RouteDetail', { routeId, routeName });
  };

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  const handleStopsPress = () => {
    navigation.navigate('Stops');
  };

  const renderBottomSheetContent = () => {
    switch (bottomSheetIndex) {
      case 0: // Colapsado
        return (
          <BottomSheetView className="p-5 items-center">
            <Text className="text-white text-lg font-bold mb-1">Rutas Cercanas</Text>
            <Text className="text-gray-400 text-sm">
              {mockRoutes.filter(route => route.isActive).length} rutas disponibles
            </Text>
          </BottomSheetView>
        );
      
      case 1: // Medio
        return (
          <BottomSheetView className="flex-1">
            <Text className="text-white text-xl font-bold px-5 pb-2.5">Rutas Cercanas</Text>
            {mockRoutes.filter(route => route.isActive).map((route) => (
              <RouteItem
                key={route.id}
                routeNumber={route.number}
                routeName={route.name}
                destination={route.destination}
                distance={route.distance}
                isActive={route.isActive}
                onPress={() => handleRoutePress(route.id, route.name)}
              />
            ))}
          </BottomSheetView>
        );
      
      case 2: // Expandido
        return (
          <BottomSheetScrollView className="flex-1">
            <Text className="text-white text-xl font-bold px-5 pb-2.5">Rutas Cercanas</Text>
            {mockRoutes.map((route) => (
              <RouteItem
                key={route.id}
                routeNumber={route.number}
                routeName={route.name}
                destination={route.destination}
                distance={route.distance}
                isActive={route.isActive}
                onPress={() => handleRoutePress(route.id, route.name)}
              />
            ))}
            
            <View className="mt-5 px-5">
              <Text className="text-white text-lg font-bold mb-4">Información</Text>
              
              <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-700" onPress={handleAboutPress}>
                <Ionicons name="information-circle" size={24} color="#007AFF" />
                <Text className="text-white text-base ml-4 flex-1">Nosotros</Text>
                <Ionicons name="chevron-forward" size={20} color="#999999" />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-700" onPress={handleStopsPress}>
                <Ionicons name="location" size={24} color="#007AFF" />
                <Text className="text-white text-base ml-4 flex-1">Paraderos</Text>
                <Ionicons name="chevron-forward" size={20} color="#999999" />
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Mapa (placeholder por ahora) */}
      <View className="flex-1">
        <View className="flex-1 justify-center items-center bg-gray-800">
          <Ionicons name="map" size={64} color="#666666" />
          <Text className="text-gray-400 text-lg mt-2.5">Mapa Interactivo</Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onPress={handleSearchPress}
        editable={false}
      />

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: '#1a1a1a' }}
        handleIndicatorStyle={{ backgroundColor: '#666666' }}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </SafeAreaView>
  );
}
