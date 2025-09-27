import React, { useState, useEffect } from 'react';
import { Save, Upload, MapPin, Eye, Edit } from 'lucide-react';
import { RouteFormProvider, useRouteForm } from '../context/RouteFormContext';
import { RouteMapEditorProvider } from '../context/RouteMapEditorContext';
import { CompleteRouteData, RouteResponse } from '../types/routeTypes';
import MapEditor from './MapEditor';
import { useRouteService } from '../services/RouteServices';
import { get } from 'http';

interface RouteFormManagerProps {
  onSave: (data: CompleteRouteData) => Promise<void>;
  editingRoute?: RouteResponse | null;
  mode?: 'create' | 'edit' | 'view';
  id?: string;
}

const RouteFormManagerContent: React.FC<RouteFormManagerProps> = ({
  onSave,
  editingRoute,
  mode = 'create',
  id = ''
}) => {
  const {
    formData,
    outboundRoute,
    returnRoute,
    currentView,
    updateFormData,
    setCurrentView,
    resetForm,
    getCompleteRouteData,
    setInitialData,
  } = useRouteForm();

  const {getRouteById} = useRouteService();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => { 
    if (id) {
      getRouteById(parseInt(id), 'WAYPOINT').then((res) => {
        if (res.data) {
          setInitialData(res.data);
        }
      });
    }
  }, [id]);


  useEffect(() => {
    if (editingRoute && mode === 'edit') {
      // Load editing data
      updateFormData('numberRoute', editingRoute.numberRoute);
      updateFormData('description', editingRoute.description || '');
      // TODO: Load waypoints and geometries from editingRoute
    }
  }, [editingRoute, mode, updateFormData]);

  const handleFileChange = (field: 'outboundImage' | 'returnImage', file: File | null) => {
    updateFormData(field, file);
  };

  const handleSave = async () => {
    const completeData = getCompleteRouteData();
    if (!completeData) {
      setErrors(['Complete todos los campos requeridos y ambas rutas']);
      return;
    }

    console.log(completeData.totalDistance)

    setIsLoading(true);
    setErrors([]);
    try {
      await onSave(completeData);
      if (mode === 'create') {
        resetForm();
      }
    } catch (error) {
      console.error('Error saving route:', error);
      setErrors(['Error al guardar la ruta']);
    } finally {
      setIsLoading(false);
    }
  };

  const getRouteStatus = (route: typeof outboundRoute, label: string) => {
    if (route.waypoints.length === 0) return { status: 'empty', text: `${label}: No definida` };
    if (route.waypoints.length >= 2 && route.geometry) return { status: 'complete', text: `${label}: Completa` };
    return { status: 'incomplete', text: `${label}: Incompleta` };
  };

  const outboundStatus = getRouteStatus(outboundRoute, 'Ida');
  const returnStatus = getRouteStatus(returnRoute, 'Vuelta');

  const isFormValid = formData.numberRoute.trim() !== '' &&
                     outboundRoute.waypoints.length >= 2 &&
                     returnRoute.waypoints.length >= 2 &&
                     outboundRoute.geometry &&
                     returnRoute.geometry;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-zinc-900 text-white rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {mode === 'create' ? 'Nueva Ruta' : mode === 'edit' ? 'Editar Ruta' : 'Ver Ruta'}
        </h1>
        <p className="text-zinc-400">
          {mode === 'view' ? 'Vista de la ruta' : 'Complete el formulario y defina las rutas en el mapa'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información Básica</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Número de Ruta *
                </label>
                <input
                  type="text"
                  value={formData.numberRoute}
                  onChange={(e) => updateFormData('numberRoute', e.target.value)}
                  placeholder="Ej: 001, 092"
                  className="w-full px-3 py-2 border border-zinc-600 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Descripción de la ruta..."
                  rows={3}
                  className="w-full px-3 py-2 border border-zinc-600 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Imágenes de Referencia</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Imagen de Ida
                </label>
                <div className="border-2 border-dashed border-zinc-600 rounded-lg p-4 text-center">
                  {formData.outboundImage ? (
                    <div className="space-y-2">
                      <p className="text-sm text-zinc-400">{formData.outboundImage.name}</p>
                      {mode !== 'view' && (
                        <button
                          onClick={() => handleFileChange('outboundImage', null)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-zinc-400 mb-2" />
                      <p className="text-sm text-zinc-400 mb-2">Subir imagen de ida</p>
                      {mode !== 'view' && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('outboundImage', e.target.files?.[0] || null)}
                          className="hidden"
                          id="outbound-image"
                        />
                      )}
                      <label
                        htmlFor="outbound-image"
                        className={`inline-block px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                          mode === 'view'
                            ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Seleccionar Archivo
                      </label>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Imagen de Vuelta
                </label>
                <div className="border-2 border-dashed border-zinc-600 rounded-lg p-4 text-center">
                  {formData.returnImage ? (
                    <div className="space-y-2">
                      <p className="text-sm text-zinc-400">{formData.returnImage.name}</p>
                      {mode !== 'view' && (
                        <button
                          onClick={() => handleFileChange('returnImage', null)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-zinc-400 mb-2" />
                      <p className="text-sm text-zinc-400 mb-2">Subir imagen de vuelta</p>
                      {mode !== 'view' && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('returnImage', e.target.files?.[0] || null)}
                          className="hidden"
                          id="return-image"
                        />
                      )}
                      <label
                        htmlFor="return-image"
                        className={`inline-block px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                          mode === 'view'
                            ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Seleccionar Archivo
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Route Status */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Estado de Rutas</h2>

            <div className="space-y-3">
              <div className={`p-3 rounded-md border ${
                outboundStatus.status === 'complete' ? 'border-green-600 bg-green-900/20' :
                outboundStatus.status === 'incomplete' ? 'border-yellow-600 bg-yellow-900/20' :
                'border-zinc-600 bg-zinc-700/20'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{outboundStatus.text}</span>
                  <MapPin className={`h-4 w-4 ${
                    outboundStatus.status === 'complete' ? 'text-green-400' :
                    outboundStatus.status === 'incomplete' ? 'text-yellow-400' :
                    'text-zinc-400'
                  }`} />
                </div>
                {outboundRoute.distance > 0 && (
                  <p className="text-xs text-zinc-400 mt-1">
                    Distancia: {outboundRoute.distance} km
                  </p>
                )}
              </div>

              <div className={`p-3 rounded-md border ${
                returnStatus.status === 'complete' ? 'border-green-600 bg-green-900/20' :
                returnStatus.status === 'incomplete' ? 'border-yellow-600 bg-yellow-900/20' :
                'border-zinc-600 bg-zinc-700/20'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{returnStatus.text}</span>
                  <MapPin className={`h-4 w-4 ${
                    returnStatus.status === 'complete' ? 'text-green-400' :
                    returnStatus.status === 'incomplete' ? 'text-yellow-400' :
                    'text-zinc-400'
                  }`} />
                </div>
                {returnRoute.distance > 0 && (
                  <p className="text-xs text-zinc-400 mt-1">
                    Distancia: {returnRoute.distance} km
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-900/50 border border-red-600 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-100 mb-2">Errores:</h3>
              <ul className="text-sm text-red-200 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          {mode !== 'view' && (
            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 text-zinc-300 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors"
                disabled={isLoading}
              >
                Limpiar
              </button>
              <button
                onClick={handleSave}
                disabled={!isFormValid || isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {mode === 'create' ? 'Crear Ruta' : 'Actualizar Ruta'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="lg:col-span-2">
          {/* View Tabs */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => {
                setCurrentView('outbound')
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'outbound'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              Ruta de Ida
            </button>
            <button
              onClick={() => setCurrentView('return')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'return'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              Ruta de Vuelta
            </button>
            <button
              onClick={() => setCurrentView('both')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'both'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              Ambas Rutas
            </button>
          </div>

          {/* Map Editor */}
          <div className="bg-zinc-800 rounded-lg overflow-hidden h-[115vh]">
            <MapEditor
              mode={mode === 'view' ? 'view' : currentView === 'both' ? 'view' : 'edit'}
              routeType={currentView}
              initialWaypoints={currentView === 'outbound' ? outboundRoute.waypoints :
                               currentView === 'return' ? returnRoute.waypoints : []}
              initialGeometry={currentView === 'outbound' ? (outboundRoute.geometry ?? undefined) :
                              currentView === 'return' ? (returnRoute.geometry ?? undefined) : undefined}
              onSave={(waypoints, geometry) => {
                if (currentView === 'outbound') {
                  // saveOutboundRoute will be called from MapEditor
                } else if (currentView === 'return') {
                  // saveReturnRoute will be called from MapEditor
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RouteFormManager: React.FC<RouteFormManagerProps> = (props) => {
  return (
    <RouteFormProvider>
      <RouteMapEditorProvider>
        <RouteFormManagerContent {...props} />
      </RouteMapEditorProvider>
    </RouteFormProvider>
  );
};

export default RouteFormManager;