import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  const handleContact = (type: 'phone' | 'email' | 'website') => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:+573001234567');
        break;
      case 'email':
        Linking.openURL('mailto:info@urbantracker.com');
        break;
      case 'website':
        Linking.openURL('https://urbantracker.com');
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-700">
        <TouchableOpacity onPress={handleClose} className="p-1">
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Nosotros</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Logo y nombre de la empresa */}
        <View className="items-center py-8 px-5">
          <View className="w-20 h-20 rounded-full bg-gray-800 justify-center items-center mb-4">
            <Ionicons name="bus" size={48} color="#4CAF50" />
          </View>
          <Text className="text-white text-2xl font-bold mb-1">UrbanTracker</Text>
          <Text className="text-gray-400 text-base text-center">Tu compañero de transporte público</Text>
        </View>

        {/* Descripción */}
        <View className="px-5 pb-6">
          <Text className="text-white text-lg font-bold mb-4">Sobre Nosotros</Text>
          <Text className="text-gray-300 text-base leading-6">
            UrbanTracker es una aplicación móvil innovadora diseñada para mejorar la experiencia 
            de los usuarios del transporte público. Nuestra misión es proporcionar información 
            en tiempo real sobre rutas, horarios y paradas para hacer tu viaje más eficiente y cómodo.
          </Text>
        </View>

        {/* Misión y Visión */}
        <View className="px-5 pb-6">
          <Text className="text-white text-lg font-bold mb-4">Nuestra Misión</Text>
          <Text className="text-gray-300 text-base leading-6">
            Facilitar la movilidad urbana mediante tecnología innovadora que conecte a los 
            usuarios con el transporte público de manera eficiente, segura y sostenible.
          </Text>
        </View>

        <View className="px-5 pb-6">
          <Text className="text-white text-lg font-bold mb-4">Nuestra Visión</Text>
          <Text className="text-gray-300 text-base leading-6">
            Ser la plataforma líder en información de transporte público, contribuyendo a 
            ciudades más inteligentes y conectadas.
          </Text>
        </View>

        {/* Características */}
        <View className="px-5 pb-6">
          <Text className="text-white text-lg font-bold mb-4">Características Principales</Text>
          <View className="mt-2.5">
            <View className="flex-row items-center mb-3">
              <Ionicons name="location" size={20} color="#4CAF50" />
              <Text className="text-white text-base ml-3">Rutas en tiempo real</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="time" size={20} color="#4CAF50" />
              <Text className="text-white text-base ml-3">Horarios actualizados</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="map" size={20} color="#4CAF50" />
              <Text className="text-white text-base ml-3">Mapas interactivos</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="notifications" size={20} color="#4CAF50" />
              <Text className="text-white text-base ml-3">Notificaciones inteligentes</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="search" size={20} color="#4CAF50" />
              <Text className="text-white text-base ml-3">Búsqueda avanzada</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
              <Text className="text-white text-base ml-3">Información confiable</Text>
            </View>
          </View>
        </View>

        {/* Información de contacto */}
        <View className="px-5 pb-6">
          <Text className="text-white text-lg font-bold mb-4">Contáctanos</Text>
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-700" onPress={() => handleContact('phone')}>
            <Ionicons name="call" size={20} color="#007AFF" />
            <Text className="text-white text-base ml-3 flex-1">+57 300 123 4567</Text>
            <Ionicons name="chevron-forward" size={16} color="#999999" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-700" onPress={() => handleContact('email')}>
            <Ionicons name="mail" size={20} color="#007AFF" />
            <Text className="text-white text-base ml-3 flex-1">info@urbantracker.com</Text>
            <Ionicons name="chevron-forward" size={16} color="#999999" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-700" onPress={() => handleContact('website')}>
            <Ionicons name="globe" size={20} color="#007AFF" />
            <Text className="text-white text-base ml-3 flex-1">www.urbantracker.com</Text>
            <Ionicons name="chevron-forward" size={16} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* Información legal */}
        <View className="px-5 pb-6">
          <Text className="text-white text-lg font-bold mb-4">Información Legal</Text>
          <Text className="text-gray-400 text-sm leading-5">
            UrbanTracker v1.0.0{'\n'}
            © 2025 UrbanTracker. Todos los derechos reservados.{'\n\n'}
            Esta aplicación utiliza datos proporcionados por las autoridades de transporte público 
            y se actualiza regularmente para garantizar la precisión de la información.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
