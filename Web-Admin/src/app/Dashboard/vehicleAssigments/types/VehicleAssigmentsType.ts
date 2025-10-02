
export interface VehicleAssigment {
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  vehicleId: number;
  vehiclePlate: string;
  vehicleName: string;
  driverId: number;
  driverName: string;
  note: string;
  assignmentStatus: string;
}

export interface VehicleAssigmentFormData {
  vehicleId: number;
  driverId: number;
  assignmentStatus: string;
  note: string;
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

export interface VehicleAssigmentsStatistics {
  totalVehicles: number;
}

export interface UseVehicleAssigmentsReturn {
  filteredVehicles: VehicleAssigment[];
  paginatedVehicles: VehicleAssigment[];
  searchTerm: string;
  statusFilter: string;
  statistics: VehicleAssigmentsStatistics;
  pagination: PaginationData;

  // Modal states
  isDialogOpen: boolean;
  isDeleteModalOpen: boolean;
  editingVehicle: VehicleAssigment | null;
  vehicleToDelete: VehicleAssigment | null;
  formData: VehicleAssigmentFormData;

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
  openEditModal: (vehicle: VehicleAssigment) => void;
  openDeleteModal: (vehicle: VehicleAssigment) => void;
  closeModal: () => void;
  closeDeleteModal: () => void;
  updateFormData: (field: keyof VehicleAssigmentFormData, value: string) => void;
  saveVehicleAssigment: () => Promise<void>;
  confirmDeleteVehicleAssigment: () => Promise<void>;
}