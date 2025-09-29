"use client";

import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRoutes } from './hooks/useRoutes';
import { useRouteActions } from './hooks/useRouteActions';
import RouteErrorState from './components/RouteErrorState';
import RouteHeader from './components/RouteHeader';
import {RouteCard} from './components/RouteCard';
import { StatisticsCards } from './components/StatisticsCards';
import RouteFilters from './components/RouteFilters';
import Pagination from './components/Pagination';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { RouteResponse } from './types/routeTypes';

export default function RouteDashboard() {
  const {
    paginatedRoutes,
    filteredRoutes,
    pagination,
    searchTerm,
    statusFilter,
    statistics,
    loading,
    error,
    setSearchTerm,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    fetchRoutes
  } = useRoutes();
  const {
    handleCreateRoute,
    handleEditRoute,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteRoute,
    isDeleteModalOpen,
    routeToDelete,
    isDeleting
  } = useRouteActions(fetchRoutes);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleDeleteClick = (route: RouteResponse) => {
    openDeleteModal(route);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-zinc-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando Rutas...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <RouteErrorState error={error} />;

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      {/* Header */}
      <RouteHeader onCreateRoute={handleCreateRoute} />

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <RouteFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Route list */}
      <section className="space-y-6">
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg">
              {searchTerm || statusFilter !== "all"
                ? "No routes found with the applied filters"
                : "No routes registered"}
            </div>
            {!searchTerm && statusFilter === "all" && (
              <button
                onClick={handleCreateRoute}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Agregar primera ruta
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedRoutes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  onEdit={handleEditRoute}
                  onDelete={() => handleDeleteClick(route)}
                />
              ))}
            </div>
            {/* Pagination component */}
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
              onItemsPerPageChange={setItemsPerPage}
              isLoading={loading}
            />
          </>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteRoute}
        route={routeToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};