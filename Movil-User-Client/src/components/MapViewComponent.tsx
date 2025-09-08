import { View } from 'react-native';
import Mapbox, { Camera, MapView, UserLocation } from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { MAPBOX_API_TOKEN } from '@Env';
import RouteMapComponent from './RouteMapComponent';

Mapbox.setAccessToken(MAPBOX_API_TOKEN);

export default function MapViewComponent() {
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
        styleURL={Mapbox.StyleURL.Dark}
        scaleBarEnabled={false}
        logoEnabled={false}
        onDidFinishLoadingStyle={() => setIsStyleLoaded(true)}
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
          color="#FF3B30"
          id="route2"
        />
        <RouteMapComponent
          waypoints={[
            { long: -75.28793698286553, lat: 2.962164221701405 },
            { long: -75.29768908410126, lat: 2.9548334287639695 },
            { long: -75.30199434256933, lat: 2.9503990887680422 },
          ]}
          color="#007AFF"
          id="route1"
        />
      </MapView>
    </View>
  );
}
