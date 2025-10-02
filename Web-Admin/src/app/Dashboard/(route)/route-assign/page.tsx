"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useRouteAssignments } from "./hooks/useRouteAssignments";
import { RouteAssignmentCard } from "./components/RouteAssignmentCard";
import { StatisticsCards } from "./components/StatisticsCards";
import { RouteAssignmentFilters } from "./components/RouteAssignmentFilters";
import { RouteAssignmentModal } from "./components/RouteAssignmentModal";
import { Pagination } from "./components/Pagination";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { RouteAssignment } from "./types/routeAssignmentTypes";

export default function RouteAssignPage() {
  const {
    paginatedAssignments,
    filteredAssignments,
    searchTerm,
    statusFilter,
    statistics,
    pagination,
    isDialogOpen,
    isDeleteModalOpen,
    editingAssignment,
    assignmentToDelete,
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
    saveRouteAssignment,
    confirmDeleteRouteAssignment,
  } = useRouteAssignments()

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSaveRouteAssignment = async () => {
    setFormErrors({})
    try {
      await saveRouteAssignment()
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      }
    }
  }

  const handleDeleteClick = (id: number) => {
    openDeleteModal(filteredAssignments.find((assignment: { id: number; }) => assignment.id === id) as RouteAssignment);
  }

  const isEditing = !!editingAssignment

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-zinc-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando asignaciones de rutas...</span>
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
            Gestión de asignaciones de rutas
          </h1>
          <p className="text-zinc-400 mt-2">
            Asigna rutas a vehículos y conductores
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
      <RouteAssignmentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Route assignments list */}
      <section className="space-y-6">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg">
              {searchTerm
                ? "No se encontraron asignaciones con los filtros aplicados"
                : "No hay asignaciones de rutas aún"}
            </div>
            {!searchTerm && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar primera asignación
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedAssignments.map((assignment: RouteAssignment) => (
                <RouteAssignmentCard
                  key={assignment.id}
                  routeAssignment={assignment}
                  onEdit={openEditModal}
                  onDelete={() => handleDeleteClick(assignment.id)}
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
      <RouteAssignmentModal
        isOpen={isDialogOpen}
        isEditing={isEditing}
        formData={formData}
        onClose={closeModal}
        onSave={handleSaveRouteAssignment}
        onFormChange={updateFormData}
        isSaving={isSaving}
        errors={formErrors}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteRouteAssignment}
        assignment={assignmentToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}