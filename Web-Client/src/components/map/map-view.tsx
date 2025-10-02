
import React, { createContext, useContext, useEffect, useRef, useMemo } from "react";
import { usePanelCollapse } from "components/panels/panel-collapse-context";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, MapRef, Source } from "react-map-gl/mapbox";
import { useRoutePoints } from "./route-context";
import { useVehiclePositions } from "./vehicle-context";
import { VehicleMarker } from "./vehicle-marker";

// Contexto para exponer el ref del mapa
const MapboxRefContext = createContext<React.MutableRefObject<MapRef | null> | null>(null);
export function useMapboxRef() {
  const ctx = useContext(MapboxRefContext);
  if (!ctx) throw new Error("useMapboxRef debe usarse dentro de MapboxRefContext.Provider");
  return ctx;
}

const MapViewComponent = ({ children }: { children?: React.ReactNode }) => {
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

  // Memoizar los datos del mapa para evitar re-renderizados innecesarios
  const outboundSource = useMemo(() => {
    if (!outboundPoints || outboundPoints.length < 2) return null;
    return {
      id: "outbound-route",
      type: "geojson" as const,
      data: {
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: outboundPoints,
        },
      },
    };
  }, [outboundPoints]);

  const returnSource = useMemo(() => {
    if (!returnPoints || returnPoints.length < 2) return null;
    return {
      id: "return-route",
      type: "geojson" as const,
      data: {
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates: returnPoints,
        },
      },
    };
  }, [returnPoints]);

  const vehicleMarkers = useMemo(() => {
    if (!vehiclePositions) return [];
    return Array.from(vehiclePositions.values()).map((vehicle) => (
      <VehicleMarker key={vehicle.vehicleId} vehicle={vehicle} />
    ));
  }, [vehiclePositions]);

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
          mapStyle="mapbox://styles/afsb114/cmf7eaden003301s563d81iss"
          attributionControl={false}
        >
          {vehicleMarkers}
          {outboundSource && (
            <Source {...outboundSource}>
              <Layer
                id="outbound-route-layer"
                type="line"
                source="outbound-route"
                paint={{
                  "line-color": "#5BE201",
                  "line-width": 4,
                }}i
              />
            </Source>
          )}
          {returnSource && (
            <Source {...returnSource}>
              <Layer
                id="return-route-layer"
                type="line"
                source="return-route"
                paint={{
                  "line-color": "#FF0000",
                  "line-width": 4,
                }}
              />
            </Source>
          )}
        </Map>
        {children}
      </div>
    </MapboxRefContext.Provider>
  );
};

// Memoizar el componente para evitar re-renderizados innecesarios
const MapView = React.memo(MapViewComponent);
export default MapView;
