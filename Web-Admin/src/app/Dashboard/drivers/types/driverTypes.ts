
import type { ApiError } from '../services/api/types';

export interface Driver {
  id: number;
  idNumber: string; // This might be userId from API, or needs to be added to API response
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
}

export interface DriverFormData {
  idNumber: string;
  password: string;
  roleId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

  // Error handling
  apiError: ApiError | null;
  clearApiError: () => void;

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
  refetchDrivers: () => Promise<void>;
}