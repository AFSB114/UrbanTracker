import { useState, useEffect, useMemo, useCallback } from "react";
import { routeAssignmentService } from "../services/routeAssignmentService";
import type { RouteAssignment, RouteAssignmentFormData, UseRouteAssignmentsReturn, PaginationData, PaginationConfig, RouteAssignmentStatistics } from "../types/routeAssignmentTypes";

const INITIAL_FORM_DATA: RouteAssignmentFormData = {
  routeId: 0,
  vehicleId: 0,
  driverId: undefined,
};

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useRouteAssignments = (): UseRouteAssignmentsReturn => {

  const [assignments, setAssignments] = useState<RouteAssignment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<RouteAssignment | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<RouteAssignment | null>(null);
  const [formData, setFormData] = useState<RouteAssignmentFormData>(INITIAL_FORM_DATA);

  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const loadRouteAssignments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await routeAssignmentService.getAll();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to load route assignments:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRouteAssignments();
  }, [loadRouteAssignments]);

  const filteredAssignments = useMemo(() => {
    const safeAssignments = Array.isArray(assignments) ? assignments : [];

    if (!searchTerm.trim()) {
      return safeAssignments;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    return assignments.filter(assignment =>
      // Aquí puedes agregar filtros por nombre de ruta, vehículo, etc.
      // Por ahora, solo búsqueda básica
      assignment.id.toString().includes(searchLower)
    );
  }, [assignments, searchTerm]);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setPaginationConfig((prev) => ({ ...prev, page: 1 }));
  }, [paginationConfig.itemsPerPage]);

  // Calculate pagination data
  const pagination = useMemo((): PaginationData => {
    const totalItems = assignments.length;
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
  }, [assignments.length, paginationConfig]);

  const paginatedAssignments = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return assignments.slice(startIndex, endIndex);
  }, [assignments, pagination]);

  // Calculate statistics
  const statistics = useMemo((): RouteAssignmentStatistics => {
    return {
      totalAssignments: assignments.length,
      activeAssignments: assignments.filter(a => a.active).length,
      inactiveAssignments: assignments.length - assignments.filter(a => a.active).length,
    };
  }, [assignments]);

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
    setEditingAssignment(null);
    setFormData(INITIAL_FORM_DATA);
    setIsDialogOpen(true);
  }, []);

  const openEditModal = useCallback((assignment: RouteAssignment) => {
    setEditingAssignment(assignment);
    setFormData({
      routeId: assignment.routeId,
      vehicleId: assignment.vehicleId,
      driverId: assignment.driverId,
    });
    setIsDialogOpen(true);
  }, []);

  const openDeleteModal = useCallback((assignment: RouteAssignment) => {
    setAssignmentToDelete(assignment);
    setIsDeleteModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsDialogOpen(false);
    setEditingAssignment(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setAssignmentToDelete(null);
  }, []);

  // Form data handler
  const updateFormData = useCallback((field: keyof RouteAssignmentFormData, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveRouteAssignment = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      // Client-side validation
      if (!formData.routeId || !formData.vehicleId) {
        throw {
          message: "La ruta y el vehículo son obligatorios",
          status: 400,
        }
      }

      const routeAssignmentData = {
        routeId: Number(formData.routeId),
        vehicleId: Number(formData.vehicleId),
        driverId: formData.driverId ? Number(formData.driverId) : undefined,
      };

      if (editingAssignment) {
        await routeAssignmentService.update(editingAssignment.id, routeAssignmentData);
      } else {
        await routeAssignmentService.create(routeAssignmentData);
      }

      await loadRouteAssignments();
      closeModal();
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [editingAssignment, formData, closeModal, isSaving, loadRouteAssignments]);

  // Delete assignment
  const confirmDeleteRouteAssignment = useCallback(async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await routeAssignmentService.delete(assignmentToDelete!.id);
      await loadRouteAssignments();
      closeDeleteModal();
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [assignmentToDelete, closeDeleteModal, isDeleting, loadRouteAssignments]);

  return {
    // Data
    filteredAssignments,
    paginatedAssignments,
    searchTerm,
    statistics,
    pagination,

    // Modal states
    isDialogOpen,
    isDeleteModalOpen,
    editingAssignment,
    assignmentToDelete,
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
    saveRouteAssignment,
    confirmDeleteRouteAssignment,
  };
};