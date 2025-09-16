import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Driver, DriverFormData, DriverStatistics,  UseDriversReturn, PaginationData, PaginationConfig } from '../types/driverTypes';
import { DriversApi } from '../services/api/driverApi';
import type { ApiError } from '../services/api/types';

const INITIAL_FORM_DATA: DriverFormData = {
  name: '',
  identification: '',
};

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useDrivers = (): UseDriversReturn & {
  apiError: ApiError | null;
  clearApiError: () => void;
  refetchDrivers: () => Promise<void>;
} => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<DriverFormData>(INITIAL_FORM_DATA);
  const [statistics, setStatistics] = useState<DriverStatistics>({
    totalDrivers: 0,
    activeDrivers: 0,
    newThisMonth: 0,
  });

  // Pagination state
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  
  // Server pagination data
  const [serverPagination, setServerPagination] = useState({
    total: 0,
    totalPages: 0,
  });
  
  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Error handling
  const [apiError, setApiError] = useState<ApiError | null>(null);

  // Debounced search term for API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const clearApiError = useCallback(() => {
    setApiError(null);
  }, []);

  const handleApiError = useCallback((error: unknown) => {
    if (error && typeof error === 'object' && 'message' in error) {
      setApiError(error as ApiError);
    } else {
      setApiError({
        message: 'Ha ocurrido un error inesperado',
        status: 500,
      });
    }
  }, []);

  // Load drivers from API
  const loadDrivers = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      }

      const response = await DriversApi.getDrivers({
        page: paginationConfig.page,
        limit: paginationConfig.itemsPerPage,
        search: debouncedSearchTerm || undefined,
      });

      setDrivers(response.data);
      setServerPagination({
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      });

      clearApiError();
    } catch (error) {
      handleApiError(error);
      setDrivers([]);
      setServerPagination({ total: 0, totalPages: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [paginationConfig, debouncedSearchTerm, handleApiError, clearApiError]);

  

  // Initial load
  useEffect(() => {
    loadDrivers();
  }, [loadDrivers]);

  // Reload when search term or pagination changes
  useEffect(() => {
    if (!isLoading) {
      loadDrivers(false);
    }
  }, [paginationConfig.page, debouncedSearchTerm]);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setPaginationConfig(prev => ({ ...prev, page: 1 }));
  }, [paginationConfig.itemsPerPage]);

  // Calculate pagination data (now using server data)
  const pagination = useMemo((): PaginationData => {
    const totalItems = serverPagination.total;
    const totalPages = serverPagination.totalPages;
    const currentPage = paginationConfig.page;
    const startIndex = (currentPage - 1) * paginationConfig.itemsPerPage;
    const endIndex = Math.min(startIndex + paginationConfig.itemsPerPage, totalItems);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: paginationConfig.itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [serverPagination, paginationConfig]);

  // For compatibility - filtered and paginated drivers are the same now (server-side filtering)
  const filteredDrivers = drivers;
  const paginatedDrivers = drivers;

  // Pagination handlers
  const setPage = useCallback((page: number) => {
    setPaginationConfig(prev => ({ ...prev, page }));
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setPaginationConfig(prev => ({ 
      ...prev, 
      itemsPerPage, 
      page: 1
    }));
  }, []);

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setEditingDriver(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
    clearApiError();
  }, [clearApiError]);

  const openEditModal = useCallback((driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      identification: driver.identification,
    });
    setIsDialogOpen(true);
    clearApiError();
  }, [clearApiError]);

  const openDeleteModal = useCallback((driver: Driver) => {
    setDriverToDelete(driver);
    setIsDeleteModalOpen(true);
    clearApiError();
  }, [clearApiError]);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingDriver(null);
    setFormData(INITIAL_FORM_DATA);
    clearApiError();
  }, [clearApiError]);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDriverToDelete(null);
    clearApiError();
  }, [clearApiError]);

  // Form data handler
  const updateFormData = useCallback((field: keyof DriverFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearApiError();
  }, [clearApiError]);

  // Save driver (create or update)
  const saveDriver = useCallback(async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    clearApiError();

    try {
      // Client-side validation
      if (!formData.name.trim() || !formData.identification.trim()) {
        throw {
          message: 'El nombre y la identificación son obligatorios',
          status: 400,
        } as ApiError;
      }

      const driverData = {
        name: formData.name.trim(),
        identification: formData.identification.trim(),
      };

      if (editingDriver) {
        await DriversApi.updateDriver(editingDriver.id, driverData);
      } else {
        await DriversApi.createDriver(driverData);
      }

      // Reload data after successful save
      await Promise.all([
        loadDrivers(false),
      ]);

      closeModal();
    } catch (error) {
      handleApiError(error);
      throw error; // Re-throw for component to handle
    } finally {
      setIsSaving(false);
    }
  }, [
    editingDriver, 
    formData, 
    closeModal, 
    isSaving, 
    clearApiError, 
    handleApiError, 
    loadDrivers, 
  ]);

  // Delete driver
  const confirmDeleteDriver = useCallback(async () => {
    if (isDeleting || !driverToDelete) return;
    
    setIsDeleting(true);
    clearApiError();

    try {
      await DriversApi.deleteDriver(driverToDelete.id);
      
      // Reload data after successful delete
      await Promise.all([
        loadDrivers(false),
      ]);

      closeDeleteModal();
      
      // Adjust pagination if necessary
      const newTotalPages = Math.ceil((serverPagination.total - 1) / paginationConfig.itemsPerPage);
      if (paginationConfig.page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [
    driverToDelete, 
    isDeleting, 
    closeDeleteModal, 
    clearApiError, 
    handleApiError, 
    loadDrivers, 
    serverPagination.total, 
    paginationConfig, 
    setPage
  ]);

  // Refetch function for manual refresh
  const refetchDrivers = useCallback(async () => {
    await Promise.all([
      loadDrivers(),
    ]);
  }, [loadDrivers]);

  return {
    // Data
    filteredDrivers,
    paginatedDrivers,
    searchTerm,
    statistics,
    pagination,
    
    // Modal states
    isDialogOpen,
    isDeleteModalOpen,
    editingDriver,
    driverToDelete,
    formData,
    
    // Loading states
    isLoading,
    isDeleting,
    isSaving,
    
    // Actions
    setSearchTerm,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveDriver,
    confirmDeleteDriver,

    apiError,
    clearApiError,
    refetchDrivers,
  };
};