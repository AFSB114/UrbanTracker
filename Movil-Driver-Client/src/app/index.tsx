import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import useAuth from '@/auth/hooks/useAuth';

export default function AppIndex() {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Redirigir basado en el estado de autenticación
  if (isAuthenticated) {
    return <Redirect href="/(protected)/" />;
  } else {
    return <Redirect href="/login" />;
  }
}
