import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWZzYjExNCIsImEiOiJjbWI1bmN2OGYxanloMmlvbjd0dndtb3g5In0.2ON4hP04tvToiU_p_IsHbg'
);

const MapaConRuta = () => {
  // Lista de puntos: start, 2 waypoints, end
  const waypoints = [
    [-75.28546, 2.9629077], // inicio
    [-75.283, 2.95], // waypoint 1
    [-75.281, 2.94], // waypoint 2
    [-75.2813042, 2.934112], // fin
  ];

  const [route, setRoute] = useState(null);

  useEffect(() => {
    const getRoute = async () => {
      try {
        // Construimos la query con los puntos separados por ;
        const coords = waypoints.map((c) => c.join(',')).join(';');

        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=pk.eyJ1IjoiYWZzYjExNCIsImEiOiJjbWI1bmN2OGYxanloMmlvbjd0dndtb3g5In0.2ON4hP04tvToiU_p_IsHbg`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          setRoute(data.routes[0].geometry); // GeoJSON lineString
        }
      } catch (err) {
        console.error('Error cargando ruta:', err);
      }
    };

    getRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={13} centerCoordinate={waypoints[0]} />

        {/* Puntos */}
        {waypoints.map((coord, index) => (
          <MapboxGL.PointAnnotation
            key={`point-${index}`}
            id={`point-${index}`}
            coordinate={coord}
          />
        ))}

        {/* Ruta (si existe) */}
        {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route}>
            <MapboxGL.LineLayer
              id="routeLine"
              style={{
                lineColor: 'blue',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapaConRuta;
