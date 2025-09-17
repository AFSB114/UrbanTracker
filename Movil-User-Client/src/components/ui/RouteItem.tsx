import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RouteItemProps {
  routeNumber: string;
  routeName: string;
  destination: string;
  distance: string;
  isActive: boolean;
  onPress: () => void;
}

export default function RouteItem({
  routeNumber,
  routeName,
  destination,
  distance,
  isActive,
  onPress,
}: RouteItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center rounded-xl bg-gray-800 p-4 mb-3">
      <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-blue-600">
        <Text className="text-lg font-bold text-white">{routeNumber}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-white">{routeName}</Text>
        <Text className="text-gray-400">{destination}</Text>
        <Text className="text-sm text-gray-300">{distance}</Text>
      </View>
      <View
        className={`h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
      />
    </TouchableOpacity>
  );
}
