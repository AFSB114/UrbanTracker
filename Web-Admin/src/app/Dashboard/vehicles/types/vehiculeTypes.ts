
export interface Vehicle {
    id: number;
    licencePlate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    passengerCapacity: number;
    status: string;
    companyId: number;
    vehicleTypeId: number;
    inService: boolean;
}

export interface VehiculeFormData {
    licencePlate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    passengerCapacity: number;
    status: string;
    companyId: number;
    vehicleTypeId: number;
    inService: boolean;
    outboundImage: File | null;
    returnImage: File | null;
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
}

export interface Company {
    id: number;
    name: string;
}

export interface VehicleType {
    id: number;
    name: string;
}

export interface UseVehiculesReturn {
  filteredVehicles: Vehicle[];
  paginatedVehicles: Vehicle[];
  searchTerm: string;
  statusFilter: string;
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

    // Related data
    companies: Company[];
    vehicleTypes: VehicleType[];

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
    updateFormData: (field: keyof VehiculeFormData, value: string | number | boolean | File | null) => void;
    saveVehicle: () => Promise<void>;
    confirmDeleteVehicle: () => Promise<void>;
    getStatusInSpanish: (status: string) => string;
  }