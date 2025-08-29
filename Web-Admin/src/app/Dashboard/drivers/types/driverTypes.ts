
export interface Driver {
  id: number;
  name: string;
  identification: string;
}

export interface DriverFormData {
  name: string;
  identification: string;
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

export interface DriverStatistics {
  totalDrivers: number;
  activeDrivers: number;
  newThisMonth: number;
}

export interface UseDriversReturn {
  filteredDrivers: Driver[];
  paginatedDrivers: Driver[];
  searchTerm: string;
  statistics: DriverStatistics;
  pagination: PaginationData;
  
  // Modal states
  isDialogOpen: boolean;
  isDeleteModalOpen: boolean;
  editingDriver: Driver | null;
  driverToDelete: Driver | null;
  formData: DriverFormData;
  
  // Loading states
  isLoading: boolean;
  isDeleting: boolean;
  isSaving: boolean;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  openCreateModal: () => void;
  openEditModal: (driver: Driver) => void;
  openDeleteModal: (driver: Driver) => void;
  closeModal: () => void;
  closeDeleteModal: () => void;
  updateFormData: (field: keyof DriverFormData, value: string) => void;
  saveDriver: () => Promise<void>;
  confirmDeleteDriver: () => Promise<void>;
}