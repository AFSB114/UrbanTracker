import { useRef, useEffect } from "react";
import Map, { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePanelContext } from "components/panels/panel-context"

export default function MapView() {
  const { isPanelCollapsed } = usePanelContext()
  const mapRef = useRef<MapRef | null>(null);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [isPanelCollapsed]);

  return (
    <div className="relative w-full h-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: -75.2810060736973,
          latitude: 2.9342900126616227,
          zoom: 15,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={false}
      />
    </div>
  );
}
