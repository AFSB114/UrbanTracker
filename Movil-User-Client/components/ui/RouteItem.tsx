import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RouteItemProps {
  routeNumber: string;
  routeName: string;
  destination: string;
  distance: string;
  isActive: boolean;
  onPress: () => void;
}

const getRouteColor = (routeNumber: string) => {
  const colors = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', 
    '#F44336', '#00BCD4', '#FF5722', '#3F51B5'
  ];
  const index = parseInt(routeNumber) % colors.length;
  return colors[index];
};

export default function RouteItem({ 
  routeNumber, 
  routeName, 
  destination, 
  distance, 
  isActive, 
  onPress 
}: RouteItemProps) {
  const routeColor = getRouteColor(routeNumber);

  return (
    <TouchableOpacity 
      className="flex-row items-center py-4 px-5 border-b border-gray-700"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View 
        className="w-12 h-12 rounded-full justify-center items-center mr-4"
        style={{ backgroundColor: routeColor }}
      >
        <Text className="text-white text-lg font-bold">{routeNumber}</Text>
      </View>
      
      <View className="flex-1">
        <Text className="text-white text-base font-semibold mb-0.5">{routeName}</Text>
        <Text className="text-gray-400 text-sm mb-0.5">{destination}</Text>
        <Text className="text-gray-400 text-xs">{distance}</Text>
      </View>
      
      <View className="flex-row items-center mr-2.5">
        <View 
          className="w-2 h-2 rounded-full mr-1.5"
          style={{ backgroundColor: isActive ? '#4CAF50' : '#999999' }}
        />
        <Text 
          className="text-xs font-medium"
          style={{ color: isActive ? '#4CAF50' : '#999999' }}
        >
          {isActive ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#999999" />
    </TouchableOpacity>
  );
}
