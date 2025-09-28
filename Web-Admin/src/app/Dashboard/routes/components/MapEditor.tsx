import React, { useEffect, useState } from "react";
import { Save, X, Trash2, MapPin, Edit, Eye } from "lucide-react";
import type { GeoJSON } from "geojson";
import { RouteWaypointRequest, MapEditorProps } from "../types/routeTypes";
import { useRouteMapEditor } from "../context/RouteMapEditorContext";
import { useRouteForm } from "../context/RouteFormContext";
import MapView from "./mapbox/MapVIew";

const MapEditor: React.FC<MapEditorProps> = ({
  mode,
  routeType,
  initialWaypoints = [],
  initialGeometry,
  onSave,
  onCancel,
}) => {
  const {
    waypointList,
    setWaypointList,
    removeWaypoint,
    routeGeometry,
    setRouteGeometry,
    routeGeometryReturn,
    setRouteGeometryReturn,
    routeDistance,
    routeDistanceReturn,
    displayMode,
    setDisplayMode,
    resetMapEditor,
  } = useRouteMapEditor();

  const { outboundRoute, returnRoute, saveOutboundRoute, saveReturnRoute } = useRouteForm();

  const [isLoading, setIsLoading] = useState(false);
  const [localWaypoints, setLocalWaypoints] = useState<RouteWaypointRequest[]>(initialWaypoints);
  const [localGeometry, setLocalGeometry] = useState<GeoJSON.Geometry | null>(initialGeometry || null);

  // Initialize with initial data
  useEffect(() => {
    if (initialWaypoints.length > 0 && waypointList.length === 0) {
      setWaypointList(initialWaypoints);
    }
    if (initialGeometry) {
      if (routeType === 'outbound') {
        setRouteGeometry(initialGeometry);
      } else {
        setRouteGeometryReturn(initialGeometry);
      }
    }

    // Set display mode based on routeType
    if (routeType === 'outbound') {
      setDisplayMode('OUTBOUND');
    } else if (routeType === 'return') {
      setDisplayMode('RETURN');
    } else if (routeType === 'both') {
      setDisplayMode('BOTH');
    } else {
      setDisplayMode('VIEW');
    }
  }, [initialWaypoints, initialGeometry, routeType, waypointList.length, setWaypointList, setRouteGeometry, setRouteGeometryReturn, setDisplayMode]);

  const handleSave = async () => {
    if (waypointList.length < 2) {
      alert('Se requieren al menos 2 puntos para guardar la ruta');
      return;
    }

    const geometry = routeType === 'outbound' ? routeGeometry : routeGeometryReturn;
    if (!geometry) {
      alert('No se pudo calcular la geometría de la ruta');
      return;
    }

    setIsLoading(true);
    try {
      // Save to form context
      if (routeType === 'outbound') {
        saveOutboundRoute(waypointList, geometry, routeDistance);
      } else {
        saveReturnRoute(waypointList, geometry, routeDistanceReturn);
      }

      // Call onSave callback if provided
      if (onSave) {
        onSave(waypointList, geometry);
      }
    } catch (error) {
      console.error('Error saving route:', error);
      alert('Error al guardar la ruta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    resetMapEditor();
    if (onCancel) {
      onCancel();
    }
  };

  const isValid = waypointList.length >= 2 && (routeType === 'outbound' ? routeGeometry : routeGeometryReturn);

  return (
    <div className="relative w-full h-full bg-zinc-800 rounded-lg overflow-hidden">
      {/* Header with controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              routeType === 'outbound'
                ? 'bg-green-900/50 text-green-300 border border-green-600'
              : routeType === 'return'
                ? 'bg-red-900/50 text-red-300 border border-red-600'
                : 'bg-orange-900/50 text-orange-300 border border-orange-600'
            }`}>
              <MapPin className="h-4 w-4" />
              {routeType === 'outbound' ? 'Ruta de Ida' : routeType === 'return' ? 'Ruta de Vuelta' : 'Ruta de Ambos'}
              {mode === 'view' ? <Eye className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </div>

            <div className="text-sm text-zinc-400">
              {waypointList.length} punto{waypointList.length !== 1 ? 's' : ''}
            </div>
          </div>

          {mode === 'edit' && (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-3 py-1 text-zinc-300 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!isValid || isLoading}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:bg-zinc-600 flex items-center gap-1"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar Ruta
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        {mode === 'edit' && (
          <div className="mt-3 bg-blue-900/30 border border-blue-600/50 rounded-md p-3">
            <div className="flex items-start gap-2">
              <div className="text-blue-400 mt-0.5">ℹ</div>
              <div className="text-sm text-blue-200">
                <div className="font-medium mb-1">Instrucciones:</div>
                <ul className="space-y-1 text-xs">
                  <li>• Haz clic en el mapa para agregar puntos</li>
                  <li>• Se requieren mínimo 2 puntos</li>
                  <li>• Puedes eliminar puntos haciendo clic en ellos</li>
                  <li>• Los puntos se conectarán automáticamente</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Waypoints list */}
      {waypointList.length > 0 && (
        <div className="absolute bottom-4 right-4 z-10 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-3 max-w-xs max-h-64 overflow-y-auto">
          {/* Outbound waypoints */}
          {(waypointList.filter(wp => !wp.destine || wp.destine === 'OUTBOUND').length > 0 && routeType === 'outbound') && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-green-300 mb-2">Puntos de Ida</h4>
              <div className="space-y-1">
                {waypointList
                  .filter(wp => !wp.destine || wp.destine === 'OUTBOUND')
                  .map((wp, index) => (
                    <div
                      key={`outbound-${index}`}
                      className="flex items-center justify-between bg-zinc-800 p-2 rounded text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-zinc-300">
                          Punto {wp.sequence}: {wp.latitude.toFixed(4)}, {wp.longitude.toFixed(4)}
                        </span>
                      </div>
                      {mode === 'edit' && (
                        <button
                          onClick={() => removeWaypoint(waypointList.indexOf(wp))}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Return waypoints */}
          {(waypointList.filter(wp => !wp.destine || wp.destine === 'RETURN').length > 0 && routeType === 'return') && (
            <div>
              <h4 className="text-sm font-medium text-red-300 mb-2">Puntos de Vuelta</h4>
              <div className="space-y-1">
                {waypointList
                  .filter(wp => !wp.destine || wp.destine === 'RETURN')
                  .map((wp, index) => (
                    <div
                      key={`return-${index}`}
                      className="flex items-center justify-between bg-zinc-800 p-2 rounded text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-zinc-300">
                          Punto {wp.sequence}: {wp.latitude.toFixed(4)}, {wp.longitude.toFixed(4)}
                        </span>
                      </div>
                      {mode === 'edit' && (
                        <button
                          onClick={() => removeWaypoint(waypointList.indexOf(wp))}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map */}
      <div className="w-full h-full">
        <MapView />
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isValid
            ? 'bg-green-900/90 text-green-300 border border-green-600'
            : 'bg-red-900/90 text-red-300 border border-red-600'
        }`}>
          {isValid ? 'Ruta válida' : 'Ruta incompleta'}
        </div>
      </div>
    </div>
  );
};

export default MapEditor;