import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Driver, DriverFormData, DriverStatistics,  UseDriversReturn, PaginationData, PaginationConfig } from '../types/driverTypes';

const MOCK_DRIVERS: Driver[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    identification: "12345678",
  },
  {
    id: 2,
    name: "María García",
    identification: "87654321",
  },
  {
    id: 3,
    name: "José Rodríguez",
    identification: "11223344",
  },
];

const INITIAL_FORM_DATA: DriverFormData = {
  name: '',
  identification: '',
};

const DEFAULT_ITEMS_PER_PAGE = 5;


export const useDrivers = (): UseDriversReturn => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<DriverFormData>(INITIAL_FORM_DATA);

  // Pagination state
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  
  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Load initial drivers
  useEffect(() => {
    const loadDrivers = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setDrivers(MOCK_DRIVERS);
      } catch (error) {
        console.error('Failed to load drivers:', error);
      }finally{
        setIsLoading(false);
      }
    };

    loadDrivers();
  }, []);

  // Filter drivers based on search term
  const filteredDrivers = useMemo(() => {
    if (!searchTerm.trim()) {
      return drivers;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    return drivers.filter(driver => 
      driver.name.toLowerCase().includes(searchLower) ||
      driver.identification.toLowerCase().includes(searchLower)
    );
  }, [drivers, searchTerm]);

  // Calculate pagination data
  const pagination = useMemo((): PaginationData => {
    const totalItems = filteredDrivers.length;
    const totalPages = Math.ceil(totalItems / paginationConfig.itemsPerPage);
    const currentPage = Math.min(paginationConfig.page, Math.max(1, totalPages));
    const startIndex = (currentPage - 1) * paginationConfig.itemsPerPage;
    const endIndex = startIndex + paginationConfig.itemsPerPage;

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: paginationConfig.itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [filteredDrivers.length, paginationConfig]);

  // Get paginated drivers
  const paginatedDrivers = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredDrivers.slice(startIndex, endIndex);
  }, [filteredDrivers, pagination]);

  // Calculate statistics
  const statistics = useMemo((): DriverStatistics => {
    return {
      totalDrivers: drivers.length,
      activeDrivers: drivers.length, // All drivers are considered active in this simple version
      newThisMonth: Math.floor(drivers.length * 0.3), // Mock: 30% are new this month
    };
  }, [drivers.length]);

  // Reset pagination when search term changes
  useEffect(() => {
    setPaginationConfig(prev => ({ ...prev, page: 1 }));
  }, [searchTerm]);

  // Pagination handlers
  const setPage = useCallback((page: number) => {
    setPaginationConfig(prev => ({ ...prev, page }));
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setPaginationConfig(prev => ({ 
      ...prev, 
      itemsPerPage, 
      page: 1 // Reset to first page when changing items per page
    }));
  }, []);

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setEditingDriver(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  }, []);

  const openEditModal = useCallback((driver: Driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name,
      identification: driver.identification,
    });
    setIsDialogOpen(true);
  }, []);

  const openDeleteModal = useCallback((driver: Driver) => {
    setDriverToDelete(driver);
    setIsDeleteModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingDriver(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDriverToDelete(null);
  }, []);

  // Form data handler
  const updateFormData = useCallback((field: keyof DriverFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Save driver (create or update)
  const saveDriver = useCallback(async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      // Validate form
      if (!formData.name.trim() || !formData.identification.trim()) {
        throw new Error('Name and identification are required');
      }

      // Check for duplicate identification
      const isDuplicate = drivers.some(driver => 
        driver.identification === formData.identification.trim() && 
        driver.id !== editingDriver?.id
      );

      if (isDuplicate) {
        throw new Error('A driver with this identification already exists');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingDriver) {
        // Update existing driver
        setDrivers(prev =>
          prev.map(driver =>
            driver.id === editingDriver.id
              ? {
                  ...driver,
                  name: formData.name.trim(),
                  identification: formData.identification.trim(),
                }
              : driver
          )
        );
      } else {
        // Create new driver
        const newId = Math.max(...drivers.map(d => d.id), 0) + 1;
        const newDriver: Driver = {
          id: newId,
          name: formData.name.trim(),
          identification: formData.identification.trim(),
        };
        setDrivers(prev => [...prev, newDriver]);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving driver:', error);
      throw error; // Re-throw for component to handle
    } finally {
      setIsSaving(false);
    }
  }, [drivers, editingDriver, formData, closeModal, isSaving]);

  const confirmDeleteDriver = useCallback(async () => {
    if (isDeleting || !driverToDelete) return;
    
    setIsDeleting(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDrivers(prev => prev.filter(driver => driver.id !== driverToDelete.id));
      closeDeleteModal();
      
      const newTotalItems = filteredDrivers.length - 1;
      const newTotalPages = Math.ceil(newTotalItems / paginationConfig.itemsPerPage);
      
      if (paginationConfig.page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [driverToDelete, isDeleting, closeDeleteModal, filteredDrivers.length, paginationConfig, setPage]);

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
  };
};