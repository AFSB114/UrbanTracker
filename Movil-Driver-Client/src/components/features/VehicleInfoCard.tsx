import React from 'react';
import { View, Text } from 'react-native';

interface VehicleInfoCardProps {
  placas: string;
  numeroInterno: string;
}

export const VehicleInfoCard = ({
  placas,
  numeroInterno,
}: VehicleInfoCardProps) => {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-sm font-bold text-zinc-300">Información del vehículo</Text>
      <View className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <View className="mb-3 border-b border-zinc-700 pb-3">
          <Text className="text-zinc-400">Placas</Text>
          <Text className="text-base font-semibold text-zinc-100">{placas}</Text>
        </View>
        <View>
          <Text className="text-zinc-400">Número interno</Text>
          <Text className="text-base font-semibold text-zinc-100">{numeroInterno}</Text>
        </View>
      </View>
    </View>
  );
};