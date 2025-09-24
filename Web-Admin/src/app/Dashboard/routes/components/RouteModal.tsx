import React, { useEffect, useState, useCallback } from "react";
import { Trash2, X, Save } from "lucide-react";
import {RouteResponse,RouteWaypoint,type RouteWaypointRequest,type RouteWithWaypointsRequest,} from "../types/routeTypes";
import MapView from "./mapbox/MapVIew";
import {
  RouteEditorProvider,
  useRouteEditor,
} from "../context/RouteEditorContext";

const RouteModal: React.FC<{
  onClose: () => void;
  onSave: (routeData: {
    route: RouteResponse;
    waypoints: RouteWaypoint[];
  }) => Promise<void>;
  editingRoute?: RouteResponse | null;
  editingWaypoints?: RouteWaypoint[];
}> = (props) => {
  return (
    <RouteEditorProvider>
      <RouteModalContent {...props} />
    </RouteEditorProvider>
  );
};

const RouteModalContent: React.FC<{
  onClose: () => void;
  onSave: (routeData: {
    route: RouteResponse;
    waypoints: RouteWaypoint[];
  }) => Promise<void>;
  editingRoute?: RouteResponse | null;
  editingWaypoints?: RouteWaypoint[];
}> = ({ onClose, onSave, editingRoute, editingWaypoints = [] }) => {
  const DEST_OUTBOUND = "OUTBOUND" as const;
  const DEST_RETURN = "RETURN" as const;

  const {
    waypointList,
    setWaypointList,
    removeWaypoint,
    routeGeometry,
    isReturnMode,
    startReturn,
    finishReturn,
    routeGeometryReturn,
  } = useRouteEditor();
  const [isVisible, setIsVisible] = useState(false);
  const [routeFormData, setRouteFormData] = useState<RouteWithWaypointsRequest>(
    {
      number: "",
      description: "",
      totalDistance: 0,
      waypoints: waypointList,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  // coordsInput removed (unused)

  useEffect(() => {
    setRouteFormData((prev) => ({ ...prev, waypoints: waypointList }));
  }, [waypointList]);

  const handleChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setRouteFormData({
        ...routeFormData,
        [id]: checked,
      });
    } else {
      setRouteFormData({
        ...routeFormData,
        [id]: value,
      });
    }
  };

  // Requerimos que la vuelta haya sido registrada (routeGeometryReturn) antes de habilitar guardar
  const isValid =
    waypointList.length >= 2 &&
    routeFormData.number.trim() !== "" &&
    !!routeGeometryReturn;
  const errors: string[] = [];

  if (waypointList.length < 2) {
    errors.push("Se requieren al menos 2 puntos para la ruta");
  }
  if (!routeFormData.number.trim()) {
    errors.push("El número de ruta es obligatorio");
  }

  const prepareRouteData = () => {
    if (!isValid) return null;

    // Empezamos con los waypoints explícitos (los seleccionados por el usuario)
    const explicitWaypoints: RouteWaypoint[] = waypointList.map((wp) => ({
      id: undefined,
      active: true,
      routeId: editingRoute?.id || 0,
      sequence: wp.sequence,
      latitude: wp.latitude,
      longitude: wp.longitude,
    }));

    // Si existe una geometría (LineString) obtenida del servicio de rutas,
    // extraemos sus coordenadas y las convertimos en waypoints COMPLETO
    const geometryWaypoints: RouteWaypoint[] = [];
    try {
      if (routeGeometry && routeGeometry.type === "LineString") {
        const coords = (routeGeometry as GeoJSON.LineString).coordinates;
        // Las coordenadas vienen [lng, lat]
        coords.forEach((c, i) => {
          geometryWaypoints.push({
            id: undefined,
            active: true,
            routeId: editingRoute?.id || 0,
            sequence: explicitWaypoints.length + i + 1,
            latitude: c[1],
            longitude: c[0],
          });
        });
      }
      // Añadir geometría de vuelta si existe
      if (routeGeometryReturn && routeGeometryReturn.type === "LineString") {
        const coordsR = (routeGeometryReturn as GeoJSON.LineString).coordinates;
        coordsR.forEach((c, i) => {
          geometryWaypoints.push({
            id: undefined,
            active: true,
            routeId: editingRoute?.id || 0,
            sequence: explicitWaypoints.length + i + 1,
            latitude: c[1],
            longitude: c[0],
          });
        });
      }
    } catch (err) {
      console.warn("No se pudieron extraer coordenadas de la geometría:", err);
    }

    const routeWaypoints: RouteWaypoint[] = [
      ...explicitWaypoints,
      ...geometryWaypoints,
    ];

    // Construir el objeto request que espera el backend: waypoints con 'type'
    // Crear requestWaypoints incluyendo destination (OUTBOUND/RETURN)
    const requestWaypoints: RouteWaypointRequest[] = [
      ...waypointList.map((wp) => ({
        sequence: wp.sequence,
        latitude: wp.latitude,
        longitude: wp.longitude,
        type: "WAYPOINT",
        destination: (wp.destination as "OUTBOUND" | "RETURN") || DEST_OUTBOUND,
      })),
      ...(routeGeometry && routeGeometry.type === "LineString"
        ? (routeGeometry as GeoJSON.LineString).coordinates.map((c, i) => ({
            sequence: waypointList.length + i + 1,
            latitude: c[1],
            longitude: c[0],
            type: "GEOMETRY",
            destination: DEST_OUTBOUND,
          }))
        : []),
      ...(routeGeometryReturn && routeGeometryReturn.type === "LineString"
        ? (routeGeometryReturn as GeoJSON.LineString).coordinates.map(
            (c, i) => ({
              sequence:
                waypointList.length +
                (routeGeometry
                  ? (routeGeometry as GeoJSON.LineString).coordinates.length
                  : 0) +
                i +
                1,
              latitude: c[1],
              longitude: c[0],
              type: "GEOMETRY",
              destination: DEST_RETURN,
            })
          )
        : []),
    ];

    const route: RouteResponse = {
      id: editingRoute?.id,
      active: routeFormData.active || true,
      numberRoute: routeFormData.number,
      description: routeFormData.description || undefined,
      totalDistance: routeFormData.totalDistance,
      routeWaypoints,
    };

    const request: RouteWithWaypointsRequest = {
      number: routeFormData.number,
      description: routeFormData.description || undefined,
      totalDistance: routeFormData.totalDistance,
      waypoints: requestWaypoints,
      active: routeFormData.active || true,
    };

    return { route, waypoints: routeWaypoints, request };
  };

  const resetEditor = () => {
    setRouteFormData({
      number: "",
      description: "",
      totalDistance: 0,
      waypoints: [],
    });
    setWaypointList([]);
    // coords input cleared
  };

  const loadRouteData = useCallback(
    (route: RouteResponse, waypointsData: RouteWaypoint[]) => {
      const RouteWaypointRequest: RouteWaypointRequest[] = waypointsData.map(
        (wp) => ({
          destination: (wp.destination as "OUTBOUND" | "RETURN") || DEST_OUTBOUND,
          sequence: wp.sequence,
          latitude: wp.latitude,
          longitude: wp.longitude,
          type: "SELECTED",
        })
      );

      setRouteFormData({
        number: route.numberRoute,
        description: route.description || "",
        totalDistance: route.totalDistance,
        waypoints: RouteWaypointRequest,
      });

      setWaypointList(RouteWaypointRequest);
    },
    [setWaypointList]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (editingRoute) {
      loadRouteData(editingRoute, editingWaypoints);
    }
  }, [editingRoute, editingWaypoints, loadRouteData]);

  const handleSave = async () => {
    const data = prepareRouteData();
    if (!data) return;

    setIsLoading(true);
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Error al guardar ruta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      resetEditor();
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <div
      className={`fixed inset-0 transition-all duration-300 ease-out ${
        isVisible ? "bg-[rgba(0,0,0,0.8)]" : "bg-[rgba(0,0,0,0.0)]"
      }  flex items-center justify-center z-50 p-4`}
    >
      <div
        className={`bg-zinc-800 rounded-lg shadow-xl w-full max-w-7xl 
        max-h-[95vh] overflow-hidden transition-all duration-300 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-700">
          <h2 className="text-2xl font-bold text-white">
            {editingRoute ? "Editar Ruta" : "Nueva Ruta"}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-white hover:text-zinc-300 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(95vh-180px)]">
          {/* Formulario */}
          <div className="lg:w-1/3 p-6 border-r border-zinc-700 overflow-y-auto">
            <div className="space-y-6">
              {/* Instrucciones */}
              <div className="bg-blue-900 bg-opacity-50 border border-blue-600 rounded-md p-3">
                <h4 className="text-sm font-medium text-blue-100 mb-1">
                  Instrucciones:
                </h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Haz clic en el mapa para agregar puntos</li>
                  <li>• Se requieren mínimo 2 puntos</li>
                  <li>• Puedes colocar un maximo de 25 puntos</li>
                  <li>• Los puntos se conectarán automáticamente</li>
                </ul>
              </div>

              {/* Información básica */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Información de la Ruta
                </h3>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Número de Ruta *
                  </label>
                  <input
                    type="number"
                    value={routeFormData.number || ""}
                    id="number"
                    onChange={handleChangeFormData}
                    placeholder="Ej: 001, 092"
                    className="w-full px-3 py-2 border border-zinc-600 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [moz-appearance:textfield]"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    value={routeFormData.description || ""}
                    onChange={handleChangeFormData}
                    placeholder="Descripción de la ruta..."
                    rows={3}
                    className="w-full px-3 py-2 border border-zinc-600 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={routeFormData.active || false}
                    onChange={handleChangeFormData}
                    className="mr-3 h-4 w-4"
                  />
                  <label
                    htmlFor="active"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Ruta activa
                  </label>
                </div>
              </div>

              {/* Lista de waypoints */}
              {waypointList.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Puntos de la Ruta ({waypointList.length})
                  </h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {waypointList.map((wp, index) => (
                      <div
                        key={index}
                        className="bg-zinc-700 p-3 rounded-md flex justify-between items-center"
                      >
                        <div className="text-sm text-white">
                          <div className="font-medium">Punto {wp.sequence}</div>
                          <div className="text-zinc-400">
                            {wp.latitude}, {wp.longitude}
                          </div>
                        </div>
                        <button
                          onClick={() => removeWaypoint(index)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen de la ruta */}
              <div className="bg-zinc-700 p-4 rounded-md">
                <h3 className="text-sm font-medium text-zinc-300 mb-2">
                  Resumen
                </h3>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div>
                    Puntos:{" "}
                    <span className="font-medium text-white">
                      {waypointList.length}
                    </span>
                  </div>
                  <div>
                    Distancia:{" "}
                    <span className="font-medium text-white">
                      {routeFormData.totalDistance} km
                    </span>
                  </div>
                  <div>
                    Modo:{" "}
                    <span className="font-medium text-white">
                      {isReturnMode
                        ? "RETURN (capturando vuelta)"
                        : "OUTBOUND (capturando ida)"}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {!isReturnMode ? (
                      <button
                        onClick={() => startReturn()}
                        className="px-3 py-1 bg-yellow-600 text-white rounded"
                      >
                        Iniciar Vuelta
                      </button>
                    ) : (
                      <button
                        onClick={() => finishReturn()}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Finalizar Vuelta
                      </button>
                    )}
                  </div>
                  <div>
                    Estado:
                    <span
                      className={`font-medium ml-1 ${
                        isValid ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isValid ? "Válida" : "Incompleta"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Errores */}
              {errors.length > 0 && (
                <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-md p-3">
                  <h4 className="text-sm font-medium text-red-100 mb-1">
                    Errores:
                  </h4>
                  <ul className="text-sm text-red-200 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mapa*/}
          <div className="lg:w-2/3 p-6">
            <MapView />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-zinc-700 bg-zinc-800">
          <div className="text-sm text-zinc-400">
            {waypointList.length > 0 && (
              <span>
                Ruta con {waypointList.length} puntos y{" "}
                {routeFormData.totalDistance} km aproximados
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-zinc-300 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid || isLoading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:bg-zinc-400 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingRoute ? "Actualizar" : "Crear Ruta"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteModal;
