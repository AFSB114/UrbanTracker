// app/drivers/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useDrivers } from "./hooks/useDrivers"
import { DriverCard } from "./components/DriverCard"
import { StatisticsCards } from "./components/StatisticsCards"
import { DriverFilters } from "./components/DriverFilters"
import { DriverModal } from "./components/DriverModal"
import { Pagination } from "./components/Pagination"
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal"
import { Driver } from "./types/driverTypes"

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
  } = useDrivers()

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSaveDriver = async () => {
    setFormErrors({})
    try {
      await saveDriver()
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      }
    }
  }

  // Handler para el botón de eliminar en DriverCard
  const handleDeleteClick = (id: number) => {
    openDeleteModal(filteredDrivers.find(driver => driver.id === id) as Driver)
    
  }

  const isEditing = !!editingDriver

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-gray-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando Conductores...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de conductores</h1>
          <p className="text-gray-400 mt-2">Controle y gestione su flota de conductores</p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo conductor
        </Button>
      </header>

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <DriverFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Driver list */}
      <section className="space-y-6">
        {filteredDrivers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {searchTerm 
                ? "No se encontraron conductores que coincidan con su búsqueda." 
                : "No hay conductores disponibles. ¡Agregue su primer conductor!"
              }
            </div>
            {!searchTerm && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar conductor
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Drivers grid - ahora usa paginatedDrivers */}
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
              isLoading={isLoading}
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
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteDriver}
        driver={driverToDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}