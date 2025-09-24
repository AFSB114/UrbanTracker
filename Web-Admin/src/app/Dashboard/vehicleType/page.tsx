"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import useVehicleType from "./hooks/useVehicleType"
import VehicleTypeCard from "./components/VehicleTypeCard"
import StatisticsCards from "./components/StatisticsCards"
import VehicleTypeFilters from "./components/VehicleTypeFilters"
import VehicleTypeModal from "./components/VehicleTypeModal"
import Pagination from "./components/Pagination"
import DeleteConfirmationModal from "./components/DeleteConfirmationModal"
import { VehicleType } from "./types/vehicleTypes"

export default function VehicleTypesPage() {
    const {
        filteredVehicles,
        paginatedVehicles,
        searchTerm,
        statistics,
        pagination,
        isDialogOpen,
        isDeleteModalOpen,
        editingVehicleType,
        vehicleTypeToDelete,
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
        saveVehicleType,
        confirmDeleteVehicleType,
    } = useVehicleType();

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleSave = async () => {
        setFormErrors({});
        try {
            await saveVehicleType();
        } catch (error) {
            if (error instanceof Error) {
                setFormErrors({ general: error.message });
            }
        }
    };

    const handleDeleteClick = (id: number) => {
        openDeleteModal(filteredVehicles.find((v: VehicleType) => v.id === id) as VehicleType);
    };

    const isEditing = !!editingVehicleType;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-3 text-zinc-300">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                        <span className="text-lg">Cargando Tipos de Vehículo...</span>
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
                        Gestión de tipos de vehículo
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Controle y gestione los tipos de vehículo
                    </p>
                </div>
                <Button
                    onClick={openCreateModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo tipo de vehículo
                </Button>
            </header>

            {/* Statistics */}
            <StatisticsCards statistics={statistics} />

            {/* Filters */}
            <VehicleTypeFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* VehicleType list */}
            <section className="space-y-6">
                {filteredVehicles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-zinc-400 text-lg">
                            {searchTerm
                                ? "No se encontraron tipos de vehículo con los filtros aplicados"
                                : "No hay tipos de vehículo registrados"}
                        </div>
                        {!searchTerm && (
                            <Button
                                onClick={openCreateModal}
                                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Agregar primer tipo de vehículo
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6">
                            {paginatedVehicles.map((vehicleType: VehicleType) => (
                                <VehicleTypeCard
                                    key={vehicleType.id}
                                    vehicleType={vehicleType}
                                    onEdit={openEditModal}
                                    onDelete={() => handleDeleteClick(vehicleType.id)}
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
            <VehicleTypeModal
                isOpen={isDialogOpen}
                isEditing={isEditing}
                formData={formData}
                onClose={closeModal}
                onSave={handleSave}
                onFormChange={updateFormData}
                isSaving={isSaving}
                errors={formErrors}
            />
            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDeleteVehicleType}
                vehicleType={vehicleTypeToDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}
