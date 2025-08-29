import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { useMQTT, LocationData } from '../hooks/useMQTT';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWZzYjExNCIsImEiOiJjbWI1bmN2OGYxanloMmlvbjd0dndtb3g5In0.2ON4hP04tvToiU_p_IsHbg'
);

// Configuración del broker MQTT
const MQTT_CONFIG = {
  broker: 'localhost', // Cambia esto por la IP/URL de tu broker MQTT
  port: 9001, // Puerto WebSocket del broker (normalmente 9001 para WebSocket)
  topic: 'user/123/topic',
  username: undefined, // Opcional
  password: undefined, // Opcional
};

const MapBoxMQTT = () => {
  const { isConnected, lastLocation, error } = useMQTT(MQTT_CONFIG);
  const [cameraCenter, setCameraCenter] = useState<[number, number]>([-75.28546, 2.9629077]);
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([]);
  const mapRef = useRef<MapboxGL.MapView>(null);

  // Efecto para actualizar la cámara cuando llega una nueva ubicación
  useEffect(() => {
    if (lastLocation) {
      const newCoordinate: [number, number] = [lastLocation.lon, lastLocation.lat];
      setCameraCenter(newCoordinate);
      
      // Añadir a historial (mantener últimas 50 ubicaciones)
      setLocationHistory(prev => {
        const newHistory = [...prev, lastLocation];
        return newHistory.slice(-50);
      });

      // Opcional: Mostrar alerta con nueva ubicación recibida
      console.log(`Nueva ubicación: ${lastLocation.lat}, ${lastLocation.lon} at ${new Date(lastLocation.timestamp)}`);
    }
  }, [lastLocation]);

  // Efecto para manejar errores
  useEffect(() => {
    if (error) {
      Alert.alert('Error MQTT', error);
    }
  }, [error]);

  // Crear GeoJSON para mostrar el trail de ubicaciones
  const createLocationTrail = () => {
    if (locationHistory.length < 2) return null;

    const coordinates = locationHistory.map(loc => [loc.lon, loc.lat]);
    
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };
  };

  const locationTrail = createLocationTrail();

  return (
    <View style={styles.container}>
      {/* Header con información de estado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Estado MQTT: {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
        </Text>
        {lastLocation && (
          <Text style={styles.locationText}>
            Última ubicación: {lastLocation.lat.toFixed(6)}, {lastLocation.lon.toFixed(6)}
          </Text>
        )}
        {error && (
          <Text style={styles.errorText}>Error: {error}</Text>
        )}
      </View>

      {/* Mapa */}
      <MapboxGL.MapView ref={mapRef} style={styles.map}>
        {/* Cámara que sigue la ubicación actual */}
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={cameraCenter}
          animationDuration={1000}
          followUserLocation={false}
        />

        {/* Marcador de ubicación actual */}
        {lastLocation && (
          <MapboxGL.PointAnnotation
            id="current-location"
            coordinate={[lastLocation.lon, lastLocation.lat]}
          >
            <View style={styles.currentLocationMarker}>
              <View style={styles.currentLocationDot} />
            </View>
          </MapboxGL.PointAnnotation>
        )}

        {/* Trail de ubicaciones anteriores */}
        {locationTrail && (
          <MapboxGL.ShapeSource id="location-trail" shape={locationTrail}>
            <MapboxGL.LineLayer
              id="trail-line"
              style={{
                lineColor: '#007AFF',
                lineWidth: 3,
                lineOpacity: 0.7,
              }}
            />
          </MapboxGL.ShapeSource>
        )}

        {/* Marcadores para ubicaciones históricas */}
        {locationHistory.slice(-10).map((location, index) => (
          <MapboxGL.PointAnnotation
            key={`history-${location.timestamp}-${index}`}
            id={`history-${location.timestamp}-${index}`}
            coordinate={[location.lon, location.lat]}
          >
            <View style={styles.historyMarker}>
              <Text style={styles.historyMarkerText}>{index + 1}</Text>
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 1000,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  map: {
    flex: 1,
  },
  currentLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  currentLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  historyMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyMarkerText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default MapBoxMQTT;
