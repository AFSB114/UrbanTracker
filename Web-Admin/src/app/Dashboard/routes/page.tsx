"use client";

import React from 'react';
import { Edit3, Trash2, Plus, Route } from 'lucide-react';
import { RouteResponse } from './types/routeTypes';
import { useRouteContext } from './context/RouteContext';
import { useRouter } from 'next/navigation';

export default function RouteDashboard() {
  const { routes, loading, error } = useRouteContext();
  const router = useRouter();

  const handleCreateRoute = () => {
    router.push('/Dashboard/routes/new');
  };

  const handleEditRoute = (route: RouteResponse) => {
    router.push(`/Dashboard/routes/edit/${route.id}`);
  };

  const handleDeleteRoute = (routeId: number) => {
    console.log('Eliminar ruta:', routeId);
    // TODO: Implementar lógica para eliminar ruta
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando rutas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error al cargar rutas: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
                key={route.id}
                className="p-6 hover:bg-zinc-750 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-medium text-white">
                        {route.numberRoute}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="text-zinc-500">
                        <span className="font-medium text-zinc-300">
                          Distancia:
                        </span>{" "}
                        {route.totalDistance || 0} km
                      </div>
                      <div className="text-zinc-500">
                        <span className="font-medium text-zinc-300">
                          Puntos:
                        </span>{" "}
                        {route.routeWaypoints?.length || 0}
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
                      onClick={() => handleDeleteRoute(route.id!)}
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
    </div>
  );
};