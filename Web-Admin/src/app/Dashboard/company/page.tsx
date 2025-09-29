"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useCompanies } from "./hooks/useCompany"
import { CompanyCard } from "./components/CompanyCard"
import { StatisticsCard } from "./components/StatisticsCard"
import { CompanyFilters } from "./components/CompanyFilters"
import { CompanyModal } from "./components/CompanyModal"
import { Pagination } from "./components/Pagination"
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal"
import { Company } from "./types/companyTypes"

export default function CompaniesPage() {
  const {
    paginatedCompanies,
    filteredCompanies,
    searchTerm,
    statistics,
    pagination,
    isDialogOpen,
    isDeleteModalOpen,
    editingCompany,
    companyToDelete,
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
    saveCompany,
    confirmDeleteCompany,
  } = useCompanies()

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSaveDriver = async () => {
    setFormErrors({})
    try {
      await saveCompany()
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors({ general: error.message })
      }
    }
  }

  const handleDeleteClick = (id: number) => {
    openDeleteModal(filteredCompanies.find(company => company.id === id) as Company)

  }

  const isEditing = !!editingCompany

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3 text-zinc-300">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="text-lg">Cargando Empresas...</span>
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
            Gestión de empresas
          </h1>
          <p className="text-zinc-400 mt-2">
            Controle y gestione su flota de empresas
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva empresa
        </Button>
      </header>

      {/* Statistics */}
      <StatisticsCard statistics={statistics} />

      {/* Filters */}
      <CompanyFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter="all"
        onStatusFilterChange={setStatusFilter}
      />

      {/* Company list */}
      <section className="space-y-6">
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-zinc-400 text-lg">
              {searchTerm
                ? "No se encontraron empresas con los filtros aplicados"
                : "No hay empresas registradas aun."}
            </div>
            {!searchTerm && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer empresa
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {paginatedCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onEdit={openEditModal}
                  onDelete={() => handleDeleteClick(company.id)}
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
      <CompanyModal
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
        onConfirm={confirmDeleteCompany}
        company={companyToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};