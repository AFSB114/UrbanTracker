
"use client";
import React, { useState } from 'react';
import { Edit3, Trash2, Plus, Route } from 'lucide-react';
import RouteModal from './components/RouteModal';
import { IRoute, RouteWaypoint } from './types/routeTypes';
import RouteModal1 from './components/RouteModal1';

const RouteDashboard: React.FC = () => {
  const [routes, setRoutes] = useState<IRoute[]>([
    {
      route_id: '1',
      route_number: 'R001',
      description: 'Ruta Centro - Norte',
      total_distance_km: 15.3,
      active: true,
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      route_id: '2',
      route_number: 'R002',
      description: 'Ruta Sur - Occidente',
      total_distance_km: 22.1,
      active: false,
      created_at: '2024-01-10T14:20:00Z'
    },
    {
      route_id: '3',
      route_number: 'R003',
      description: 'Ruta Expresa Terminal - Aeropuerto',
      total_distance_km: 35.7,
      active: true,
      created_at: '2024-01-08T09:15:00Z'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<IRoute | null>(null);
  const [editingWaypoints, setEditingWaypoints] = useState<RouteWaypoint[]>([]);

  // Simular waypoints para rutas existentes
  const mockWaypoints: { [key: string]: RouteWaypoint[] } = {
    '1': [
      { sequence_order: 1, latitude: 4.6097, longitude: -74.0817 },
      { sequence_order: 2, latitude: 4.6200, longitude: -74.0700 },
      { sequence_order: 3, latitude: 4.6300, longitude: -74.0600 }
    ],
    '2': [
      { sequence_order: 1, latitude: 4.5897, longitude: -74.0917 },
      { sequence_order: 2, latitude: 4.5800, longitude: -74.1000 },
      { sequence_order: 3, latitude: 4.5700, longitude: -74.1100 }
    ],
    '3': [
      { sequence_order: 1, latitude: 4.6097, longitude: -74.0817 },
      { sequence_order: 2, latitude: 4.5500, longitude: -74.1200 },
      { sequence_order: 3, latitude: 4.4800, longitude: -74.1500 },
      { sequence_order: 4, latitude: 4.4200, longitude: -74.1800 }
    ]
  };

  const handleCreateRoute = () => {
    setEditingRoute(null);
    setEditingWaypoints([]);
    setIsModalOpen(true);
  };

  const handleEditRoute = (route: IRoute) => {
    setEditingRoute(route);
    setEditingWaypoints(mockWaypoints[route.route_id!] || []);
    setIsModalOpen(true);
  };

  const handleSaveRoute = async (data: { route: IRoute; waypoints: RouteWaypoint[] }) => {
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingRoute) {
      setRoutes(prev => prev.map(r => 
        r.route_id === editingRoute.route_id ? { ...data.route, route_id: editingRoute.route_id } : r
      ));
      mockWaypoints[editingRoute.route_id!] = data.waypoints;
    } else {
      const newRoute = { ...data.route, route_id: Date.now().toString(), created_at: new Date().toISOString() };
      setRoutes(prev => [...prev, newRoute]);
      mockWaypoints[newRoute.route_id!] = data.waypoints;
    }
  };

  const handleDeleteRoute = (routeId: string) => {
    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
      setRoutes(prev => prev.filter(r => r.route_id !== routeId));
      delete mockWaypoints[routeId];
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRoute(null);
    setEditingWaypoints([]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Rutas</h1>
          <p className="text-zinc-400 mt-2">
            Administra las rutas de transporte
          </p>
        </div>
        <button
          onClick={handleCreateRoute}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Nueva Ruta
        </button>
      </div>

      {/* Lista de Rutas */}
      <div className="bg-zinc-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Route size={20} className="mr-2" />
            Rutas Registradas ({routes.length})
          </h2>
        </div>

        <div className="divide-y divide-zinc-700">
          {routes.length === 0 ? (
            <div className="p-12 text-center">
              <Route size={48} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-lg font-medium text-zinc-400 mb-2">
                No hay rutas registradas
              </h3>
              <p className="text-zinc-500 mb-6">
                Crea tu primera ruta para comenzar
              </p>
              <button
                onClick={handleCreateRoute}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Crear Primera Ruta
              </button>
            </div>
          ) : (
            routes.map((route) => (
              <div
                key={route.route_id}
                className="p-6 hover:bg-zinc-750 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-medium text-white">
                        {route.route_number}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          route.active
                            ? "bg-green-800 text-green-200"
                            : "bg-red-800 text-red-200"
                        }`}
                      >
                        {route.active ? "Activa" : "Inactiva"}
                      </span>
                    </div>

                    {route.description && (
                      <p className="text-zinc-400 mb-3 max-w-2xl">
                        {route.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-zinc-500">
                        <span className="font-medium text-zinc-300">
                          Distancia:
                        </span>{" "}
                        {route.total_distance_km || 0} km
                      </div>
                      <div className="text-zinc-500">
                        <span className="font-medium text-zinc-300">
                          Puntos:
                        </span>{" "}
                        {mockWaypoints[route.route_id!]?.length || 0}
                      </div>
                      <div className="text-zinc-500">
                        <span className="font-medium text-zinc-300">
                          Creada:
                        </span>{" "}
                        {new Date(route.created_at!).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-6">
                    <button
                      onClick={() => handleEditRoute(route)}
                      className="text-blue-400 hover:text-blue-300 px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-900 hover:bg-opacity-20 transition-colors flex items-center gap-2"
                    >
                      <Edit3 size={16} />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteRoute(route.route_id!)}
                      className="text-red-400 hover:text-red-300 px-4 py-2 text-sm font-medium rounded-md hover:bg-red-900 hover:bg-opacity-20 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Ruta */}
      {isModalOpen && (
        <RouteModal
          onClose={handleCloseModal}
          onSave={handleSaveRoute}
          editingRoute={editingRoute}
          editingWaypoints={editingWaypoints}
        />
      )}
    </div>
  );
};

export default RouteDashboard;