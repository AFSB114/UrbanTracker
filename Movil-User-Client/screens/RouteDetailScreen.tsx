import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../components/navigation/AppNavigator';

type RouteDetailScreenRouteProp = RouteProp<RootStackParamList, 'RouteDetail'>;

// Datos de ejemplo para la ruta
const mockRouteData = {
  id: '1',
  number: '999',
  name: 'Ruta Principal',
  destinations: {
    ida: 'Alberto Galindo',
    vuelta: 'Conj. María Paula'
  },
  stops: {
    ida: [
      { name: 'Terminal de Transportes', isActive: true },
      { name: 'Centro Comercial Galerías', isActive: true },
      { name: 'Universidad Nacional', isActive: true },
      { name: 'Hospital San Juan de Dios', isActive: false },
      { name: 'Alberto Galindo', isActive: true },
    ],
    vuelta: [
      { name: 'Alberto Galindo', isActive: true },
      { name: 'Hospital San Juan de Dios', isActive: false },
      { name: 'Universidad Nacional', isActive: true },
      { name: 'Centro Comercial Galerías', isActive: true },
      { name: 'Conj. María Paula', isActive: true },
    ]
  },
  schedule: '5:00 AM - 11:00 PM',
  frequency: 'Cada 10 minutos',
  fare: '$2,500',
  isActive: true,
};

export default function RouteDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteDetailScreenRouteProp>();
  const { routeId, routeName } = route.params;

  const handleClose = () => {
    navigation.goBack();
  };

  const renderStopItem = (stop: { name: string; isActive: boolean }, index: number) => (
    <View key={index} className="flex-row mb-4">
      <View className="items-center mr-4">
        <View 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: stop.isActive ? '#4CAF50' : '#999999' }}
        />
        {index < mockRouteData.stops.ida.length - 1 && (
          <View 
            className="w-0.5 h-8 mt-1"
            style={{ backgroundColor: stop.isActive ? '#4CAF50' : '#999999' }}
          />
        )}
      </View>
      <View className="flex-1">
        <Text 
          className="text-base font-medium mb-0.5"
          style={{ color: stop.isActive ? '#ffffff' : '#999999' }}
        >
          {stop.name}
        </Text>
        <Text className="text-xs text-gray-400">
          {stop.isActive ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-700">
        <TouchableOpacity onPress={handleClose} className="p-1">
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Ruta</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Información principal de la ruta */}
        <View className="p-5 items-center">
          <View className="w-20 h-20 rounded-full bg-green-500 justify-center items-center mb-4">
            <Text className="text-white text-3xl font-bold">{mockRouteData.number}</Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-4 text-center">{mockRouteData.name}</Text>
          
          <View className="w-full">
            <View className="flex-row items-center mb-2">
              <Ionicons name="arrow-forward" size={16} color="#4CAF50" />
              <Text className="text-white text-base ml-2.5">{mockRouteData.destinations.ida}</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="arrow-back" size={16} color="#4CAF50" />
              <Text className="text-white text-base ml-2.5">{mockRouteData.destinations.vuelta}</Text>
            </View>
          </View>
        </View>

        {/* Información adicional */}
        <View className="px-5 pb-5">
          <View className="flex-row items-center mb-3">
            <Ionicons name="time" size={20} color="#007AFF" />
            <Text className="text-gray-400 text-base ml-2.5 mr-2.5 min-w-20">Horario:</Text>
            <Text className="text-white text-base flex-1">{mockRouteData.schedule}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="refresh" size={20} color="#007AFF" />
            <Text className="text-gray-400 text-base ml-2.5 mr-2.5 min-w-20">Frecuencia:</Text>
            <Text className="text-white text-base flex-1">{mockRouteData.frequency}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="card" size={20} color="#007AFF" />
            <Text className="text-gray-400 text-base ml-2.5 mr-2.5 min-w-20">Tarifa:</Text>
            <Text className="text-white text-base flex-1">{mockRouteData.fare}</Text>
          </View>
        </View>

        {/* Paradas IDA */}
        <View className="px-5 mb-8">
          <Text className="text-white text-lg font-bold mb-4">IDA - {mockRouteData.destinations.ida}</Text>
          <View className="pl-2.5">
            {mockRouteData.stops.ida.map((stop, index) => renderStopItem(stop, index))}
          </View>
        </View>

        {/* Paradas VUELTA */}
        <View className="px-5 mb-8">
          <Text className="text-white text-lg font-bold mb-4">VUELTA - {mockRouteData.destinations.vuelta}</Text>
          <View className="pl-2.5">
            {mockRouteData.stops.vuelta.map((stop, index) => renderStopItem(stop, index))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
