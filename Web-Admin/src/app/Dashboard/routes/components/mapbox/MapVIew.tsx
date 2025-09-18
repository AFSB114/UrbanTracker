import { useState, useCallback, useRef, useEffect } from "react";
import Map, {
  Source,
  Layer,
  Marker,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type {  RouteWaypointType, ShowRouteType } from "../../types/routeTypes";
import type { MapMouseEvent } from "mapbox-gl";
import type { FeatureCollection } from "geojson";
import type { features } from "process";

export default function MapVIew() {
  const mapRef = useRef(null);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [waypointList, setWaypointList] = useState<RouteWaypointType[]>([]);
  const [route, setRoute] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [],
        },
        properties: {},
      },
    ],
  });

  const handleClickMap = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setWaypointList([
      ...waypointList,
      { sequence: waypointList.length, lng, lat },
    ]);
  };

  const getRoute = useCallback(async () => {
    try {
      await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${waypointList
          .map((wp: RouteWaypointType) => `${wp.lng},${wp.lat}`)
          .join(
            ";"
          )}?geometries=geojson&access_token=${accessToken}&overview=full`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.routes && data.routes.length > 0) {
            console.log("Route data:", data);
            setRoute({...route, ...route.features[0].geometry = data.routes[0].geometry});
          }
        });
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }, [waypointList, accessToken]);

  useEffect(() => {
    getRoute();
  }, [waypointList, getRoute]);

  // Estilos de capas
  const routeLayerStyle = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#3b82f6",
      "line-width": 6,
      "line-opacity": 0.8,
    },
  };

  if (!accessToken) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Error: Token de Mapbox no encontrado</h2>
        <p>Configura NEXT_PUBLIC_MAPBOX_TOKEN en tu .env.local</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: -75.2810060736973,
          latitude: 2.9342900126616227,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/afsb114/cmf7eaden003301s563d81iss"
        onLoad={getRoute}
        onClick={handleClickMap}
      >
        {route && (
          <Source id="route-source" type="geojson" data={route}>
            <Layer
              id="route"
              type="line"
              paint={routeLayerStyle.paint}
              layout={{ "line-join": "round", "line-cap": "round" }}
            />
          </Source>
        )}

        {waypointList.map((waypoint, index) => (
          <Marker
            key={index}
            longitude={waypoint.lng}
            latitude={waypoint.lat}
            anchor="bottom"
          >
            <div
              style={{
                backgroundColor: "blue",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "3px solid white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              {index + 1}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
