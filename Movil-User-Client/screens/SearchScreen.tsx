import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RouteItem from '../components/ui/RouteItem';

// Datos de ejemplo para búsqueda
const allRoutes = [
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
  {
    id: '5',
    number: '555',
    name: 'Ruta Oeste',
    destination: 'Mall Plaza - Aeropuerto',
    distance: '400m hacia la autopista',
    isActive: true,
  },
  {
    id: '6',
    number: '444',
    name: 'Ruta Express',
    destination: 'Centro - Suburbios',
    distance: '100m hacia la vía rápida',
    isActive: false,
  },
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState(allRoutes);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredRoutes(allRoutes);
    } else {
      const filtered = allRoutes.filter(route => 
        route.number.toLowerCase().includes(searchText.toLowerCase()) ||
        route.name.toLowerCase().includes(searchText.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRoutes(filtered);
    }
  }, [searchText]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleRoutePress = (routeId: string, routeName: string) => {
    (navigation as any).navigate('RouteDetail', { routeId, routeName });
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const renderSearchResult = ({ item }: { item: typeof allRoutes[0] }) => (
    <RouteItem
      routeNumber={item.number}
      routeName={item.name}
      destination={item.destination}
      distance={item.distance}
      isActive={item.isActive}
      onPress={() => handleRoutePress(item.id, item.name)}
    />
  );

  return (
    <View className="flex-1">
      {/* Overlay de fondo */}
      <TouchableOpacity className="absolute inset-0 bg-black/50" onPress={handleClose} activeOpacity={1} />
      
      {/* Contenido de búsqueda */}
      <View className="flex-1 bg-gray-900 mt-24 rounded-t-5xl">
        <SafeAreaView className="flex-1">
          {/* Header de búsqueda */}
          <View className="flex-row items-center px-5 py-4 border-b border-gray-700">
            <View className="flex-1 flex-row items-center bg-gray-800 rounded-full px-4 py-3 mr-4">
              <Ionicons name="search" size={20} color="#999999" className="mr-2.5" />
              <TextInput
                className="flex-1 text-white text-base py-0"
                placeholder="Buscar rutas..."
                placeholderTextColor="#999999"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
                returnKeyType="search"
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={handleClearSearch} className="ml-2.5">
                  <Ionicons name="close-circle" size={20} color="#999999" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={handleClose} className="py-1">
              <Text className="text-blue-500 text-base font-medium">Cancelar</Text>
            </TouchableOpacity>
          </View>

          {/* Resultados de búsqueda */}
          <View className="flex-1">
            {searchText.length > 0 && (
              <Text className="text-gray-400 text-sm px-5 py-2.5">
                {filteredRoutes.length} resultado{filteredRoutes.length !== 1 ? 's' : ''} encontrado{filteredRoutes.length !== 1 ? 's' : ''}
              </Text>
            )}
            
            {filteredRoutes.length > 0 ? (
              <FlatList
                data={filteredRoutes}
                renderItem={renderSearchResult}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : searchText.length > 0 ? (
              <View className="flex-1 justify-center items-center px-10">
                <Ionicons name="search" size={48} color="#666666" />
                <Text className="text-white text-lg font-bold mt-4 mb-1">No se encontraron rutas</Text>
                <Text className="text-gray-400 text-sm text-center">
                  Intenta con otro término de búsqueda
                </Text>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center px-10">
                <Ionicons name="bus" size={48} color="#666666" />
                <Text className="text-white text-lg font-bold mt-4 mb-1">Busca rutas por número o nombre</Text>
                <Text className="text-gray-400 text-sm text-center">
                  Ejemplo: "999", "Principal", "Norte"
                </Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
