// app/drivers/page.tsx or pages/drivers.tsx (depending on Next.js version)
"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useDrivers } from "./hooks/useDrivers"
import { DriverCard } from "./components/DriverCard"
import { StatisticsCards } from "./components/StatisticsCards"
import { DriverFilters } from "./components/DriverFilters"
import { DriverModal } from "./components/DriverModal"

export default function DriversPage() {
  const {
    filteredDrivers,
    searchTerm,
    isDialogOpen,
    editingDriver,
    formData,
    statistics,
    setSearchTerm,
    openCreateModal,
    openEditModal,
    closeModal,
    updateFormData,
    saveDriver,
    deleteDriver,
  } = useDrivers()

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Driver Management</h1>
          <p className="text-gray-400 mt-2">Control and manage your driver fleet</p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Driver
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
                ? "No drivers found with the applied filters" 
                : "No drivers registered"
              }
            </div>
            {!searchTerm && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add first driver
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onEdit={openEditModal}
                onDelete={deleteDriver}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <DriverModal
        isOpen={isDialogOpen}
        isEditing={!!editingDriver}
        formData={formData}
        onClose={closeModal}
        onSave={saveDriver}
        onFormChange={updateFormData}
      />
    </div>
  )
}