import { Redirect } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLoginForm } from '@/hooks/auth/useLoginForm';

export default function Login() {
  const {
    loginCredential,
    handleChangeCredentials,
    showPassword,
    isLoading,
    handleLogin,
    togglePasswordVisibility,
    handleForgotPassword,
  } = useLoginForm();

  if (isLoading) {
    return <Redirect href="/(protected)/" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-black px-7">

      {/* Logo */}
      <View className="mb-10 h-60 w-60">
        <Image
          source={require('@Assets/icons/Logotipo.png')}
          className="h-full w-full"
          resizeMode="contain"
        />
      </View>

      {/* Campo de Identificación */}
      <View className="mb-4 w-full">
        <Text className="mb-1 ml-4 text-gray-300">Identificación</Text>
        <TextInput
          keyboardType="numeric"
          placeholderTextColor="#a1a1aa"
          className="rounded-full bg-zinc-800 px-5 py-3 text-white"
          placeholder="Ingresa tu credencial"
          value={loginCredential.identificacion}
          onChangeText={handleChangeCredentials('identificacion')}
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
            value={loginCredential.password}
            onChangeText={handleChangeCredentials('password')}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} className="p-3">
            <Text className="font-bold text-gray-400">{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleForgotPassword} className="mb-6 w-full items-end pr-2">
        <Text className="text-sm text-blue-500">¿Necesitas ayuda?</Text>
      </TouchableOpacity>

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity onPress={handleLogin} className="mb-4 rounded-full bg-gray-200 px-16 py-4">
        <Text className="text-center text-lg font-bold text-black">Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
