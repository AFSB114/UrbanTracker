import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuth from '@/auth/hooks/useAuth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-black p-6">
      {/* Header */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-white">Perfil</Text>
        <Text className="text-gray-400">Información del conductor</Text>
      </View>

      {/* User Info Card */}
      <View className="mb-6 rounded-2xl bg-zinc-900 p-6">
        <View className="mb-4 flex-row items-center">
          <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <Icon name="account" size={32} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-white">
              {user?.nombre || 'Usuario'}
            </Text>
            <Text className="text-gray-400">ID: {user?.identificacion || 'N/A'}</Text>
          </View>
        </View>
        
        <View className="border-t border-zinc-700 pt-4">
          <View className="mb-2 flex-row justify-between">
            <Text className="text-gray-400">Email:</Text>
            <Text className="text-white">{user?.email || 'No registrado'}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Rol:</Text>
            <Text className="text-white capitalize">
              {user?.role === 'driver' ? 'Conductor' : user?.role || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* Options */}
      <View className="mb-6 rounded-2xl bg-zinc-900">
        <TouchableOpacity className="flex-row items-center p-4">
          <Icon name="account-edit" size={24} color="#9ca3af" className="mr-3" />
          <Text className="flex-1 text-lg text-white">Editar Perfil</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
        
        <View className="border-t border-zinc-700" />
        
        <TouchableOpacity className="flex-row items-center p-4">
          <Icon name="bell-outline" size={24} color="#9ca3af" className="mr-3" />
          <Text className="flex-1 text-lg text-white">Notificaciones</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
        
        <View className="border-t border-zinc-700" />
        
        <TouchableOpacity className="flex-row items-center p-4">
          <Icon name="help-circle-outline" size={24} color="#9ca3af" className="mr-3" />
          <Text className="flex-1 text-lg text-white">Ayuda y Soporte</Text>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-center rounded-2xl bg-red-600 p-4">
        <Icon name="logout" size={24} color="white" className="mr-2" />
        <Text className="text-lg font-bold text-white">Cerrar Sesión</Text>
      </TouchableOpacity>

      {/* App Version */}
      <View className="mt-8 items-center">
        <Text className="text-gray-500">UrbanTracker Driver</Text>
        <Text className="text-gray-500">Versión 1.0.0</Text>
      </View>
    </View>
  );
}
