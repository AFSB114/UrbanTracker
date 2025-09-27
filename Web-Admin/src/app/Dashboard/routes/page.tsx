"use client";

import React, { useEffect } from 'react';
import { Route } from 'lucide-react';
import { useRoutes } from './hooks/useRoutes';
import { useRouteActions } from './hooks/useRouteActions';
import RouteLoadingState from './components/RouteLoadingState';
import RouteErrorState from './components/RouteErrorState';
import RouteEmptyState from './components/RouteEmptyState';
import RouteHeader from './components/RouteHeader';
import RouteListItem from './components/RouteListItem';

export default function RouteDashboard() {
  const { routes, loading, error, fetchRoutes } = useRoutes();
  const { handleCreateRoute, handleEditRoute, handleDeleteRoute } = useRouteActions();

  useEffect(() => {
    fetchRoutes();
  }, []);
  
  if (loading) return <RouteLoadingState />;

  if (error) return <RouteErrorState error={error} />;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <RouteHeader onCreateRoute={handleCreateRoute} />

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
            <RouteEmptyState onCreateRoute={handleCreateRoute} />
          ) : (
            routes.map((route) => (
              <RouteListItem
                key={route.id}
                route={route}
                onEdit={handleEditRoute}
                onDelete={handleDeleteRoute}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};