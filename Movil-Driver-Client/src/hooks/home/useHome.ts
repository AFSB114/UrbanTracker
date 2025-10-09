import { useAuth } from '@/hooks/auth';
import { useLocation } from '@/hooks/location';
import { useMqtt, useMqttPublish } from '@/hooks/mqtt/useMqtt';
import { useTracking } from '@/hooks/tracking';
import { AuthService } from '@/services/api/authService';
import { LocationService } from '@/services/api/locationService';
import { TrackingService } from '@/services/api/trackingService';
import { ReportService } from '@/services/api/reportService';
import { DriverService, DriverAssignedVehicleRoute } from '@/services/api/driverService';
import { TripService } from '@/services/api/tripService';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as ExpoLocation from 'expo-location';

export const useHome = () => {
  console.log('🏠 [useHome] Hook inicializado');
  const { logout, user } = useAuth();
  const { isRecorridoActive, startTime, endTime, startRecorrido, endRecorrido } = useTracking();
  const { location, isTracking, toggleTracking } = useLocation();
  const { connectionStatus } = useMqtt();
  const { publishSafely } = useMqttPublish();

  console.log('👤 [useHome] User actual:', user);

  // Estados para la modal
  const [modalVisible, setModalVisible] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [description, setDescription] = useState('');

  // Estados para datos dinámicos
  const [assignedData, setAssignedData] = useState<DriverAssignedVehicleRoute | null>(null);
  const [vehicleData, setVehicleData] = useState<{ vehicleId: number } | null>(null);
  const [tripHistory, setTripHistory] = useState<Array<{
    id: string;
    fecha: string;
    inicio: string;
    fin: string;
  }>>([]);
  const [isLoadingAssigned, setIsLoadingAssigned] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Estado para controlar la alerta de GPS
  const [gpsAlertVisible, setGpsAlertVisible] = useState(false);

  const handleToggleTrayecto = async () => {
    if (!isRecorridoActive) {
      // Verificar si el GPS está habilitado antes de iniciar el recorrido
      const gpsEnabled = await checkGpsEnabled();
      if (!gpsEnabled) {
        console.log('❌ GPS no está habilitado, mostrando alerta...');
        showGpsRequiredAlert();
        return;
      }

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

  // Función para obtener datos del vehículo asignado
  const fetchVehicleData = async () => {
    if (!user?.vehicleId) {
      console.log('⚠️ [useHome.fetchVehicleData] User no tiene vehicleId asignado');
      setVehicleData(null);
      return;
    }

    console.log('✅ [useHome.fetchVehicleData] VehicleId obtenido del user:', user.vehicleId);
    setVehicleData({ vehicleId: parseInt(user.vehicleId) });
  };

  // Función para obtener datos del vehículo y ruta asignados
  const fetchAssignedData = async () => {
    if (!user?.id) return;

    setIsLoadingAssigned(true);
    try {
      const result = await DriverService.getAssignedVehicleAndRoute(user.id);
      if (result.success && result.data) {
        setAssignedData(result.data);
      } else {
        console.warn('No se pudo obtener datos asignados:', result.error);
        setAssignedData(null);
      }
    } catch (error) {
      console.error('Error obteniendo datos asignados:', error);
      setAssignedData(null);
    } finally {
      setIsLoadingAssigned(false);
    }
  };

  // Función para obtener historial de viajes
  const fetchTripHistory = async () => {
    if (!vehicleData?.vehicleId) {
      console.log('⚠️ [useHome.fetchTripHistory] No hay vehicleId disponible');
      return;
    }

    console.log('🔍 [useHome.fetchTripHistory] Iniciando consulta para vehicleId:', vehicleData.vehicleId);
    setIsLoadingHistory(true);
    try {
      const result = await TripService.getTripHistory(vehicleData.vehicleId);
      console.log('📊 [useHome.fetchTripHistory] Resultado del servicio:', result);
      if (result.success && result.data) {
        const formattedHistory = TripService.formatTripHistoryForDisplay(result.data);
        console.log('✅ [useHome.fetchTripHistory] Historial formateado:', formattedHistory);
        setTripHistory(formattedHistory);
      } else {
        console.warn('⚠️ [useHome.fetchTripHistory] No se pudo obtener historial de viajes:', result.error);
        setTripHistory([]);
      }
    } catch (error) {
      console.error('❌ [useHome.fetchTripHistory] Error obteniendo historial de viajes:', error);
      setTripHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Función para verificar si el GPS está habilitado
  const checkGpsEnabled = async (): Promise<boolean> => {
    try {
      const enabled = await ExpoLocation.hasServicesEnabledAsync();
      return enabled;
    } catch (error) {
      console.error('Error verificando estado del GPS:', error);
      return false;
    }
  };

  // Función para mostrar alerta persistente de GPS
  const showGpsRequiredAlert = () => {
    setGpsAlertVisible(true);
    Alert.alert(
      'GPS Requerido',
      'El GPS debe estar activado para iniciar el recorrido. Por favor, activa el GPS en la configuración de tu dispositivo.',
      [
        {
          text: 'Verificar GPS',
          onPress: async () => {
            const isEnabled = await checkGpsEnabled();
            if (isEnabled) {
              setGpsAlertVisible(false);
              // Reintentar iniciar el recorrido
              handleToggleTrayecto();
            } else {
              // Mantener la alerta visible
              showGpsRequiredAlert();
            }
          },
        },
      ],
      { cancelable: false } // Hace que la alerta no se pueda cerrar tocando fuera
    );
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

  // Obtener datos asignados cuando el usuario esté disponible
  useEffect(() => {
    console.log('🔄 [useHome.useEffect] Ejecutando useEffect inicial');
    if (user?.id) {
      console.log('✅ [useHome.useEffect] User disponible, llamando fetchAssignedData y fetchVehicleData');
      fetchAssignedData();
      fetchVehicleData();
    } else {
      console.log('⚠️ [useHome.useEffect] User no disponible aún');
    }
  }, []); // Solo ejecutar una vez al montar

  // Obtener historial de viajes cuando tengamos los datos del vehículo
  useEffect(() => {
    console.log('🔄 [useHome.useEffect] Ejecutando useEffect para vehicleData:', vehicleData);
    if (vehicleData?.vehicleId) {
      console.log('✅ [useHome.useEffect] VehicleData disponible, llamando fetchTripHistory');
      fetchTripHistory();
    } else {
      console.log('⚠️ [useHome.useEffect] VehicleData no disponible aún');
    }
  }, [vehicleData?.vehicleId]);

  // Listener para verificar GPS cuando la alerta está visible
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (gpsAlertVisible) {
      // Verificar cada 2 segundos si el GPS se activó
      intervalId = setInterval(async () => {
        const isEnabled = await checkGpsEnabled();
        if (isEnabled) {
          console.log('✅ GPS activado automáticamente, cerrando alerta...');
          setGpsAlertVisible(false);
          // Limpiar el intervalo
          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }, 2000);
    }

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gpsAlertVisible]);

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
    assignedData,
    vehicleData,
    tripHistory,
    isLoadingAssigned,
    isLoadingHistory,
    gpsAlertVisible,

    // Setters
    setModalVisible,
    setAsunto,
    setDescription,

    // Handlers
    handleToggleTrayecto,
    handleClearSession,
    handleLogout,
    handleEnviarReporte,
    fetchAssignedData,
    fetchVehicleData,
    fetchTripHistory,
  };
};
