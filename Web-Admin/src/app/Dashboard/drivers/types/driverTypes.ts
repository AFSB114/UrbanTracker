
export interface Driver {
  id: number;
  name: string;
  identification: string;
}

export interface DriverFormData {
  name: string;
  identification: string;
}

export interface DriverStatistics {
  totalDrivers: number;
  activeDrivers: number;
  newThisMonth: number;
}

export interface UseDriversReturn {
  filteredDrivers: Driver[];
  searchTerm: string;
  isDialogOpen: boolean;
  editingDriver: Driver | null;
  formData: DriverFormData;
  statistics: DriverStatistics;
  setSearchTerm: (term: string) => void;
  openCreateModal: () => void;
  openEditModal: (driver: Driver) => void;
  closeModal: () => void;
  updateFormData: (field: keyof DriverFormData, value: string) => void;
  saveDriver: () => Promise<void>;
  deleteDriver: (id: number) => Promise<void>;
}