import { useState, useEffect, useMemo, useCallback } from 'react';
import { driverService } from '../services/driverService';
import type { Driver, DriverFormData, DriverStatistics, UseDriversReturn, PaginationData, PaginationConfig } from '../types/driverTypes';
import type { ApiError } from '../services/api/types';



const INITIAL_FORM_DATA: DriverFormData = {
  idNumber: '',
  password: '',
  roleId: 2,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
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
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const loadDrivers = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await driverService.getAll();
      setDrivers(data);
    } catch (error) {
      console.error("Failed to load drivers:", error);
      setApiError({
        message: error instanceof Error ? error.message : "Error al cargar conductores",
        status: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
  loadDrivers();
  }, [loadDrivers]);

  const filteredDrivers = useMemo(() => {
    const safeDrivers = Array.isArray(drivers) ? drivers : [];

    if (!searchTerm.trim()) {
      return safeDrivers;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    if (statusFilter === "all") {
      return drivers.filter(driver =>
        `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchLower) ||
        driver.idNumber.toLowerCase().includes(searchLower) ||
        driver.email.toLowerCase().includes(searchLower) ||
        driver.phone.toLowerCase().includes(searchLower)
      );
    }

    return drivers.filter(driver =>
      `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchLower) ||
      driver.idNumber.toLowerCase().includes(searchLower) ||
      driver.email.toLowerCase().includes(searchLower) ||
      driver.phone.toLowerCase().includes(searchLower)
    );
  }, [drivers, searchTerm, statusFilter]);


  useEffect(() => {
    setPaginationConfig((prev) => ({ ...prev, page: 1 }));
  }, [paginationConfig.itemsPerPage, searchTerm]);

  // Calculate pagination data (now using server data)
  const pagination = useMemo((): PaginationData => {
    const totalItems = filteredDrivers.length;
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
  }, [filteredDrivers.length, paginationConfig]);

  const paginatedDrivers = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredDrivers.slice(startIndex, endIndex);
  }, [filteredDrivers, pagination]);

  // Calculate statistics
  const statistics = useMemo((): DriverStatistics => {
    return {
      totalDrivers: drivers.length,
      activeDrivers: drivers.length,
      newThisMonth: Math.floor(drivers.length * 0.3), 
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
      idNumber: driver.idNumber,
      password: '', // Password not stored in Driver, so leave empty for edit
      roleId: 2,
      firstName: driver.firstName,
      lastName: driver.lastName,
      email: driver.email,
      phone: driver.phone,
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

  const clearApiError = useCallback(() => {
    setApiError(null);
  }, []);

  const refetchDrivers = useCallback(async () => {
    await loadDrivers();
  }, [loadDrivers]);

  const saveDriver = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);
    setApiError(null);

    try {
      // Client-side validation
      if (!formData.idNumber.trim() || !formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        throw {
          message: "Todos los campos son obligatorios",
          status: 400,
        }
      }

      const driverData = {
        idNumber: formData.idNumber.trim(),
        password: formData.password,
        roleId: formData.roleId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      };

      if (editingDriver) {
        await driverService.update(editingDriver.id, driverData);
      } else {
        await driverService.create(driverData);
      }

      await loadDrivers();
      closeModal();
    } catch (error) {
      const err = error as { message?: string; status?: number };
      setApiError({
        message: err.message || "Error al guardar conductor",
        status: err.status || 500,
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [editingDriver, formData, closeModal, isSaving, loadDrivers]);

  // Delete driver
  const confirmDeleteDriver = useCallback(async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setApiError(null);

    try {
      await driverService.delete(driverToDelete!.id);
      await loadDrivers();
      closeDeleteModal();
    } catch (error) {
      const err = error as { message?: string; status?: number };
      setApiError({
        message: err.message || "Error al eliminar conductor",
        status: err.status || 500,
      });
      throw error; // Re-throw for component to handle
    } finally {
      setIsDeleting(false);
    }
  }, [driverToDelete, closeDeleteModal, isDeleting, loadDrivers]);

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

    // Error handling
    apiError,
    clearApiError,

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
    refetchDrivers,
  };
};