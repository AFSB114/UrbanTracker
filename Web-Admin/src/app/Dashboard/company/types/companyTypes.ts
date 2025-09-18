export interface Company {
    id: number;
    name: string;
    nit: string;
    phone: string;
    email: string;
    country: string;
}

export interface CompanyFormData {
    name: string;
    nit: string;
    phone: string;
    email: string;
    country: string;
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

export interface CompanyStatistics {
    totalCompanies: number;
    activeCompanies: number;
    inactiveCompanies: number;
    newThisMonth: number;
}

export interface UseCompaniesReturn {
    filteredCompanies: Company[];
    paginatedCompanies: Company[];
    searchTerm: string;
    statistics: CompanyStatistics;
    pagination: PaginationData;

    // Modal states
    isDialogOpen: boolean;
    isDeleteModalOpen: boolean;
    editingCompany: Company | null;
    companyToDelete: Company | null;
    formData: CompanyFormData;

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
    openEditModal: (company: Company) => void;
    openDeleteModal: (company: Company) => void;
    closeModal: () => void;
    closeDeleteModal: () => void;
    updateFormData: (field: keyof CompanyFormData, value: string) => void;
    saveCompany: () => Promise<void>;
    confirmDeleteCompany: () => Promise<void>;
}