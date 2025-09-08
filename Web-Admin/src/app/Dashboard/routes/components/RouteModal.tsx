
import React, { useEffect, useState } from 'react';
import { Route, Trash2, Plus, X, Save } from 'lucide-react';
import { useRouteEditor } from '../hooks/useRouteEditor';
import { IRoute, RouteWaypoint } from '../types/routeTypes';
import MapboxRouteEditor from '../components/mapbox/MapboxRouteEditor';

const RouteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (routeData: { route: IRoute; waypoints: RouteWaypoint[] }) => Promise<void>;
  editingRoute?: IRoute | null;
  editingWaypoints?: RouteWaypoint[];
}> = ({ isOpen, onClose, onSave, editingRoute, editingWaypoints = [] }) => {
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
    setIsLoading
  } = useRouteEditor(editingRoute as IRoute, editingWaypoints);

  const [coordsInput, setCoordsInput] = useState({ lat: '', lng: '' });

  useEffect(() => {
    if (isOpen && editingRoute) {
      loadRouteData(editingRoute, editingWaypoints);
    } else if (isOpen && !editingRoute) {
      resetEditor();
    }
  }, [isOpen, editingRoute, editingWaypoints, loadRouteData, resetEditor]);

  const handleSave = async () => {
    const data = prepareRouteData();
    if (!data) return;

    setIsLoading(true);
    try {
      await onSave(data);
      onClose();
      resetEditor();
    } catch (error) {
      console.error('Error al guardar ruta:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      resetEditor();
    }
  };

  const handleAddCoords = () => {
    const lat = parseFloat(coordsInput.lat);
    const lng = parseFloat(coordsInput.lng);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      addWaypointByCoords(lat, lng);
      setCoordsInput({ lat: '', lng: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {editingRoute ? 'Editar Ruta' : 'Nueva Ruta'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-white hover:text-gray-300 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(95vh-180px)]">
          {/* Formulario */}
          <div className="lg:w-1/3 p-6 border-r border-gray-700 overflow-y-auto">
            <div className="space-y-6">
              {/* Información básica */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Información de la Ruta</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Ruta *
                  </label>
                  <input
                    type="text"
                    value={route.route_number || ''}
                    onChange={(e) => updateRoute({ route_number: e.target.value })}
                    placeholder="Ej: R001, RUTA-CENTRO"
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={20}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={route.description || ''}
                    onChange={(e) => updateRoute({ description: e.target.value })}
                    placeholder="Descripción de la ruta..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={route.active !== false}
                    onChange={(e) => updateRoute({ active: e.target.checked })}
                    className="mr-3 h-4 w-4"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-300">
                    Ruta activa
                  </label>
                </div>
              </div>

              {/* Agregar waypoint por coordenadas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Agregar Punto por Coordenadas</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="any"
                    value={coordsInput.lat}
                    onChange={(e) => setCoordsInput(prev => ({ ...prev, lat: e.target.value }))}
                    placeholder="Latitud"
                    className="px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    step="any"
                    value={coordsInput.lng}
                    onChange={(e) => setCoordsInput(prev => ({ ...prev, lng: e.target.value }))}
                    placeholder="Longitud"
                    className="px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleAddCoords}
                  disabled={!coordsInput.lat || !coordsInput.lng}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Agregar Punto
                </button>
              </div>

              {/* Lista de waypoints */}
              {waypoints.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Puntos de la Ruta ({waypoints.length})</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {waypoints.map((wp, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                        <div className="text-sm text-white">
                          <div className="font-medium">Punto {wp.sequence_order}</div>
                          <div className="text-gray-400">
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
              <div className="bg-gray-700 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Resumen</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>Puntos: <span className="font-medium text-white">{waypoints.length}</span></div>
                  <div>Distancia: <span className="font-medium text-white">{totalDistance} km</span></div>
                  <div>Estado: 
                    <span className={`font-medium ml-1 ${isValid ? 'text-green-400' : 'text-red-400'}`}>
                      {isValid ? 'Válida' : 'Incompleta'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Errores */}
              {errors.length > 0 && (
                <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-md p-3">
                  <h4 className="text-sm font-medium text-red-300 mb-1">Errores:</h4>
                  <ul className="text-sm text-red-400 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instrucciones */}
              <div className="bg-blue-900 bg-opacity-50 border border-blue-600 rounded-md p-3">
                <h4 className="text-sm font-medium text-blue-300 mb-1">Instrucciones:</h4>
                <ul className="text-sm text-blue-400 space-y-1">
                  <li>• Haz clic en el mapa para agregar puntos</li>
                  <li>• O ingresa coordenadas manualmente</li>
                  <li>• Se requieren mínimo 2 puntos</li>
                  <li>• Los puntos se conectarán automáticamente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mapa - Aquí usas tu FixedMapboxRouteEditor */}
          <div className="lg:w-2/3 p-6">
            <MapboxRouteEditor
              waypoints={waypoints}
              onWaypointsChange={updateWaypoints}
              isEditing={true}
              height="500px"
              isVisible={true}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-700 bg-gray-800">
          <div className="text-sm text-gray-400">
            {waypoints.length > 0 && (
              <span>Ruta con {waypoints.length} puntos y {totalDistance} km aproximados</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!isValid || isLoading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:bg-gray-400 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingRoute ? 'Actualizar' : 'Crear Ruta'}
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