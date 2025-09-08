import React, { use, useEffect, useState } from "react";
import { Route, Trash2, Plus, X, Save } from "lucide-react";
import { useRouteEditor } from "../hooks/useRouteEditor";
import { IRoute, RouteWaypoint } from "../types/routeTypes";
import MapboxRouteEditor from "../components/mapbox/MapboxRouteEditor";
import { RouteType } from "../types/routeTypes";
import MapView from "./mapbox/MapVIew";
const RouteModal: React.FC<{
  onClose: () => void;
  onSave: (routeData: {
    route: IRoute;
    waypoints: RouteWaypoint[];
  }) => Promise<void>;
  editingRoute?: IRoute | null;
  editingWaypoints?: RouteWaypoint[];
}> = ({ onClose, onSave, editingRoute, editingWaypoints = [] }) => {
  const {
    route,
    waypoints,
    totalDistance,
    isValid,
    isLoading,
    errors,
    updateRoute,
    updateWaypoints,
    addWaypointByCoords,
    removeWaypoint,
    prepareRouteData,
    resetEditor,
    loadRouteData,
    setIsLoading,
  } = useRouteEditor(editingRoute as IRoute, editingWaypoints);

  const [isVisible, setIsVisible] = useState(false);
  const [routeFormData, setRouteFormData] = useState<RouteType>({
    number: "",
    description: "",
    active: true,
  });

  const handleChageFormData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "active") {
      setRouteFormData({
        ...routeFormData,
        active: !routeFormData.active,
      });
    } else {
      setRouteFormData({
        ...routeFormData,
        [id]: value,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, [setIsVisible]);
  
  useEffect(() => {
    if (editingRoute) {
      loadRouteData(editingRoute, editingWaypoints);
    } else if (!editingRoute) {
      resetEditor();
    }
  }, [editingRoute, editingWaypoints, loadRouteData, resetEditor]);

  const [coordsInput, setCoordsInput] = useState({ lat: "", lng: "" });

  const handleSave = async () => {
    const data = prepareRouteData();
    if (!data) return;

    setIsLoading(true);
    try {
      await onSave(data);
      onClose();
      resetEditor();
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

  const handleAddCoords = () => {
    const lat = parseFloat(coordsInput.lat);
    const lng = parseFloat(coordsInput.lng);

    if (!isNaN(lat) && !isNaN(lng)) {
      addWaypointByCoords(lat, lng);
      setCoordsInput({ lat: "", lng: "" });
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
                    type="text"
                    value={routeFormData.number || ""}
                    id="number"
                    onChange={handleChageFormData}
                    placeholder="Ej: R001, RUTA-CENTRO"
                    className="w-full px-3 py-2 border border-zinc-600 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    onChange={handleChageFormData}
                    placeholder="Descripción de la ruta..."
                    rows={3}
                    className="w-full px-3 py-2 border border-zinc-600 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={routeFormData.active}
                    onChange={handleChageFormData}
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
              {waypoints.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Puntos de la Ruta ({waypoints.length})
                  </h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {waypoints.map((wp, index) => (
                      <div
                        key={index}
                        className="bg-zinc-700 p-3 rounded-md flex justify-between items-center"
                      >
                        <div className="text-sm text-white">
                          <div className="font-medium">
                            Punto {wp.sequence_order}
                          </div>
                          <div className="text-zinc-400">
                            {wp.latitude.toFixed(6)}, {wp.longitude.toFixed(6)}
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
                      {waypoints.length}
                    </span>
                  </div>
                  <div>
                    Distancia:{" "}
                    <span className="font-medium text-white">
                      {totalDistance} km
                    </span>
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
                  <h4 className="text-sm font-medium text-red-300 mb-1">
                    Errores:
                  </h4>
                  <ul className="text-sm text-red-400 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instrucciones */}
              <div className="bg-blue-900 bg-opacity-50 border border-blue-600 rounded-md p-3">
                <h4 className="text-sm font-medium text-blue-300 mb-1">
                  Instrucciones:
                </h4>
                <ul className="text-sm text-blue-400 space-y-1">
                  <li>• Haz clic en el mapa para agregar puntos</li>
                  <li>• O ingresa coordenadas manualmente</li>
                  <li>• Se requieren mínimo 2 puntos</li>
                  <li>• Los puntos se conectarán automáticamente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mapa*/}
          <div className="lg:w-2/3 p-6">
            {/* <MapboxRouteEditor
              waypoints={waypoints}
              onWaypointsChange={updateWaypoints}
              isEditing={true}
              height="700px"
              isVisible={true}
            /> */}
            <MapView />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-zinc-700 bg-zinc-800">
          <div className="text-sm text-zinc-400">
            {waypoints.length > 0 && (
              <span>
                Ruta con {waypoints.length} puntos y {totalDistance} km
                aproximados
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
