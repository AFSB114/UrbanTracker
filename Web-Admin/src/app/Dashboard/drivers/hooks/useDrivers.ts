import { useState, useEffect, useMemo, useCallback } from 'react';
import { driverService } from '../services/driverService';
import type { Driver, DriverFormData, DriverStatistics,  UseDriversReturn, PaginationData, PaginationConfig } from '../types/driverTypes';



const INITIAL_FORM_DATA: DriverFormData = {
  name: '',
  identification: '',
};

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useDrivers = (): UseDriversReturn => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<DriverFormData>(INITIAL_FORM_DATA);


  // Pagination state
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  
  useEffect(() => {
      const loadDrivers = async () => {
        setIsLoading(true);
        try {
          const data = await driverService.getAll();
          setDrivers(data);
        } catch (error) {
          console.error("Failed to load drivers:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      loadDrivers();
    }, []);

    const filteredDrivers = useMemo(() => {
      const safeDrivers = Array.isArray(drivers) ? drivers : [];
    
      if (!searchTerm.trim()) {
        return safeDrivers;
      }
    
      const searchLower = searchTerm.toLowerCase().trim();
    
      if (statusFilter === "all") {
        return drivers.filter(driver =>
          driver.name.toLowerCase().includes(searchLower) ||
          driver.identification.toLowerCase().includes(searchLower)
        );
      }
    
      return drivers.filter(driver =>
          driver.name.toLowerCase().includes(searchLower) ||
          driver.identification.toLowerCase().includes(searchLower)
      );
    }, [drivers, searchTerm, statusFilter]);
    
    // Reset to page 1 when items per page changes
    useEffect(() => {
      setPaginationConfig((prev) => ({ ...prev, page: 1 }));
    }, [paginationConfig.itemsPerPage]);
  
    // Calculate pagination data (now using server data)
    const pagination = useMemo((): PaginationData => {
      const totalItems = drivers.length;
      const totalPages = Math.ceil(totalItems / paginationConfig.itemsPerPage);
      const currentPage = Math.min(paginationConfig.page, Math.max(1, totalPages));
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
    }, [drivers.length, paginationConfig]);
  
    const paginatedDrivers = useMemo(() => {
      const { startIndex, endIndex } = pagination;
      return drivers.slice(startIndex, endIndex);
    }, [drivers, pagination]);
  
    // Calculate statistics
    const statistics = useMemo((): DriverStatistics => {
      return {
        totalDrivers: drivers.length,
        activeDrivers: drivers.length,
        newThisMonth: Math.floor(drivers.length * 0.3), // Mock: 30% are new this month
      };
    }, [drivers.length]);
  
    const setPage = useCallback((page: number) => {
      setPaginationConfig((prev) => ({ ...prev, page }));
    }, []);
  
    const setItemsPerPage = useCallback((itemsPerPage: number) => {
      setPaginationConfig((prev) => ({
        ...prev,
        itemsPerPage,
        page: 1,
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
      setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);
  
    const saveDriver = useCallback(async () => {
      if (isSaving) return;
      
      setIsSaving(true);
      
      try {
        // Client-side validation
        if (!formData.name.trim() || !formData.identification.trim()) {
          throw {
            message: "El nombre y la identificación son obligatorios",
            status: 400,
          } 
        }
  
        const driverData = {
          name: formData.name.trim(),
          identification: formData.identification.trim(),
        };
  
        if (editingDriver) {
          await driverService.update(editingDriver.id, driverData);
        } else {
          await driverService.create(driverData);
        }
  
  
        closeModal();
      } catch (error) {
        throw error; // Re-throw for component to handle
      } finally {
        setIsSaving(false);
      }
    }, [editingDriver,formData,closeModal,isSaving]);
  
    // Delete driver
      const confirmDeleteDriver = useCallback(async () => {
        if (isDeleting) return;
      
        setIsDeleting(true);
      
        try {
          await driverService.delete(driverToDelete!.id);
          closeDeleteModal();
        } catch (error) {
          throw error; // Re-throw for component to handle
        } finally {
          setIsDeleting(false);
        }
      }, [driverToDelete, closeDeleteModal, isDeleting]);
  
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