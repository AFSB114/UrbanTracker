import { useState, useCallback, useRef, useEffect } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl/mapbox";
import type { RouteWaypointRequest } from "../../types/routeTypes";
import type { MapMouseEvent } from "mapbox-gl";
import type { FeatureCollection } from "geojson";
import { useRouteMapEditor } from "../../context/RouteMapEditorContext";

export default function MapView() {
  const {
    waypointList,
    addWaypoint,
    setRouteGeometry,
    setRouteGeometryReturn,
    setRouteDistance,
    setRouteDistanceReturn,
    displayMode,
  } = useRouteMapEditor();
  const mapRef = useRef(null);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const [route, setRoute] = useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
        properties: {},
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
        properties: {},
      },
    ],
  });

  const handleClickMap = (e: MapMouseEvent) => {
    if (displayMode == "BOTH" || displayMode == "VIEW") return;
    const { lng, lat } = e.lngLat;
    addWaypoint(lat, lng);
  };

  const getRoute = useCallback(async () => {
    try {
      if (!waypointList || waypointList.length < 2) {
        setRoute({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "LineString", coordinates: [] },
              properties: {},
            },
            {
              type: "Feature",
              geometry: { type: "LineString", coordinates: [] },
              properties: {},
            },
          ],
        });
        setRouteGeometry(null);
        setRouteGeometryReturn(null);
        return;
      }

      // Separar puntos por destine: OUTBOUND vs RETURN
      const outbound = waypointList.filter(
        (w) => !w.destine || w.destine === "OUTBOUND"
      );
      const ret = waypointList.filter((w) => w.destine === "RETURN");

      const fetchRouteFor = async (points: RouteWaypointRequest[]) => {
        if (!points || points.length < 2) return null;
        const coords = points
          .map((wp) => `${wp.longitude},${wp.latitude}`)
          .join(";");
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${accessToken}&overview=full`
        );
        const data = await res.json();
        console.log("Mapbox Directions API response:", data);
        if (data.routes && data.routes.length > 0) return data.routes[0];
        return null;
      };

      const outboundRoute = await fetchRouteFor(outbound);
      const returnRoute = await fetchRouteFor(ret);

      const features: GeoJSON.Feature[] = [
        {
          type: "Feature",
          geometry: outboundRoute
            ? (outboundRoute.geometry as GeoJSON.Geometry)
            : { type: "LineString", coordinates: [] },
          properties: {},
        },
        {
          type: "Feature",
          geometry: returnRoute
            ? (returnRoute.geometry as GeoJSON.Geometry)
            : { type: "LineString", coordinates: [] },
          properties: {},
        },
      ];

      setRoute({ type: "FeatureCollection", features });

      if (outboundRoute) {
        setRouteGeometry(JSON.parse(JSON.stringify(outboundRoute.geometry)) as GeoJSON.Geometry);
        // Convertir distancia de metros a kilómetros y redondear a 2 decimales
        const outboundDistanceKm =
          Math.round((outboundRoute.distance / 1000) * 100) / 100;
        setRouteDistance(outboundDistanceKm);
      } else {
        setRouteGeometry(null);
        setRouteDistance(0);
      }

      if (returnRoute) {
        setRouteGeometryReturn(JSON.parse(JSON.stringify(returnRoute.geometry)) as GeoJSON.Geometry);
        // Convertir distancia de metros a kilómetros y redondear a 2 decimales
        const returnDistanceKm =
          Math.round((returnRoute.distance / 1000) * 100) / 100;
        setRouteDistanceReturn(returnDistanceKm);
      } else {
        setRouteGeometryReturn(null);
        setRouteDistanceReturn(0);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }, [
    waypointList,
    accessToken,
    setRouteGeometry,
    setRouteGeometryReturn,
    setRouteDistance,
    setRouteDistanceReturn,
  ]);

  useEffect(() => {
    getRoute();
  }, [waypointList, getRoute]);

  // Comprueba si una geometría GeoJSON tiene un campo 'coordinates' con elementos
  const geometryHasCoordinates = (
    geometry: GeoJSON.Geometry | undefined | null
  ): geometry is
    | GeoJSON.LineString
    | GeoJSON.MultiLineString
    | GeoJSON.Polygon
    | GeoJSON.MultiPolygon
    | GeoJSON.MultiPoint
    | GeoJSON.Point => {
    if (!geometry) return false;
    const maybeCoords = (geometry as unknown as { coordinates?: unknown })
      .coordinates;
    return Array.isArray(maybeCoords) && maybeCoords.length > 0;
  };

  // Estilos de capas
  const routeLayerStyle = {
    id: "route",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "green",
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
          zoom: 12.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/afsb114/cmf7eaden003301s563d81iss"
        onLoad={getRoute}
        onClick={handleClickMap}
      >
        {/* Mostrar outbound (ida) si displayMode permite */}
        {(displayMode === "OUTBOUND" || displayMode === "BOTH") &&
          route &&
          route.features &&
          route.features[0] &&
          geometryHasCoordinates(route.features[0].geometry) && (
            <Source
              id="route-source-outbound"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: [route.features[0]],
              }}
            >
              <Layer
                id="route-outbound"
                type="line"
                paint={{ ...routeLayerStyle.paint, "line-color": "#22CA0A" }}
                layout={{ "line-join": "round", "line-cap": "round" }}
              />
            </Source>
          )}

        {/* Mostrar return (vuelta) si displayMode permite */}
        {(displayMode === "RETURN" || displayMode === "BOTH") &&
          route &&
          route.features &&
          route.features[1] &&
          geometryHasCoordinates(route.features[1].geometry) && (
            <Source
              id="route-source-return"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: [route.features[1]],
              }}
            >
              <Layer
                id="route-return"
                type="line"
                paint={{ ...routeLayerStyle.paint, "line-color": "#E60305" }}
                layout={{ "line-join": "round", "line-cap": "round" }}
              />
            </Source>
          )}

        {waypointList
          .filter((wp) => {
            if (displayMode === "OUTBOUND")
              return !wp.destine || wp.destine === "OUTBOUND";
            if (displayMode === "RETURN") return wp.destine === "RETURN";
            if (displayMode === "BOTH") return false; // No mostrar markers en vista BOTH
            return true;
          })
          .map((waypoint, idx) => (
            <Marker
              key={idx}
              longitude={waypoint.longitude}
              latitude={waypoint.latitude}
              anchor="bottom"
            >
              <div
                style={{
                  backgroundColor:
                    waypoint.destine === "RETURN" ? "red" : "blue",
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
                {waypoint.sequence}
              </div>
            </Marker>
          ))}
      </Map>
    </div>
  );
}
