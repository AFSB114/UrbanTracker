"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useVehicles } from "./hooks/useVehicles"
import { VehicleCard } from "./components/VehicleCard"
import { StatisticsCards } from "./components/StatisticsCards"
import { VehicleFilters } from "./components/VehicleFilters"
import { VehicleModal } from "./components/VehicleModal"

export default function VehiclesPage() {
  const {
    filteredVehicles,
    statusFilter,
    searchTerm,
    isDialogOpen,
    editingVehicle,
    formData,
    statistics,
    setSearchTerm,
    setStatusFilter,
    openCreateModal,
    openEditModal,
    closeModal,
    updateFormData,
    saveVehicle,
    deleteVehicle,
  } = useVehicles()

  return (
    <div className="space-y-8 bg-black min-h-screen p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Vehicle Management</h1>
          <p className="text-gray-400 mt-2">Control and manage your vehicle fleet</p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Vehicle
        </Button>
      </header>

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <VehicleFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Vehicle list */}
      <section className="space-y-6">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {searchTerm || statusFilter !== "all" 
                ? "No vehicles found with the applied filters" 
                : "No vehicles registered"
              }
            </div>
            {(!searchTerm && statusFilter === "all") && (
              <Button
                onClick={openCreateModal}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add first vehicle
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onEdit={openEditModal}
                onDelete={deleteVehicle}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <VehicleModal
        isOpen={isDialogOpen}
        isEditing={!!editingVehicle}
        formData={formData}
        onClose={closeModal}
        onSave={saveVehicle}
        onFormChange={updateFormData}
      />
    </div>
  )
}