
export interface Vehicle {
    id: number;
    licensePlate: string;
    brand: string;
    model: string;
    type: string;
    status: string;
    driver: string;
    company: string;
    capacity: number;
    year: number;
}

export interface VehiculeFormData {
    licensePlate: string;
    brand: string;
    model: string;
    type: string;
    status: string;
    driver: string;
    company: string;
    capacity: number;
    year: number;
}


export interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
}

export interface PaginationConfig {
    page: number;
    itemsPerPage: number;
}

export interface VehiculeStatistics {
    totalVehicules: number;
    activeVehicules: number;
    inactiveVehicules: number;
    newThisMonth: number;
}

export interface UseVehiculesReturn {
    filteredVehicles: Vehicle[];
    paginatedVehicles: Vehicle[];
    searchTerm: string;
    statistics: VehiculeStatistics;
    pagination: PaginationData;

    // Modal states
    isDialogOpen: boolean;
    isDeleteModalOpen: boolean;
    editingVehicle: Vehicle | null;
    vehicleToDelete: Vehicle | null;
    formData: VehiculeFormData;

    // Loading states
    isLoading: boolean;
    isDeleting: boolean;
    isSaving: boolean;

    // Actions
    setSearchTerm: (term: string) => void;
    setStatusFilter: (filter: string) => void;
    setPage: (page: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    openCreateModal: () => void;
    openEditModal: (vehicule: Vehicle) => void;
    openDeleteModal: (vehicule: Vehicle) => void;
    closeModal: () => void;
    closeDeleteModal: () => void;
    updateFormData: (field: keyof VehiculeFormData, value: string) => void;
    saveVehicle: () => Promise<void>;
    confirmDeleteVehicle: () => Promise<void>;
}