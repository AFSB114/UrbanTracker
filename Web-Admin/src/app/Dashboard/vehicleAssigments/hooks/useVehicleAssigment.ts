import { useState, useEffect, useMemo, useCallback } from "react";
import { vehicleAssigmentService } from "../services/vehicleAssigmentService";
import type { VehicleAssigment, VehicleAssigmentFormData, UseVehicleAssigmentsReturn, PaginationData, PaginationConfig, VehicleAssigmentsStatistics } from "../types/VehicleAssigmentsType";

const INITIAL_FORM_DATA: VehicleAssigmentFormData = {
  vehicleId: 0,
  driverId: 0,
  assignmentStatus: "",
  note: "",
};

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useVehicleAssigments = (): UseVehicleAssigmentsReturn => {

  const [vehicles, setVehicles] = useState<VehicleAssigment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<VehicleAssigment | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<VehicleAssigment | null>(null);
  const [formData, setFormData] = useState<VehicleAssigmentFormData>(INITIAL_FORM_DATA);

  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const loadVehiclesAssignments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await vehicleAssigmentService.getAll();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to load vehicles assignments:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehiclesAssignments();
  }, [loadVehiclesAssignments]);

  const filteredVehicles = useMemo(() => {
    const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

    const searchLower = searchTerm.toLowerCase().trim();

    return vehicles.filter(vehicle => {
      const matchesSearch = !searchTerm.trim() || vehicle.vehiclePlate.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === "all" || vehicle.assignmentStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, searchTerm, statusFilter]);

  // Reset to page 1 when items per page changes or search term changes
  useEffect(() => {
    setPaginationConfig((prev) => ({ ...prev, page: 1 }));
  }, [paginationConfig.itemsPerPage, searchTerm]);

  // Calculate pagination data (now using server data)
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

  // Calculate statistics
  const statistics = useMemo((): VehicleAssigmentsStatistics => {
    return {
      totalVehicles: vehicles.length,
    };
  }, [vehicles.length]);

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
    setEditingVehicle(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  }, []);

  const openEditModal = useCallback((vehicle: VehicleAssigment) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicleId: vehicle.vehicleId,
      driverId: vehicle.driverId,
      assignmentStatus: vehicle.assignmentStatus,
      note: vehicle.note,
    });
    setIsDialogOpen(true);
  }, []);

  const openDeleteModal = useCallback((vehicle: VehicleAssigment) => {
    setVehicleToDelete(vehicle);
    setIsDeleteModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingVehicle(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setVehicleToDelete(null);
  }, []);

  // Form data handler
  const updateFormData = useCallback((field: keyof VehicleAssigment, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveVehicleAssigment = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      // Client-side validation
      if (!formData.vehicleId || !formData.driverId) {
        throw {
          message: "El vehículo y el conductor son obligatorios",
          status: 400,
        }
      }

      const vehicleAssignmentData = {
        vehicleId: Number(formData.vehicleId),
        driverId: Number(formData.driverId),
        assignmentStatus: formData.assignmentStatus.trim(),
        note: formData.note.trim(),
      };

      if (editingVehicle) {
        await vehicleAssigmentService.update(editingVehicle.id, vehicleAssignmentData);
      } else {
        await vehicleAssigmentService.create(vehicleAssignmentData);
      }

      await loadVehiclesAssignments();
      closeModal();
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [editingVehicle, formData, closeModal, isSaving, loadVehiclesAssignments]);

  // Delete vehicle
  const confirmDeleteVehicleAssigment = useCallback(async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await vehicleAssigmentService.delete(vehicleToDelete!.id);
      await loadVehiclesAssignments();
      closeDeleteModal();
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [vehicleToDelete, closeDeleteModal, isDeleting, loadVehiclesAssignments]);

  return {
    // Data
    filteredVehicles,
    paginatedVehicles,
    searchTerm,
    statusFilter,
    statistics,
    pagination,

    // Modal states
    isDialogOpen,
    isDeleteModalOpen,
    editingVehicle,
    vehicleToDelete,
    formData,

    // Loading states
    isLoading,
    isDeleting,
    isSaving,

    // Actions
    setSearchTerm,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveVehicleAssigment,
    confirmDeleteVehicleAssigment,
  };
};