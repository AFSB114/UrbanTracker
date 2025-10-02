import React from 'react';
import { View, Text } from 'react-native';
import { CONNECTION_STATUS } from '@/config/constants';

interface ConnectionStatusCardProps {
  mqttStatus: string;
  trackingStatus: boolean;
  recorridoStatus: boolean;
}

export const ConnectionStatusCard = ({
  mqttStatus,
  trackingStatus,
  recorridoStatus,
}: ConnectionStatusCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case CONNECTION_STATUS.CONNECTED:
        return 'bg-green-500';
      case CONNECTION_STATUS.RECONNECTING:
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case CONNECTION_STATUS.CONNECTED:
        return 'text-green-400';
      case CONNECTION_STATUS.RECONNECTING:
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  return (
    <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <Text className="mb-3 text-sm font-bold text-zinc-300">ESTADO DE CONEXIONES</Text>

      {/* Estado MQTT */}
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-zinc-400">MQTT Broker</Text>
        <View className="flex-row items-center">
          <View className={`mr-2 h-3 w-3 rounded-full ${getStatusColor(mqttStatus)}`} />
          <Text className={`font-semibold ${getStatusTextColor(mqttStatus)}`}>{mqttStatus}</Text>
        </View>
      </View>

      {/* Estado Tracking */}
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-zinc-400">Tracking de Ubicación</Text>
        <View className="flex-row items-center">
          <View
            className={`mr-2 h-3 w-3 rounded-full ${
              trackingStatus ? 'bg-green-500' : 'bg-zinc-600'
            }`}
          />
          <Text className={`font-semibold ${trackingStatus ? 'text-green-400' : 'text-zinc-400'}`}>
            {trackingStatus ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      {/* Estado Recorrido */}
      <View className="flex-row items-center justify-between">
        <Text className="text-zinc-400">Estado del Recorrido</Text>
        <View className="flex-row items-center">
          <View
            className={`mr-2 h-3 w-3 rounded-full ${
              recorridoStatus ? 'bg-blue-500' : 'bg-zinc-600'
            }`}
          />
          <Text className={`font-semibold ${recorridoStatus ? 'text-blue-400' : 'text-zinc-400'}`}>
            {recorridoStatus ? 'En Recorrido' : 'Detenido'}
          </Text>
        </View>
      </View>
    </View>
  );
};
