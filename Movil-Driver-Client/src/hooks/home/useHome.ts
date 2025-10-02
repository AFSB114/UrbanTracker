import { useAuth } from '@/hooks/auth';
import { useLocation } from '@/hooks/location';
import { useMqtt, useMqttPublish } from '@/hooks/mqtt/useMqtt';
import { useTracking } from '@/hooks/tracking';
import { AuthService } from '@/services/api/authService';
import { LocationService } from '@/services/api/locationService';
import { TrackingService } from '@/services/api/trackingService';
import { ReportService } from '@/services/api/reportService';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useHome = () => {
  const { logout, user } = useAuth();
  const { isRecorridoActive, startTime, endTime, startRecorrido, endRecorrido } = useTracking();
  const { location, isTracking, toggleTracking } = useLocation();
  const { connectionStatus } = useMqtt();
  const { publishSafely } = useMqttPublish();

  // Estados para la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [description, setDescription] = useState('');

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

  const handleEnviarReporte = async () => {
    if (!asunto || !description) {
      Alert.alert('Campos vacíos', 'Por favor, completa todos los campos para enviar el reporte.');
      return;
    }

    const result = await ReportService.sendReport({ asunto, descripcion: description });
    if (result.success) {
      setAsunto('');
      setDescription('');
      setModalVisible(false);
      Alert.alert('Reporte Enviado', 'Tu novedad ha sido enviada con éxito.');
    } else {
      Alert.alert('Error', result.error || 'No se pudo enviar el reporte.');
    }
  };

  // Publicación de ubicación vía servicios
  useEffect(() => {
    if (location && connectionStatus === 'Conectado' && isRecorridoActive) {
      // Obtener routeId del usuario autenticado
      const routeId = user?.routeId;
      const vehicleId = user?.vehicleId || 'default-vehicle';

      console.log('📍 Publicando ubicación con datos del usuario:', {
        routeId,
        vehicleId,
        userId: user?.id,
      });

      const success = LocationService.publishLocationData(
        location,
        publishSafely,
        routeId,
        vehicleId
      );
      if (success) {
        console.log('📍 Nueva ubicación publicada:', {
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: new Date(location.timestamp).toISOString(),
          routeId,
          vehicleId,
        });
      }
    }
  }, [location, connectionStatus, isRecorridoActive, publishSafely, user]);

  // Publicar estado cuando cambie el recorrido
  useEffect(() => {
    if (connectionStatus === 'Conectado') {
      const status = {
        isRecorridoActive,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
      };
      const success = TrackingService.publishRecorridoStatus(status, publishSafely);
      if (success) {
        console.log(
          '📊 Estado de recorrido publicado:',
          isRecorridoActive ? 'Iniciado' : 'Finalizado'
        );
      }
    }
  }, [isRecorridoActive, startTime, endTime, connectionStatus, publishSafely]);

  return {
    // Estados
    modalVisible,
    asunto,
    description,
    isRecorridoActive,
    startTime,
    endTime,
    isTracking,
    connectionStatus,

    // Setters
    setModalVisible,
    setAsunto,
    setDescription,

    // Handlers
    handleToggleTrayecto,
    handleClearSession,
    handleLogout,
    handleEnviarReporte,
  };
};
