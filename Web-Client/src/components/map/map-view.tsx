
import { useRef, useEffect, createContext, useContext } from "react";
import Map, { MapRef, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePanelCollapse } from "components/panels/panel-collapse-context";
import { VehicleMarker } from "./vehicle-marker";
import { useVehiclePositions } from "./vehicle-context";
import { useRoutePoints } from "./route-context";

// Contexto para exponer el ref del mapa
const MapboxRefContext = createContext<React.MutableRefObject<MapRef | null> | null>(null);
export function useMapboxRef() {
  const ctx = useContext(MapboxRefContext);
  if (!ctx) throw new Error("useMapboxRef debe usarse dentro de MapboxRefContext.Provider");
  return ctx;
}

export default function MapView({ children }: { children?: React.ReactNode }) {
  const { isPanelCollapsed } = usePanelCollapse();
  const { vehiclePositions } = useVehiclePositions();
  const { outboundPoints, returnPoints } = useRoutePoints();
  const mapRef = useRef<MapRef | null>(null);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [isPanelCollapsed]);

  return (
    <MapboxRefContext.Provider value={mapRef}>
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
        >
          {vehiclePositions && Array.from(vehiclePositions.values()).map(vehicle => (
            <VehicleMarker key={vehicle.vehicleId} vehicle={vehicle} />
          ))}
          {outboundPoints && outboundPoints.length > 1 && (
            <Source
              id="outbound-route"
              type="geojson"
              data={{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: outboundPoints
                }
              }}
            >
              <Layer
                id="outbound-route-layer"
                type="line"
                source="outbound-route"
                paint={{
                  'line-color': '#10b981',
                  'line-width': 4
                }}
              />
            </Source>
          )}
          {returnPoints && returnPoints.length > 1 && (
            <Source
              id="return-route"
              type="geojson"
              data={{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: returnPoints
                }
              }}
            >
              <Layer
                id="return-route-layer"
                type="line"
                source="return-route"
                paint={{
                  'line-color': '#ef4444',
                  'line-width': 4
                }}
              />
            </Source>
          )}
        </Map>
        {children}
      </div>
    </MapboxRefContext.Provider>
  );
}
