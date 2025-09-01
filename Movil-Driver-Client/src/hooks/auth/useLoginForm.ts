import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/hooks/auth';
import type { LoginCredentials } from '@/types/auth';

export const useLoginForm = () => {
  const [loginCredential, setLoginCredentials] = useState<LoginCredentials>({
    identificacion: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();

  const handleChangeCredentials = (field: string) => (value: string) => {
    setLoginCredentials({ ...loginCredential, [field]: value });
  };

  const handleLogin = async () => {
    if (!loginCredential.identificacion || !loginCredential.password) {
      Alert.alert('Campos incompletos', 'Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const success = await login(loginCredential);
      if (success) {
        console.log('Login exitoso');
      } else {
        Alert.alert(
          'Error de autenticación',
          'Credenciales inválidas. Por favor, verifica tu información.'
        );
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

  return {
    handleChangeCredentials,
    loginCredential,
    showPassword,
    isLoggingIn,
    isAuthenticated,
    isLoading,
    handleLogin,
    togglePasswordVisibility,
    handleForgotPassword,
  };
};
