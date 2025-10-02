export interface RouteAssignment {
  id: number;
  routeId: number;
  vehicleId: number;
  driverId?: number;
  assignedAt: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface RouteAssignmentRequest {
  routeId: number;
  vehicleId: number;
  driverId?: number;
}

export interface RouteAssignmentStatistics {
  totalAssignments: number;
  activeAssignments: number;
  inactiveAssignments: number;
}

export interface RouteAssignmentFormData {
  routeId: number;
  vehicleId: number;
  driverId?: number;
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

export interface UseRouteAssignmentsReturn {
  // Data
  filteredAssignments: RouteAssignment[];
  paginatedAssignments: RouteAssignment[];
  searchTerm: string;
  statistics: RouteAssignmentStatistics;
  pagination: PaginationData;

  // Modal states
  isDialogOpen: boolean;
  isDeleteModalOpen: boolean;
  editingAssignment: RouteAssignment | null;
  assignmentToDelete: RouteAssignment | null;
  formData: RouteAssignmentFormData;

  // Loading states
  isLoading: boolean;
  isDeleting: boolean;
  isSaving: boolean;

  // Actions
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  openCreateModal: () => void;
  openEditModal: (assignment: RouteAssignment) => void;
  openDeleteModal: (assignment: RouteAssignment) => void;
  closeModal: () => void;
  closeDeleteModal: () => void;
  updateFormData: (field: keyof RouteAssignmentFormData, value: string | number | undefined) => void;
  saveRouteAssignment: () => Promise<void>;
  confirmDeleteRouteAssignment: () => Promise<void>;
}