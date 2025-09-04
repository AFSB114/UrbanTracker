import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Keyboard, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

// Componentes
import RouteItem from '../components/ui/RouteItem';
import Header from '~/components/Header';

// Tipos para la navegación interna del BottomSheet
type BottomSheetScreen = 'home' | 'route-detail' | 'about' | 'stops';

interface RouteDetailData {
  routeId: string;
  routeName: string;
}

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

export default function MapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const searchInputRef = useRef<any>(null);
  const [searchText, setSearchText] = useState('');
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Estado de navegación interno del BottomSheet
  const [currentScreen, setCurrentScreen] = useState<BottomSheetScreen>('home');
  const [routeDetailData, setRouteDetailData] = useState<RouteDetailData | null>(null);

  // Solo dos estados: colapsado y expandido
  const { height } = Dimensions.get('window');
  const snapPoints = useMemo(
    () => [
      Math.max(120, height * 0.15), // Colapsado - solo barra visible
      height * 0.9, // Expandido - casi toda la pantalla
    ],
    [height]
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      setBottomSheetIndex(index);

      // Si se colapsa, regresar al home y quitar el foco
      if (index === 0) {
        setCurrentScreen('home');
        if (isSearchFocused) {
          searchInputRef.current?.blur();
          Keyboard.dismiss();
        }
      }
    },
    [isSearchFocused]
  );

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    // Expandir completamente cuando se enfoque la búsqueda
    if (bottomSheetIndex === 0) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [bottomSheetIndex]);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  // Navegación interna del BottomSheet
  const navigateToRouteDetail = (routeId: string, routeName: string) => {
    setRouteDetailData({ routeId, routeName });
    setCurrentScreen('route-detail');
    // Asegurar que esté expandido
    bottomSheetRef.current?.snapToIndex(1);
  };

  const navigateToAbout = () => {
    setCurrentScreen('about');
    bottomSheetRef.current?.snapToIndex(1);
  };

  const navigateToStops = () => {
    setCurrentScreen('stops');
    bottomSheetRef.current?.snapToIndex(1);
  };

  const navigateBack = () => {
    setCurrentScreen('home');
    setRouteDetailData(null);
  };

  // Filtrar rutas basado en la búsqueda
  const filteredRoutes = useMemo(() => {
    if (!searchText) return mockRoutes;

    return mockRoutes.filter(
      (route) =>
        route.name.toLowerCase().includes(searchText.toLowerCase()) ||
        route.number.includes(searchText) ||
        route.destination.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const renderSearchBar = () => (
    <View className="mx-5 mb-4 mt-2">
      <View className="flex-row items-center rounded-xl bg-gray-800 px-4 py-3">
        <Ionicons name="search" size={20} color="#666666" />
        <BottomSheetTextInput
          ref={searchInputRef}
          className="ml-3 flex-1 text-base text-white"
          placeholder="Buscar rutas, destinos..."
          placeholderTextColor="#666666"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#666666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderHeader = (title: string, showBack = false) => (
    <View className="flex-row items-center border-b border-gray-700 px-5 pb-4">
      {showBack && (
        <TouchableOpacity onPress={navigateBack} className="mr-3">
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}
      <Text className="flex-1 text-xl font-bold text-white">{title}</Text>
    </View>
  );

  // Pantalla principal (home)
  const renderHomeScreen = () => (
    <BottomSheetScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {renderSearchBar()}

      <View className="flex-1">
        <Text className="px-5 pb-3 text-lg font-semibold text-white">
          {searchText ? 'Resultados de Búsqueda' : 'Todas las Rutas'}
        </Text>

        {filteredRoutes.map((route) => (
          <RouteItem
            key={route.id}
            routeNumber={route.number}
            routeName={route.name}
            destination={route.destination}
            distance={route.distance}
            isActive={route.isActive}
            onPress={() => navigateToRouteDetail(route.id, route.name)}
          />
        ))}

        {filteredRoutes.length === 0 && (
          <View className="items-center py-8">
            <Ionicons name="search" size={48} color="#666666" />
            <Text className="mt-2 px-5 text-center text-gray-400">
              No se encontraron rutas que coincidan con "{searchText}"
            </Text>
          </View>
        )}

        {/* Sección de información solo cuando no hay búsqueda */}
        {!searchText && (
          <View className="mt-8 border-t border-gray-700 px-5 pt-6">
            <Text className="mb-4 text-lg font-semibold text-white">Información</Text>
            <TouchableOpacity
              className="flex-row items-center border-b border-gray-700 py-4"
              onPress={navigateToAbout}>
              <Ionicons name="information-circle" size={24} color="#007AFF" />
              <Text className="ml-4 flex-1 text-base text-white">Acerca de</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center py-4" onPress={navigateToStops}>
              <Ionicons name="location" size={24} color="#007AFF" />
              <Text className="ml-4 flex-1 text-base text-white">Paraderos</Text>
              <Ionicons name="chevron-forward" size={20} color="#999999" />
            </TouchableOpacity>
            <View className="h-8" /> {/* Espaciado final */}
          </View>
        )}
      </View>
    </BottomSheetScrollView>
  );

  // Pantalla de detalle de ruta
  const renderRouteDetailScreen = () => {
    const route = mockRoutes.find((r) => r.id === routeDetailData?.routeId);

    return (
      <BottomSheetScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          {renderHeader(`Ruta ${route?.number}`, true)}

          <View className="mt-6">
            <View className="mb-4 rounded-xl bg-gray-800 p-4">
              <View className="mb-3 flex-row items-center">
                <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <Text className="text-lg font-bold text-white">{route?.number}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-white">{route?.name}</Text>
                  <Text className="text-gray-400">{route?.destination}</Text>
                </View>
                <View
                  className={`h-3 w-3 rounded-full ${route?.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </View>
            </View>

            <View className="mb-4 rounded-xl bg-gray-800 p-4">
              <Text className="mb-3 text-lg font-semibold text-white">Información</Text>
              <View className="mb-2 flex-row items-center">
                <Ionicons name="location" size={16} color="#666666" />
                <Text className="ml-2 text-gray-300">Distancia: {route?.distance}</Text>
              </View>
              <View className="mb-2 flex-row items-center">
                <Ionicons name="time" size={16} color="#666666" />
                <Text className="ml-2 text-gray-300">
                  Estado: {route?.isActive ? 'Activa' : 'Inactiva'}
                </Text>
              </View>
            </View>

            <TouchableOpacity className="mb-4 rounded-xl bg-blue-600 p-4">
              <Text className="text-center text-lg font-semibold text-white">Ver en Mapa</Text>
            </TouchableOpacity>

            <TouchableOpacity className="rounded-xl bg-gray-800 p-4">
              <Text className="text-center text-lg font-semibold text-white">Horarios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetScrollView>
    );
  };

  // Pantalla Acerca de
  const renderAboutScreen = () => (
    <BottomSheetScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-5">
        {renderHeader('Acerca de', true)}

        <View className="mt-6">
          <View className="mb-6 items-center">
            <Ionicons name="bus" size={64} color="#007AFF" />
            <Text className="mt-3 text-2xl font-bold text-white">Mi App de Rutas</Text>
            <Text className="mt-2 text-center text-gray-400">
              Tu compañero para navegar por la ciudad
            </Text>
          </View>

          <View className="mb-4 rounded-xl bg-gray-800 p-4">
            <Text className="mb-3 text-lg font-semibold text-white">Versión</Text>
            <Text className="text-gray-300">1.0.0</Text>
          </View>

          <View className="mb-4 rounded-xl bg-gray-800 p-4">
            <Text className="mb-3 text-lg font-semibold text-white">Desarrollado por</Text>
            <Text className="text-gray-300">Tu Nombre</Text>
          </View>

          <View className="rounded-xl bg-gray-800 p-4">
            <Text className="mb-3 text-lg font-semibold text-white">Contacto</Text>
            <Text className="text-gray-300">contacto@miapp.com</Text>
          </View>
        </View>
      </View>
    </BottomSheetScrollView>
  );

  // Pantalla Paraderos
  const renderStopsScreen = () => (
    <BottomSheetScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-5">
        {renderHeader('Paraderos', true)}

        <View className="mt-6">
          {[1, 2, 3, 4, 5].map((stop) => (
            <TouchableOpacity key={stop} className="mb-3 rounded-xl bg-gray-800 p-4">
              <View className="flex-row items-center">
                <Ionicons name="location" size={24} color="#007AFF" />
                <View className="ml-4 flex-1">
                  <Text className="font-semibold text-white">Paradero {stop}</Text>
                  <Text className="text-gray-400">
                    Calle {stop * 10} con Carrera {stop * 5}
                  </Text>
                </View>
                <Text className="text-gray-400">{stop * 100}m</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BottomSheetScrollView>
  );

  const renderBottomSheetContent = () => {
    if (bottomSheetIndex === 0) {
      // Estado colapsado - Solo barra de búsqueda
      return (
        <BottomSheetView className="pb-4">
          {renderSearchBar()}
          <View className="items-center">
            <Text className="text-sm text-gray-400">Arrastra hacia arriba para buscar rutas</Text>
          </View>
        </BottomSheetView>
      );
    }

    // Estado expandido - Renderizar según la pantalla actual
    switch (currentScreen) {
      case 'route-detail':
        return renderRouteDetailScreen();
      case 'about':
        return renderAboutScreen();
      case 'stops':
        return renderStopsScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView className="relative flex-1 bg-black h-screen w-screen">
      <Header />

      {/* Mapa - siempre visible */}
      <View className="flex-1">
        <View className="flex-1 items-center justify-center bg-zinc-800">
          <Ionicons name="map" size={64} color="#666666" />
          <Text className="mt-2 text-lg text-gray-400">Mapa Interactivo</Text>
          <Text className="mt-1 text-sm text-gray-500">
            {currentScreen !== 'home' ? `Viendo: ${currentScreen}` : 'Pantalla principal'}
          </Text>
        </View>
      </View>

      {/* Bottom Sheet con navegación interna */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: '#1a1a1a' }}
        handleIndicatorStyle={{ backgroundColor: '#666666' }}
        keyboardBehavior="fillParent"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose={false}>
        {renderBottomSheetContent()}
      </BottomSheet>
    </SafeAreaView>
  );
}
