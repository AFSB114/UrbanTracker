import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo de paraderos
const mockStops = [
  {
    id: '1',
    name: 'Terminal de Transportes',
    address: 'Calle 15 # 45-67',
    routes: ['999', '888', '777'],
    facilities: ['Baños', 'Cafetería', 'WiFi'],
    isActive: true,
  },
  {
    id: '2',
    name: 'Centro Comercial Galerías',
    address: 'Carrera 68 # 15-45',
    routes: ['999', '666', '555'],
    facilities: ['Centro Comercial', 'Cajeros', 'Restaurantes'],
    isActive: true,
  },
  {
    id: '3',
    name: 'Universidad Nacional',
    address: 'Carrera 30 # 45-03',
    routes: ['888', '666', '444'],
    facilities: ['Biblioteca', 'Cafetería', 'Seguridad'],
    isActive: true,
  },
  {
    id: '4',
    name: 'Hospital San Juan de Dios',
    address: 'Calle 10 # 18-75',
    routes: ['777', '555'],
    facilities: ['Hospital', 'Farmacia', 'Emergencias'],
    isActive: false,
  },
  {
    id: '5',
    name: 'Alberto Galindo',
    address: 'Carrera 15 # 25-80',
    routes: ['999', '444'],
    facilities: ['Parque', 'Zona Comercial'],
    isActive: true,
  },
  {
    id: '6',
    name: 'Conj. María Paula',
    address: 'Calle 45 # 12-34',
    routes: ['999', '888'],
    facilities: ['Conjunto Residencial', 'Seguridad'],
    isActive: true,
  },
];

export default function StopsScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedStop, setSelectedStop] = useState<typeof mockStops[0] | null>(null);

  const handleClose = () => {
    navigation.goBack();
  };

  const filteredStops = mockStops.filter(stop =>
    stop.name.toLowerCase().includes(searchText.toLowerCase()) ||
    stop.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderStopItem = (stop: typeof mockStops[0]) => (
    <TouchableOpacity
      key={stop.id}
      className={`bg-gray-800 rounded-xl p-4 mb-2.5 ${selectedStop?.id === stop.id ? 'bg-gray-700' : ''}`}
      onPress={() => setSelectedStop(selectedStop?.id === stop.id ? null : stop)}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-white text-base font-bold mb-1">{stop.name}</Text>
          <Text className="text-gray-400 text-sm">{stop.address}</Text>
        </View>
        <View className="flex-row items-center">
          <View 
            className="w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: stop.isActive ? '#4CAF50' : '#999999' }}
          />
          <Text 
            className="text-xs font-medium"
            style={{ color: stop.isActive ? '#4CAF50' : '#999999' }}
          >
            {stop.isActive ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      {selectedStop?.id === stop.id && (
        <View className="mt-4 pt-4 border-t border-gray-600">
          <View className="mb-4">
            <Text className="text-white text-sm font-bold mb-2">Rutas que pasan:</Text>
            <View className="flex-row flex-wrap">
              {stop.routes.map((route, index) => (
                <View key={index} className="bg-green-500 rounded-xl px-2.5 py-1 mr-2 mb-1">
                  <Text className="text-white text-xs font-bold">{route}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-white text-sm font-bold mb-2">Facilidades:</Text>
            <View className="flex-row flex-wrap">
              {stop.facilities.map((facility, index) => (
                <View key={index} className="flex-row items-center mr-4 mb-1">
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  <Text className="text-gray-300 text-sm ml-1">{facility}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-700 bg-red-600">
        <TouchableOpacity onPress={handleClose} className="p-1">
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Paraderos</Text>
        <View className="w-8" />
      </View>

      {/* Barra de búsqueda */}
      <View className="px-5 py-4 border-b border-gray-700">
        <View className="flex-row items-center bg-gray-800 rounded-full px-4 py-3">
          <Ionicons name="search" size={20} color="#999999" className="mr-2.5" />
          <TextInput
            className="flex-1 text-white text-base py-0"
            placeholder="Buscar paraderos..."
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} className="ml-2.5">
              <Ionicons name="close-circle" size={20} color="#999999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Lista de paraderos */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4">
          {filteredStops.length > 0 ? (
            filteredStops.map(renderStopItem)
          ) : (
            <View className="items-center py-10">
              <Ionicons name="location" size={48} color="#666666" />
              <Text className="text-white text-lg font-bold mt-4 mb-1">No se encontraron paraderos</Text>
              <Text className="text-gray-400 text-sm text-center">
                Intenta con otro término de búsqueda
              </Text>
            </View>
          )}
        </View>

        {/* Información adicional */}
        <View className="px-5 py-5 border-t border-gray-700">
          <Text className="text-white text-lg font-bold mb-2.5">Información de Paraderos</Text>
          <Text className="text-gray-300 text-sm leading-5 mb-4">
            Los paraderos son puntos de parada oficiales del sistema de transporte público. 
            Cada paradero cuenta con información actualizada sobre las rutas que lo sirven 
            y las facilidades disponibles para los usuarios.
          </Text>
          
          <View className="flex-row justify-around">
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <Text className="text-gray-400 text-xs">Paradero Activo</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-gray-400 mr-2" />
              <Text className="text-gray-400 text-xs">Paradero Inactivo</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
