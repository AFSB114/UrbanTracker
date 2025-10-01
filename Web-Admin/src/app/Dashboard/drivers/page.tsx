"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { useDrivers } from "./hooks/useDrivers";
import { DriverCard } from "./components/DriverCard";
import { StatisticsCards } from "./components/StatisticsCards";
import { DriverFilters } from "./components/DriverFilters";
import { DriverModal } from "./components/DriverModal";
import { Pagination } from "./components/Pagination";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { Driver } from "./types/driverTypes";
import type { ApiError } from "./services/api/types";


export default function DriversPage() {
  const {
    paginatedDrivers,
    filteredDrivers,
    searchTerm,
    statistics,
    pagination,
    isDialogOpen,
    isDeleteModalOpen,
    editingDriver,
    driverToDelete,
    formData,
    isLoading,
    isDeleting,
    isSaving,
    setSearchTerm,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveDriver,
    confirmDeleteDriver,
    apiError,
    clearApiError,
    refetchDrivers,
  } = useDrivers();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSaveDriver = async () => {
    setFormErrors({});
    try {
      await saveDriver();
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message });
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    const driver = filteredDrivers.find((driver) => driver.id === id);
    if (driver) {
      openDeleteModal(driver);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetchDrivers();
    } finally {
      setIsRefreshing(false);
    }
  };

  const isEditing = !!editingDriver;
  const hasError = !!apiError;
  const hasData = filteredDrivers.length > 0;
  const isEmpty = !isLoading && !hasError && !hasData && !searchTerm;
  const noResults = !isLoading && !hasError && !hasData && !!searchTerm;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-zinc-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando Conductores...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Gestión de conductores
          </h1>
          <p className="text-zinc-400 mt-2">
            Controle y gestione su flota de conductores
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button
            onClick={openCreateModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo conductor
          </Button>
        </div>
      </header>

      {/* Error Alert - Simple y directo */}
      {hasError && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-medium mb-1">
                  {apiError.status === 0 ? "Error de Conexión" : "Error"}
                </h4>
                <p className="text-red-200/80 text-sm">
                  {apiError.message}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(apiError.status === 0 || (apiError.status && apiError.status >= 500)) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  className="text-red-300 hover:text-red-200 hover:bg-red-900/30"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reintentar
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearApiError}
                className="text-red-300 hover:text-red-200 hover:bg-red-900/30"
              >
                ✕
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics - Solo mostrar si no hay errores críticos */}
      {!hasError && <StatisticsCards statistics={statistics} />}

      {/* Filters - Solo mostrar si no hay errores críticos */}
      {!hasError && (
        <DriverFilters 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      )}

      {/* Content Section */}
      <section className="space-y-6">
        {isEmpty && (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg mb-4">
              No hay conductores disponibles. ¡Agregue su primer conductor!
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar conductor
            </Button>
          </div>
        )}

        {noResults && (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg mb-4">
              No se encontraron conductores que coincidan con su búsqueda.
            </div>
            <Button
              onClick={() => setSearchTerm('')}
              variant="outline"
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
            >
              Limpiar búsqueda
            </Button>
          </div>
        )}

        {hasData && (
          <>
            {/* Drivers grid */}
            <div className="grid gap-6">
              {paginatedDrivers.map((driver) => (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  onEdit={openEditModal}
                  onDelete={() => handleDeleteClick(driver.id)}
                />
              ))}
            </div>

            {/* Pagination component */}
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
              onItemsPerPageChange={setItemsPerPage}
              isLoading={isRefreshing}
            />
          </>
        )}
      </section>

      {/* Driver Form Modal */}
      <DriverModal
        isOpen={isDialogOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSave={handleSaveDriver}
        onFormChange={updateFormData}
        isSaving={isSaving}
        errors={formErrors}
        apiError={apiError} // Pasamos el error de API al modal
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteDriver}
        driver={driverToDelete}
        isDeleting={isDeleting}
        apiError={apiError} // Pasamos el error de API al modal
      />
    </div>
  );
}
