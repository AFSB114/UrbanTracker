"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useVehicles } from "./hooks/useVehicles"
import { VehicleCard } from "./components/VehicleCard"
import { StatisticsCards } from "./components/StatisticsCards"
import { VehicleFilters } from "./components/VehicleFilters"
import { VehicleModal } from "./components/VehicleModal"
import { Pagination } from "./components/Pagination"
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal"
import { Vehicle } from "./types/vehiculeTypes"

export default function VehiclesPage() {
  const {
    paginatedVehicles,
    filteredVehicles,
    pagination,
    searchTerm,
    statusFilter,
    statistics,
    isDialogOpen,
    isDeleteModalOpen,
    openDeleteModal,
    editingVehicle,
    vehicleToDelete,
    formData,
    isLoading,
    isDeleting,
    isSaving,
    companies,
    vehicleTypes,
    setSearchTerm,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveVehicle,
    confirmDeleteVehicle,
  } = useVehicles()

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSaveDriver = async () => {
    setFormErrors({})
    try {
      await saveVehicle()
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      }
    }
  }

  // Handler para el botón de eliminar en DriverCard
  const handleDeleteClick = (id: number) => {
    openDeleteModal(filteredVehicles.find(vehicle => vehicle.id === id) as Vehicle)

  }

  const isEditing = !!editingVehicle

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
            Gestión de vehículos
          </h1>
          <p className="text-zinc-400 mt-2">
            Controle y gestione su flota de vehículos
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo vehículo
        </Button>
      </header>

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <VehicleFilters
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
                ? "No vehicles found with the applied filters"
                : "No vehicles registered"}
            </div>
            {!searchTerm && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer vehículo
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
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
      <VehicleModal
        isOpen={isDialogOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSave={handleSaveDriver}
        onFormChange={updateFormData}
        isSaving={isSaving}
        errors={formErrors}
        companies={companies}
        vehicleTypes={vehicleTypes}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteVehicle}
        vehicle={vehicleToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}