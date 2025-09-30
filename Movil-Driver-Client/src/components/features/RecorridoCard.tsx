import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RecorridoCardProps {
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  onToggle: () => void;
}

export const RecorridoCard = ({
  isActive,
  startTime,
  endTime,
  onToggle,
}: RecorridoCardProps) => {
  return (
    <View className="mb-6">
      {/* Botón Principal */}
      <View
        onTouchEnd={onToggle}
        className={`flex-row items-center justify-center rounded-xl border py-4 ${
          isActive ? 'border-red-500 bg-red-600' : 'border-green-500 bg-green-600'
        }`}>
        <Icon name="car" size={24} color="#f4f4f5" style={{ marginRight: 12 }} />
        <Text className="text-lg font-bold text-zinc-100">
          {isActive ? 'Finalizar Trayecto' : 'Iniciar Trayecto'}
        </Text>
      </View>

      {/* Información de Horas */}
      <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <View className="mb-3 flex-row justify-between">
          <Text className="text-zinc-400">Hora de inicio</Text>
          <Text className="font-semibold text-zinc-100">{startTime || '05:00'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Hora final</Text>
          <Text className="font-semibold text-zinc-100">
            {isActive ? 'En curso...' : endTime || '00:00'}
          </Text>
        </View>
      </View>
    </View>
  );
};