export interface RouteAssignment {
  id: number;
  routeId: number;
  routeNumber: string;
  vehicleId: number;
  vehiclePlate: string;
  driverId?: number;
  note?: string;
  assignmentStatus: 'ACTIVE' | 'INACTIVE';
  assignedAt: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface RouteAssignmentRequest {
  routeId: number;
  vehicleId: number;
  driverId?: number;
  note?: string;
  assignmentStatus: 'ACTIVE' | 'INACTIVE';
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
  note?: string;
  assignmentStatus: 'ACTIVE' | 'INACTIVE';
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
  statusFilter: string;
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
  setStatusFilter: (filter: string) => void;
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