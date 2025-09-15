import { View } from 'react-native';
import Mapbox, { Camera, MapView, Style, UserLocation } from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { MAPBOX_API_TOKEN } from '@Env';
import RouteMapComponent from './RouteMapComponent';
import StyleDebugMapView from './StyleDebugMapVIew';
import MapboxWebView from './MapboxWebView';

Mapbox.setAccessToken(MAPBOX_API_TOKEN);

export default function MapViewComponent() {
  const mapRef = useRef(null);
  const camera = useRef<Camera>(null);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);

  useEffect(() => {
    if (isStyleLoaded) {
      camera.current?.setCamera({
        centerCoordinate: [-75.2810060736973, 2.9342900126616227],
        zoomLevel: 12,
        pitch: 0,
        heading: 0,
        animationDuration: 1000,
      });
    }
  }, [isStyleLoaded]);

  return (
    <View className="p- h-full w-full flex-1">
      <MapView
        style={{ flex: 1 }}
        styleURL="mapbox://styles/afsb114/cmf7eaden003301s563d81iss"
        scaleBarEnabled={false}
        logoEnabled={false}
        onDidFinishLoadingStyle={() => {
          console.log('Style loaded successfully');
          setIsStyleLoaded(true);
        }}
        onMapLoadingError={() => {
          console.error('Map failed to load:');
        }}
        onDidFinishLoadingMap={() => {
          console.log('Map finished loading');
        }}
        attributionEnabled={false}>
        <Camera ref={camera} />
        <UserLocation visible={true} androidRenderMode="normal" animated />
        <RouteMapComponent
          waypoints={[
            { long: -75.30182680642753, lat: 2.9482957098192437 },
            { long: -75.30204221003842, lat: 2.955442401621972 },
            { long: -75.29445521618774, lat: 2.9540560904185154 },
            { long: -75.287728987026, lat: 2.9622173305886417 },
          ]}
          color="red"
          id="route2"
        />
        <RouteMapComponent
          waypoints={[
            { long: -75.28793698286553, lat: 2.962164221701405 },
            { long: -75.29768908410126, lat: 2.9548334287639695 },
            { long: -75.30199434256933, lat: 2.9503990887680422 },
          ]}
          color="green"
          id="route1"
        />
      </MapView>
      {/* <StyleDebugMapView /> */}
      {/* <MapboxWebView
        ref={mapRef}
        accessToken={MAPBOX_API_TOKEN}
        style="https://api.mapbox.com/styles/v1/afsb114/cmf7eaden003301s563d81iss.html?title=copy&access_token=pk.eyJ1IjoiYWZzYjExNCIsImEiOiJjbWI1bmN2OGYxanloMmlvbjd0dndtb3g5In0.2ON4hP04tvToiU_p_IsHbg&zoomwheel=true&fresh=true#2/38/-34"
        center={[-75.2810060736973, 2.9342900126616227]}
        zoom={12}
      /> */}
    </View>
  );
}
