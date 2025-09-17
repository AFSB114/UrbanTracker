import React from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';

// Hooks
import { useRoutes } from '../../hooks/useRoutes';
import { useBottomSheet } from '../../hooks/useBottomSheet';

// Components
import RouteItem from '../ui/RouteItem';

interface MapBottomSheetProps {
  snapPoints: number[];
  onViewRouteOnMap?: (routeId: number, routeNumber: string) => void;
}

export default function MapBottomSheet({ snapPoints, onViewRouteOnMap }: MapBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const searchInputRef = useRef<any>(null);

  const { routes, searchText, setSearchText } = useRoutes();
  const {
    bottomSheetIndex,
    isSearchFocused,
    currentScreen,
    routeDetailData,
    handleSheetChanges,
    handleSearchFocus,
    handleSearchBlur,
    navigateToRouteDetail,
    navigateToAbout,
    navigateToStops,
    navigateBack,
  } = useBottomSheet();

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

        {routes.map((route) => (
          <RouteItem
            key={route.id}
            routeNumber={route.numberRoute}
            routeName={route.description}
            destination={route.description}
            distance={route.totalDistance.toString()}
            isActive={route.active}
            onPress={() => navigateToRouteDetail(route.id.toString(), route.description)}
          />
        ))}

        {routes.length === 0 && (
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
    const route = routes.find((r) => r.id === parseInt(routeDetailData?.routeId || '0'));

    return (
      <BottomSheetScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          {renderHeader(`Ruta ${route?.numberRoute}`, true)}

          <View className="mt-6">
            <View className="mb-4 rounded-xl bg-gray-800 p-4">
              <View className="mb-3 flex-row items-center">
                <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <Text className="text-lg font-bold text-white">{route?.numberRoute}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-white">{route?.description}</Text>
                  <Text className="text-gray-400">{route?.description}</Text>
                </View>
                <View
                  className={`h-3 w-3 rounded-full ${route?.active ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </View>
            </View>

            <View className="mb-4 rounded-xl bg-gray-800 p-4">
              <Text className="mb-3 text-lg font-semibold text-white">Información</Text>
              <View className="mb-2 flex-row items-center">
                <Ionicons name="location" size={16} color="#666666" />
                <Text className="ml-2 text-gray-300">Distancia: {route?.totalDistance}</Text>
              </View>
              <View className="mb-2 flex-row items-center">
                <Ionicons name="time" size={16} color="#666666" />
                <Text className="ml-2 text-gray-300">
                  Estado: {route?.active ? 'Activa' : 'Inactiva'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="mb-4 rounded-xl bg-blue-600 p-4"
              onPress={() => route && onViewRouteOnMap && onViewRouteOnMap(route.id, route.numberRoute)}
            >
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
            <Text className="mt-3 text-2xl font-bold text-white">UrbanTracker</Text>
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
            <Text className="text-gray-300">UrbanTracker Team</Text>
          </View>

          <View className="rounded-xl bg-gray-800 p-4">
            <Text className="mb-3 text-lg font-semibold text-white">Contacto</Text>
            <Text className="text-gray-300">contacto@urbantracker.com</Text>
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
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetIndex}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: '#1a1a1a' }}
      handleIndicatorStyle={{ backgroundColor: '#666666' }}
      keyboardBehavior="fillParent"
      android_keyboardInputMode="adjustResize"
      enablePanDownToClose={false}>
      {renderBottomSheetContent()}
    </BottomSheet>
  );
}
