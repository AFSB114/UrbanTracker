import { useState, useCallback, useRef, useEffect } from "react";
import Map, {
  Source,
  Layer,
  Marker,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapVIew() {
  const mapRef = useRef(null);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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
        mapStyle="mapbox://styles/mapbox/dark-v11">
      </Map>
    </div>
  );
}
