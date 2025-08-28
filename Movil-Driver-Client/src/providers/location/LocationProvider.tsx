import { useEffect, useMemo, useState } from "react";
import { Alert, Linking, Platform } from 'react-native';
import LocationContext from "../context/LocationContext";
import type { LocationPermissionStatus } from "../types";
import * as ExpoLocation from 'expo-location';
import { PermissionsAndroid } from 'react-native';

// Define a location interface compatible with existing code
interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export default function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<LocationPermissionStatus>('prompt');
  const [isTracking, setIsTracking] = useState<boolean>(false);

  // Convert Expo location to our format
  const convertToLocation = (expoLocation: ExpoLocation.LocationObject): Location => ({
    latitude: expoLocation.coords.latitude,
    longitude: expoLocation.coords.longitude,
    accuracy: expoLocation.coords.accuracy || 0,
    timestamp: expoLocation.timestamp,
  });

  // Check current permission status
  const checkPermissionStatus = async (): Promise<LocationPermissionStatus> => {
    try {
      const { status } = await ExpoLocation.getForegroundPermissionsAsync();
      
      switch (status) {
        case ExpoLocation.PermissionStatus.GRANTED:
          return 'granted';
        case ExpoLocation.PermissionStatus.DENIED:
          return 'denied';
        default:
          return 'prompt';
      }
    } catch (error) {
      console.error('❌ Error checking permission status:', error);
      return 'denied';
    }
  };

  // Show alert for settings redirect when permission is permanently denied
  const showPermissionDeniedAlert = () => {
    Alert.alert(
      "Permisos de Ubicación Requeridos",
      "Para usar esta función, necesitas habilitar los permisos de ubicación en la configuración de tu dispositivo.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Abrir Configuración",
          onPress: () => {
            if (Platform.OS === 'android') {
              Linking.openSettings();
            } else {
              Linking.openURL('app-settings:');
            }
          }
        }
      ]
    );
  };

  // Enhanced permission request with proper handling of denied permissions
  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      console.log('🔍 Verificando estado actual de permisos...');
      
      // First check current status
      const currentStatus = await checkPermissionStatus();
      console.log('📊 Estado actual de permisos:', currentStatus);
      
      if (currentStatus === 'granted') {
        setPermissionStatus('granted');
        return true;
      }

      // If already denied, check if we can request again
      if (currentStatus === 'denied') {
        // For Android, check if we can show rationale
        if (Platform.OS === 'android') {
          const canShowRationale = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          
          if (!canShowRationale) {
            console.log('❌ Permisos permanentemente denegados (never_ask_again)');
            setPermissionStatus('denied');
            showPermissionDeniedAlert();
            return false;
          }
        }
      }

      console.log('🔍 Solicitando permisos de ubicación...');
      
      // Request permission
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      
      if (status === ExpoLocation.PermissionStatus.GRANTED) {
        console.log('✅ Permisos de ubicación concedidos');
        setPermissionStatus('granted');
        return true;
      } else {
        console.log('❌ Permisos de ubicación denegados:', status);
        setPermissionStatus('denied');
        
        // If denied, show alert to go to settings
        if (status === ExpoLocation.PermissionStatus.DENIED) {
          showPermissionDeniedAlert();
        }
        
        return false;
      }
    } catch (error) {
      console.error('❌ Error solicitando permisos:', error);
      setPermissionStatus('denied');
      return false;
    }
  };

  // Main function to request location
  const requestLocation = async () => {
    try {
      // First ensure we have permission
      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        return;
      }
      
      console.log('📍 Obteniendo ubicación actual...');
      
      // Get current location
      const expoLocation = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 5,
      });
      
      const newLocation = convertToLocation(expoLocation);
      console.log('✅ Ubicación obtenida:', {
        lat: newLocation.latitude,
        lon: newLocation.longitude,
        accuracy: newLocation.accuracy
      });
      
      setLocation(newLocation);
      
    } catch (error) {
      console.error('❌ Error obteniendo ubicación:', error);
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message.includes('Location request failed due to unsatisfied device settings')) {
          Alert.alert(
            "GPS Desactivado",
            "Por favor activa el GPS en tu dispositivo para obtener tu ubicación.",
            [
              { text: "OK" }
            ]
          );
        } else if (error.message.includes('Location services are disabled')) {
          Alert.alert(
            "Servicios de Ubicación Desactivados",
            "Los servicios de ubicación están desactivados. Por favor actívalos en la configuración de tu dispositivo.",
            [
              { text: "OK" }
            ]
          );
        }
      }
    }
  };

  // Watch position for automatic tracking
  useEffect(() => {
    let subscription: ExpoLocation.LocationSubscription | null = null;

    const startLocationTracking = async () => {
      if (isTracking && permissionStatus === 'granted') {
        try {
          console.log('🔄 Iniciando tracking de ubicación...');
          
          subscription = await ExpoLocation.watchPositionAsync(
            {
              accuracy: ExpoLocation.Accuracy.High,
              timeInterval: 1000, // 1 seconds
              distanceInterval: 1, // 1 meters
            },
            (expoLocation) => {
              const newLocation = convertToLocation(expoLocation);
              console.log('🔄 Ubicación actualizada:', {
                lat: newLocation.latitude,
                lon: newLocation.longitude,
                accuracy: newLocation.accuracy
              });
              setLocation(newLocation);
            }
          );
        } catch (error) {
          console.error('❌ Error iniciando tracking:', error);
        }
      }
    };

    startLocationTracking();

    // Cleanup function
    return () => {
      if (subscription) {
        console.log('⏹️ Deteniendo tracking de ubicación...');
        subscription.remove();
      }
    };
  }, [isTracking, permissionStatus]);

  // Check permission status on mount
  useEffect(() => {
    checkPermissionStatus().then(setPermissionStatus);
  }, []);

  // Function to toggle tracking
  const toggleTracking = () => {
    setIsTracking((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      location,
      permissionStatus,
      isTracking,
      requestLocation,
      toggleTracking,
    }),
    [location, permissionStatus, isTracking]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
