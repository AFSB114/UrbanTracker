"use client";

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouteSchedules } from './hooks/useRouteSchedules';
import { useRouteScheduleActions } from './hooks/useRouteScheduleActions';
import { RouteScheduleHeader } from './components/RouteScheduleHeader';
import { RouteScheduleCard } from './components/RouteScheduleCard';
import { RouteScheduleFilters } from './components/RouteScheduleFilters';
import { StatisticsCards } from './components/StatisticsCards';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import RouteScheduleFormManager from './components/RouteScheduleFormManager';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Pagination from '../routes/components/Pagination';
import { RouteScheduleResponse, RouteScheduleRequest, BulkRouteScheduleRequest } from './types/routeScheduleTypes';
import { RouteResponse } from '../routes/types/routeTypes';
import { RouteWithSchedules } from './hooks/useRouteSchedules';
import { routeScheduleService } from './services/routeScheduleService';

export default function RouteSchedulePage() {
  const {
    routesWithSchedules,
    filteredRoutesWithSchedules,
    paginatedRoutesWithSchedules,
    pagination,
    searchTerm,
    dayFilter,
    routeFilter,
    statusFilter,
    statistics,
    loading,
    error,
    setSearchTerm,
    setDayFilter,
    setRouteFilter,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    fetchRouteSchedules
  } = useRouteSchedules();

  const {
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteSchedule,
    isDeleteModalOpen,
    routeToDelete,
    isDeleting
  } = useRouteScheduleActions(fetchRouteSchedules);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSchedules, setEditingSchedules] = useState<RouteScheduleResponse[]>([]);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleCreateSchedule = () => {
    setEditingSchedules([]);
    setIsFormModalOpen(true);
  };

  const handleEditSchedule = (routeWithSchedules: RouteWithSchedules) => {
    setEditingSchedules(routeWithSchedules.schedules);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingSchedules([]);
  };

  const handleSaveSchedule = async (data: BulkRouteScheduleRequest) => {
    setIsFormLoading(true);
    try {
      if (editingSchedules.length > 0) {
        // Para edición: eliminar horarios existentes de la ruta y crear los nuevos
        const routeId = editingSchedules[0].routeId;
        await routeScheduleService.updateRouteSchedules(routeId, data);
      } else {
        console.log('datos de los horarios a crear:', data); // Debug log
        // Para creación: crear nuevos horarios
        await routeScheduleService.createRouteSchedules(data);
      }
      await fetchRouteSchedules();
      handleCloseFormModal();
    } catch (error) {
      console.error('Error saving schedules:', error);
      throw error;
    } finally {
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    fetchRouteSchedules();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-zinc-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando Horarios...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="text-center py-12">
          <div className="text-zinc-400 text-lg">
            Error al cargar los horarios: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      {/* Header */}
      <RouteScheduleHeader onCreateSchedule={handleCreateSchedule} />

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <RouteScheduleFilters
        searchTerm={searchTerm}
        dayFilter={dayFilter}
        routeFilter={routeFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onDayFilterChange={setDayFilter}
        onRouteFilterChange={setRouteFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Schedule list */}
      <section className="space-y-6">
        {paginatedRoutesWithSchedules.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg">
              {searchTerm || dayFilter !== "all" || routeFilter !== "all" || statusFilter !== "all"
                ? "No se encontraron horarios con los filtros aplicados"
                : "No hay horarios registrados"}
            </div>
            {!searchTerm && dayFilter === "all" && routeFilter === "all" && statusFilter === "all" && (
              <button
                onClick={handleCreateSchedule}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Crear primer horario
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedRoutesWithSchedules.map((routeWithSchedules) => (
                <RouteScheduleCard
                  key={routeWithSchedules.route.id}
                  routeWithSchedules={routeWithSchedules}
                  onEdit={handleEditSchedule}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>
            {/* Pagination */}
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
              onItemsPerPageChange={setItemsPerPage}
              isLoading={loading}
            />
          </>
        )}
      </section>

      {/* Form Modal */}
      <Sheet open={isFormModalOpen} onOpenChange={handleCloseFormModal}>
        <SheetContent side="right" className="bg-zinc-900 text-white w-full sm:max-w-2xl p-4">
          <RouteScheduleFormManager
            onSave={handleSaveSchedule}
            editingSchedules={editingSchedules}
            mode={editingSchedules.length > 0 ? 'edit' : 'create'}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteSchedule}
        route={routeToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}