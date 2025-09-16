import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Mapbox, { Camera, MapView, UserLocation } from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { MAPBOX_API_TOKEN } from '@Env';

// Componente para probar diferentes estilos y diagnosticar problemas
export default function StyleDebugMapView() {
  const camera = useRef<Camera>(null);
  const [currentStyle, setCurrentStyle] = useState(0);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  const mapStyles = [
    {
      name: 'Mi Estilo Personalizado',
      url: 'mapbox://styles/afsb114/cmf7eaden003301s563d81iss',
    },
    {
      name: 'Streets v12',
      url: 'mapbox://styles/mapbox/streets-v12',
    },
    {
      name: 'Satellite',
      url: 'mapbox://styles/mapbox/satellite-v9',
    },
    {
      name: 'Dark',
      url: 'mapbox://styles/mapbox/dark-v11',
    },
  ];

  const switchStyle = () => {
    const nextStyle = (currentStyle + 1) % mapStyles.length;
    setCurrentStyle(nextStyle);
    setIsStyleLoaded(false);
    setLoadingError(null);
  };

  const testTokenAccess = async () => {
    try {
      // Verificar que el token tenga acceso
      const response = await fetch(
        `https://api.mapbox.com/styles/v1/afsb114/cmf7eaden003301s563d81iss?access_token=${MAPBOX_API_TOKEN}`
      );

      if (response.ok) {
        const styleData = await response.json();
        Alert.alert(
          'Token válido',
          `Estilo encontrado: ${styleData.name || 'Sin nombre'}\nID: ${styleData.id}`
        );
      } else {
        Alert.alert(
          'Error de acceso',
          `HTTP ${response.status}: ${response.statusText}\n\nVerifica que tu token tenga permisos para este estilo.`
        );
      }
    } catch (error) {
      Alert.alert('Error de red', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Controles de debug */}
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: 15,
          borderRadius: 10,
          elevation: 5,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Debug de Estilos de Mapa</Text>

        <Text style={{ marginBottom: 5 }}>Estilo actual: {mapStyles[currentStyle].name}</Text>

        <Text style={{ marginBottom: 10, fontSize: 12, color: 'gray' }}>
          {mapStyles[currentStyle].url}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={switchStyle}
            style={{
              backgroundColor: '#007AFF',
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginRight: 5,
            }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Cambiar Estilo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testTokenAccess}
            style={{
              backgroundColor: '#34C759',
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginLeft: 5,
            }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Test Token</Text>
          </TouchableOpacity>
        </View>

        {/* Estado del mapa */}
        <View style={{ marginTop: 10, padding: 5, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
          <Text style={{ fontSize: 12 }}>
            Estado: {isStyleLoaded ? '✅ Cargado' : '⏳ Cargando...'}
          </Text>
          {loadingError && (
            <Text style={{ fontSize: 12, color: 'red', marginTop: 5 }}>Error: {loadingError}</Text>
          )}
        </View>
      </View>

      {/* Mapa */}
      <MapView
        style={{ flex: 1 }}
        styleURL={mapStyles[currentStyle].url}
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        onDidFinishLoadingStyle={() => {
          console.log('✅ Estilo cargado:', mapStyles[currentStyle].name);
          setIsStyleLoaded(true);
          setLoadingError("");
        }}
        onMapLoadingError={() => {
          console.error('❌ Error cargando mapa:' );
          setLoadingError("Error desconocido");
          setIsStyleLoaded(false);
        }}
        onDidFinishLoadingMap={() => {
          console.log('✅ Mapa terminó de cargar');
        }}>
        <Camera
          ref={camera}
          centerCoordinate={[-75.2810060736973, 2.9342900126616227]}
          zoomLevel={12}
        />

        <UserLocation visible={true} androidRenderMode="normal" animated />
      </MapView>
    </View>
  );
}
