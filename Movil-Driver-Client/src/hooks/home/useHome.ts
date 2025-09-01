import { useAuth } from '@/hooks/auth';
import { useLocation } from '@/hooks/location';
import { useMqttPublish } from '@/hooks/mqtt/useMqtt';
import { useTracking } from '@/hooks/tracking';
import { AuthService } from '@/services/api/authService';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useHome = () => {
  const { logout } = useAuth();
  const { isRecorridoActive, startTime, endTime, startRecorrido, endRecorrido } = useTracking();
  const { location, isTracking, toggleTracking } = useLocation();
  const { connectionStatus, publishLocation, publishRecorridoStatus } = useMqttPublish();

  // Estados para la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleToggleTrayecto = () => {
    if (!isRecorridoActive) {
      // Iniciar trayecto directamente sin alerta de confirmación
      console.log('🚚 Iniciando trayecto completo...');
      // Iniciar el recorrido primero
      startRecorrido();
      // Activar el tracking automáticamente después de un breve delay
      setTimeout(() => {
        if (!isTracking) {
          console.log('📍 Activando tracking automáticamente...');
          toggleTracking();
        }
      }, 1000);
    } else {
      Alert.alert(
        'Finalizar Trayecto',
        '¿Estás seguro de que quieres finalizar el trayecto? Esto detendrá el tracking y desconectará del servidor.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Finalizar',
            style: 'destructive',
            onPress: () => {
              console.log('🏁 Finalizando trayecto completo...');
              // Desactivar el tracking primero
              if (isTracking) {
                toggleTracking();
              }
              // Finalizar el recorrido
              endRecorrido();
            },
          },
        ]
      );
    }
  };

  const handleClearSession = async () => {
    Alert.alert('Limpiar Sesión', 'Esto eliminará cualquier sesión guardada. ¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpiar',
        style: 'destructive',
        onPress: async () => {
          await AuthService.clearSession();
          Alert.alert('Sesión Limpiada', 'La sesión ha sido eliminada correctamente.');
        },
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Hubo un problema al cerrar sesión.');
    }
  };

  const handleEnviarReporte = () => {
    if (!asunto || !descripcion) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos para enviar el reporte.');
      return;
    }
    console.log('Reporte Enviado:', { asunto, descripcion });

    setAsunto('');
    setDescripcion('');
    setModalVisible(false);

    Alert.alert('Reporte Enviado', 'Tu novedad ha sido enviada con éxito.');
  };

  // Publicación de ubicación vía MQTT
  useEffect(() => {
    if (location && connectionStatus === 'Conectado' && isRecorridoActive) {
      const success = publishLocation(location);
      if (success) {
        console.log('📍 Nueva ubicación publicada:', {
          lat: location.latitude,
          lon: location.longitude,
          timestamp: location.timestamp,
        });
      }
    }
  }, [location, connectionStatus, isRecorridoActive, publishLocation]);

  // Publicar estado cuando cambie el recorrido
  useEffect(() => {
    if (connectionStatus === 'Conectado') {
      const success = publishRecorridoStatus(isRecorridoActive, startTime, endTime);
      if (success) {
        console.log('📊 Estado de recorrido publicado:', isRecorridoActive ? 'Iniciado' : 'Finalizado');
      }
    }
  }, [isRecorridoActive, startTime, endTime, connectionStatus, publishRecorridoStatus]);

  return {
    // Estados
    modalVisible,
    asunto,
    descripcion,
    isRecorridoActive,
    startTime,
    endTime,
    isTracking,
    connectionStatus,

    // Setters
    setModalVisible,
    setAsunto,
    setDescripcion,

    // Handlers
    handleToggleTrayecto,
    handleClearSession,
    handleLogout,
    handleEnviarReporte,
  };
};
