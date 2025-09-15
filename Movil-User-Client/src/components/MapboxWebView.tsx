import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapboxWebView = ({ 
  accessToken, 
  style = 'mapbox://styles/mapbox/streets-v11',
  center = [-74.006, 40.7128], // NYC por defecto
  zoom = 10,
  markers = []
}) => {
  const webViewRef = useRef(null);

  // HTML con Mapbox GL JS
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Mapbox</title>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet">
        <style>
            body { margin: 0; padding: 0; }
            #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            mapboxgl.accessToken = '${accessToken}';
            
            const map = new mapboxgl.Map({
                container: 'map',
                style: '${style}',
                center: [${center[0]}, ${center[1]}],
                zoom: ${zoom}
            });

            // Agregar controles de navegación
            map.addControl(new mapboxgl.NavigationControl());

            // Función para agregar marcadores
            function addMarkers(markersData) {
                markersData.forEach(marker => {
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.style.backgroundColor = marker.color || '#3FB1CE';
                    el.style.width = '20px';
                    el.style.height = '20px';
                    el.style.borderRadius = '50%';
                    el.style.border = '2px solid white';
                    
                    new mapboxgl.Marker(el)
                        .setLngLat([marker.longitude, marker.latitude])
                        .setPopup(new mapboxgl.Popup({ offset: 25 })
                            .setHTML('<h3>' + marker.title + '</h3><p>' + marker.description + '</p>'))
                        .addTo(map);
                });
            }

            // Event listener para clicks en el mapa
            map.on('click', (e) => {
                const coordinates = e.lngLat;
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'mapClick',
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                }));
            });

            // Event listener para cuando el mapa está listo
            map.on('load', () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'mapLoaded'
                }));
                
                // Agregar marcadores iniciales si existen
                if (${JSON.stringify(markers)}.length > 0) {
                    addMarkers(${JSON.stringify(markers)});
                }
            });

            // Función para recibir comandos desde React Native
            window.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                
                switch(data.type) {
                    case 'addMarker':
                        addMarkers([data.marker]);
                        break;
                    case 'flyTo':
                        map.flyTo({
                            center: [data.longitude, data.latitude],
                            zoom: data.zoom || map.getZoom()
                        });
                        break;
                    case 'setStyle':
                        map.setStyle(data.style);
                        break;
                }
            });
        </script>
    </body>
    </html>
  `;

  // Manejar mensajes del WebView
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      switch(data.type) {
        case 'mapClick':
          if (onLocationSelect) {
            onLocationSelect({
              latitude: data.latitude,
              longitude: data.longitude
            });
          }
          break;
        case 'mapLoaded':
          console.log('Mapa cargado correctamente');
          break;
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  // Funciones para controlar el mapa desde React Native
  const addMarker = (marker) => {
    const message = JSON.stringify({
      type: 'addMarker',
      marker: marker
    });
    webViewRef.current?.postMessage(message);
  };

  const flyTo = (latitude, longitude, zoom) => {
    const message = JSON.stringify({
      type: 'flyTo',
      latitude,
      longitude,
      zoom
    });
    webViewRef.current?.postMessage(message);
  };

  const changeMapStyle = (newStyle) => {
    const message = JSON.stringify({
      type: 'setStyle',
      style: newStyle
    });
    webViewRef.current?.postMessage(message);
  };

  // Exponer métodos al componente padre
  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.addMarker = addMarker;
      webViewRef.current.flyTo = flyTo;
      webViewRef.current.changeMapStyle = changeMapStyle;
    }
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MapboxWebView;