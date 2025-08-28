import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router, Redirect } from 'expo-router';
import useAuth from '@/auth/hooks/useAuth';
import { AuthService } from '@/auth/services/authService';

export default function LoginScreen() {
  const [identificacion, setIdentificacion] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();

  // Redirigir si ya está autenticado
  if (!isLoading && isAuthenticated) {
    return <Redirect href="/(protected)/" />;
  }

  const handleLogin = async () => {
    if (!identificacion || !password) {
      Alert.alert('Campos incompletos', 'Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const success = await login({ identificacion, password });
      if (success) {
        // La redirección se maneja automáticamente por el useEffect arriba
        console.log('Login exitoso');
      } else {
        Alert.alert('Error de autenticación', 'Credenciales inválidas. Por favor, verifica tu información.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión. Inténtalo nuevamente.');
      console.error('Error en login:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Contraseña',
      'Para restablecer tu contraseña, por favor, contacta al administrador del sistema o a soporte técnico.',
      [{ text: 'Entendido' }]
    );
  };

  const handleClearSession = async () => {
    Alert.alert(
      'Limpiar Sesión',
      'Esto eliminará cualquier sesión guardada. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            await AuthService.clearSession();
            Alert.alert('Sesión Limpiada', 'La sesión ha sido eliminada correctamente.');
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-7">
      <View className="mb-10 w-60 h-60">
        {/* Logo */}
        <Image
          source={require('../../assets/image.png')}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>

      {/* Campo de Identificación */}
      <View className="mb-4 w-full">
        <Text className="mb-1 ml-4 text-gray-300">Identificación</Text>
        <TextInput
          keyboardType='numeric'
          placeholderTextColor="#a1a1aa"
          className="rounded-full bg-zinc-800 px-5 py-3 text-white"
          placeholder="Ingresa tu credencial"
          value={identificacion}
          onChangeText={setIdentificacion}
        />
      </View>

      {/* Campo de Contraseña */}
      <View className="mb-2 w-full">
        <Text className="mb-1 ml-4 text-gray-300">Contraseña</Text>
        <View className="flex-row items-center rounded-full bg-zinc-800">
          <TextInput
            placeholderTextColor="#a1a1aa"
            className="flex-1 px-5 py-3 text-white"
            placeholder="Ingresa tu contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            className="p-3"
          >
            <Text className="font-bold text-gray-400">{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleForgotPassword} className="mb-6 w-full items-end pr-2">
        <Text className="text-sm text-blue-500">¿Necesitas ayuda?</Text>
      </TouchableOpacity>

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity onPress={handleLogin} className="rounded-full bg-gray-200 py-4 px-16 mb-4">
        <Text className="text-center text-lg font-bold text-black">Iniciar Sesión</Text>
      </TouchableOpacity>
      
      {/* Botón de Limpiar Sesión (Solo para desarrollo) */}
      <TouchableOpacity onPress={handleClearSession} className="rounded-full bg-red-600 py-3 px-8">
        <Text className="text-center text-sm font-bold text-white">Limpiar Sesión (Dev)</Text>
      </TouchableOpacity>
    </View>
  );
}
