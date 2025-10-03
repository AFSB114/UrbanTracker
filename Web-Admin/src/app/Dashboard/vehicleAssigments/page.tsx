"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useVehicleAssigments } from "./hooks/useVehicleAssigment";
import { VehicleAssigmentCard } from "./components/VehicleAssigmentCard";
import { StatisticsCards } from "./components/StatisticsCards";
import { VehicleAssigmentFilters } from "./components/VehicleAssigmentFilters";
import { VehicleAssigmentModal } from "./components/VehicleAssigmentsModal";
import { Pagination } from "./components/Pagination";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { VehicleAssigment } from "./types/VehicleAssigmentsType";

export default function VehicleAssigmentsPage() {
  const {
    paginatedVehicles,
    filteredVehicles,
    searchTerm,
    statusFilter,
    statistics,
    pagination,
    isDialogOpen,
    isDeleteModalOpen,
    editingVehicle,
    vehicleToDelete,
    formData,
    isLoading,
    isDeleting,
    isSaving,
    setSearchTerm,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveVehicleAssigment,
    confirmDeleteVehicleAssigment,
  } = useVehicleAssigments()

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSaveVehicleAssignment = async () => {
    setFormErrors({})
    try {
      await saveVehicleAssigment()
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      }
    }
  }

  const handleDeleteClick = (id: number) => {
    openDeleteModal(filteredVehicles.find((vehicle: { id: number; }) => vehicle.id === id) as VehicleAssigment);

  }

  const isEditing = !!editingVehicle

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-zinc-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando asignaciones de vehículos...</span>
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
            Gestión de asignaciones de vehículos
          </h1>
          <p className="text-zinc-400 mt-2">
            Controle y gestione sus asignaciones de vehículos
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva asignación
        </Button>
      </header>

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <VehicleAssigmentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Vehicle list */}
      <section className="space-y-6">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg">
              {searchTerm
                ? "No se encontraron vehículos con los filtros aplicados"
                : "No hay vehiculos asignados aún"}
            </div>
            {!searchTerm && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer asignación
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedVehicles.map((vehicle: VehicleAssigment) => (
                <VehicleAssigmentCard
                  key={vehicle.id}
                  vehicleAssigment={vehicle}
                  onEdit={openEditModal}
                  onDelete={() => handleDeleteClick(vehicle.id)}
                />
              ))}
            </div>
            {/* Pagination component */}
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
              onItemsPerPageChange={setItemsPerPage}
              isLoading={isLoading}
            />
          </>
        )}
      </section>

      {/* Modal */}
      <VehicleAssigmentModal
        isOpen={isDialogOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSave={handleSaveVehicleAssignment}
        onFormChange={updateFormData}
        isSaving={isSaving}
        errors={formErrors}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteVehicleAssigment}
        vehicleAssigment={vehicleToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};