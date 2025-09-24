
export interface VehicleType {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface VehicleTypeFormData {
  name: string;
  description: string;
  active: boolean;
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

export interface VehicleTypesStatistics {
  totalVehicles: number;
  newThisMonth: number;
}

export interface UseVehicleTypesReturn {
  filteredVehicles: VehicleType[];
  paginatedVehicles: VehicleType[];
  searchTerm: string;
  statistics: VehicleTypesStatistics;
  pagination: PaginationData;
  
  // Modal states
  isDialogOpen: boolean;
  isDeleteModalOpen: boolean;
  editingVehicleType: VehicleType | null;
  vehicleTypeToDelete: VehicleType | null;
  formData: VehicleTypeFormData;
  
  // Loading states
  isLoading: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  openCreateModal: () => void;
  openEditModal: (vehicleType: VehicleType) => void;
  openDeleteModal: (vehicleType: VehicleType) => void;
  closeModal: () => void;
  closeDeleteModal: () => void;
  updateFormData: (field: keyof VehicleTypeFormData, value: string) => void;
  saveVehicleType: () => Promise<void>;
  confirmDeleteVehicleType: () => Promise<void>;
}