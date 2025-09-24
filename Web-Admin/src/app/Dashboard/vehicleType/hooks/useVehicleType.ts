import { useState, useEffect, useMemo, useCallback } from "react";
import { vehicleTypeService } from "../services/vehicleTypeService";
import type { VehicleType, VehicleTypeFormData, UseVehicleTypesReturn, PaginationData, PaginationConfig, VehicleTypesStatistics } from "../types/vehicleTypes";

const INITIAL_FORM_DATA: VehicleTypeFormData = {
  name: "",
  description: "",
  active: true,
};

const DEFAULT_ITEMS_PER_PAGE = 5;

function useVehicleType(): UseVehicleTypesReturn {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [vehicleTypeToDelete, setVehicleTypeToDelete] = useState<VehicleType | null>(null);
  const [editingVehicleType, setEditingVehicleType] = useState<VehicleType | null>(null);
  const [formData, setFormData] = useState<VehicleTypeFormData>(INITIAL_FORM_DATA);
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const loadVehicleTypes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await vehicleTypeService.getAll();
      setVehicleTypes(data);
    } catch (error) {
      console.error("Failed to load vehicle types:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicleTypes();
  }, [loadVehicleTypes]);

  const filteredVehicles = useMemo(() => {
    const safeVehicleTypes = Array.isArray(vehicleTypes) ? vehicleTypes : [];
    if (!searchTerm.trim()) {
      return safeVehicleTypes;
    }
    const searchLower = searchTerm.toLowerCase().trim();
    return vehicleTypes.filter(vehicleType =>
      vehicleType.name.toLowerCase().includes(searchLower) ||
      vehicleType.description.toLowerCase().includes(searchLower)
    );
  }, [vehicleTypes, searchTerm]);

  useEffect(() => {
    setPaginationConfig((prev) => ({ ...prev, page: 1 }));
  }, [paginationConfig.itemsPerPage]);

  const pagination = useMemo((): PaginationData => {
    const totalItems = filteredVehicles.length;
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
  }, [filteredVehicles.length, paginationConfig]);

  const paginatedVehicles = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, pagination]);

  const statistics = useMemo((): VehicleTypesStatistics => {
    return {
      totalVehicles: vehicleTypes.length,
      newThisMonth: Math.floor(vehicleTypes.length * 0.3),
    };
  }, [vehicleTypes.length]);

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

  const openCreateModal = useCallback(() => {
    setEditingVehicleType(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  }, []);

  const openEditModal = useCallback((vehicleType: VehicleType) => {
    setEditingVehicleType(vehicleType);
    setFormData({
      name: vehicleType.name,
      description: vehicleType.description,
      active: vehicleType.active,
    });
    setIsDialogOpen(true);
  }, []);

  const openDeleteModal = useCallback((vehicleType: VehicleType) => {
    setVehicleTypeToDelete(vehicleType);
    setIsDeleteModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingVehicleType(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setVehicleTypeToDelete(null);
  }, []);

  const updateFormData = useCallback((field: keyof VehicleTypeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveVehicleType = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (!formData.name.trim()) {
        throw { message: "El nombre es obligatorio" };
      }
      const vehicleTypeData = {
        id: editingVehicleType ? editingVehicleType.id : 0,
        name: formData.name.trim(),
        description: formData.description.trim(),
        active: formData.active,
      };
      if (editingVehicleType) {
        await vehicleTypeService.update(editingVehicleType.id, vehicleTypeData);
      } else {
        await vehicleTypeService.create(vehicleTypeData);
      }

      await loadVehicleTypes();
      closeModal();
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [editingVehicleType, formData, closeModal, isSaving, loadVehicleTypes]);

  const confirmDeleteVehicleType = useCallback(async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      if (vehicleTypeToDelete) {
        await vehicleTypeService.delete(vehicleTypeToDelete.id);
        closeDeleteModal();
      }
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [vehicleTypeToDelete, closeDeleteModal, isDeleting, loadVehicleTypes]);

  return {
    filteredVehicles,
    paginatedVehicles,
    searchTerm,
    statistics,
    pagination,
    isDialogOpen,
    isDeleteModalOpen,
    editingVehicleType,
    vehicleTypeToDelete,
    formData,
    isLoading,
    isDeleting,
    isSaving,
    setSearchTerm,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveVehicleType,
    confirmDeleteVehicleType,
  };
}

export default useVehicleType;
