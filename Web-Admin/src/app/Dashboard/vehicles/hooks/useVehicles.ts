import { useState, useEffect, useMemo, useCallback } from "react";
import { vehicleService } from "../services/vehicleService";
import { companyService } from "../../company/services/companyService";
import { vehicleTypeService } from "../../vehicleType/services/vehicleTypeService";
import type {Vehicle,VehiculeFormData,UseVehiculesReturn,PaginationData,PaginationConfig,VehiculeStatistics,} from "../types/vehiculeTypes";
import type { Company } from "../../company/types/companyTypes";
import type { VehicleType } from "../../vehicleType/types/vehicleTypes";


const DEFAULT_ITEMS_PER_PAGE = 5;

// Helper function to convert status to Spanish
const getStatusInSpanish = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'INACTIVE':
      return 'Inactivo';
    default:
      return status;
  }
};

const INITIAL_FORM_DATA: VehiculeFormData = {
  licencePlate: "",
  brand: "",
  model: "",
  year: 2023,
  color: "",
  passengerCapacity: 10,
  status: "ACTIVE",
  companyId: 0,
  vehicleTypeId: 0,
  inService: true,
  outboundImage: null,
  returnImage: null,
};

export function useVehicles(): UseVehiculesReturn {
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<VehiculeFormData>(INITIAL_FORM_DATA);

  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Related data
  const [companies, setCompanies] = useState<Company[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);

  const loadVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to load vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRelatedData = useCallback(async () => {
    try {
      const [companiesData, vehicleTypesData] = await Promise.all([
        companyService.getAll(),
        vehicleTypeService.getAll(),
      ]);
      setCompanies(companiesData);
      setVehicleTypes(vehicleTypesData);
    } catch (error) {
      console.error("Failed to load related data:", error);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
    loadRelatedData();
  }, [loadVehicles, loadRelatedData]);

  // Filter vehicles based on search term and status
  const filteredVehicles = useMemo(() => {
    const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

    let filtered = safeVehicles;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(vehicle =>
        vehicle.licencePlate.toLowerCase().includes(searchLower) ||
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "active") {
        filtered = filtered.filter(vehicle => vehicle.status === "ACTIVE");
      } else if (statusFilter === "inactive") {
        filtered = filtered.filter(vehicle => vehicle.status === "INACTIVE");
      }
    }

    return filtered;
  }, [vehicles, searchTerm, statusFilter]);

  // Calculate pagination data
  const pagination = useMemo((): PaginationData => {
    const totalItems = filteredVehicles.length;
    const totalPages = Math.ceil(totalItems / paginationConfig.itemsPerPage);
    const currentPage = Math.min(paginationConfig.page,Math.max(1, totalPages));
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
  }, [filteredVehicles.length, paginationConfig]);

  const paginatedVehicles = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, pagination]);

  // Calculate statistics
  const statistics = useMemo((): VehiculeStatistics => {
    const activeVehicules = vehicles.filter(vehicle => vehicle.status === "ACTIVE").length;
    const inactiveVehicules = vehicles.filter(vehicle => vehicle.status === "INACTIVE").length;

    return {
      totalVehicules: vehicles.length,
      activeVehicules: activeVehicules,
      inactiveVehicules: inactiveVehicules,
    };
  }, [vehicles]);

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

  const openEditModal = useCallback((vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      licencePlate: vehicle.licencePlate,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      passengerCapacity: vehicle.passengerCapacity,
      status: vehicle.status,
      companyId: vehicle.companyId,
      vehicleTypeId: vehicle.vehicleTypeId,
      inService: vehicle.inService,
      outboundImage: null,
      returnImage: null,
    });
    setIsDialogOpen(true);
  }, []);

  const openDeleteModal = useCallback((vehicle: Vehicle) => {
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
    setVehicleToDelete(null);
  }, []);

  // Form data handler
  const updateFormData = useCallback(
    (field: keyof VehiculeFormData, value: string | number | boolean | File | null) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const saveVehicle = useCallback(async () => {
  if (isSaving) return;

  setIsSaving(true);
  try {
    if (
      !formData.licencePlate.trim() ||
      !formData.brand.trim() ||
      !formData.model.trim()
    ) {
      throw new Error("Licence plate, brand and model are required");
    }

    const isDuplicate = vehicles.some(
      (vehicle) =>
        vehicle.licencePlate === formData.licencePlate.trim() &&
        vehicle.id !== editingVehicle?.id
    );

    if (isDuplicate) {
      throw new Error("A vehicle with this license plate already exists");
    }

    let savedVehicle: Vehicle;

    if (editingVehicle) {
      console.log("Actualizando vehículo:", formData);
      savedVehicle = await vehicleService.update(editingVehicle.id, formData);
      console.log("Vehículo actualizado:", savedVehicle);

      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === editingVehicle.id ? savedVehicle : vehicle
        )
      );
    } else {
      console.log("Creando vehículo:", formData);
      savedVehicle = await vehicleService.create(formData);
      console.log("Vehículo creado:", savedVehicle);

      if (!savedVehicle || !savedVehicle.id) {
        console.warn("El backend no devolvió un vehículo válido:", savedVehicle);
      }

      setVehicles((prev) => [...prev, savedVehicle]);
    }

    await loadVehicles();
    closeModal();
  } catch (error) {
    console.error("Error guardando vehículo:", error);
    throw error;
  } finally {
    setIsSaving(false);
  }
}, [vehicles, editingVehicle, formData, closeModal, isSaving, loadVehicles]);


  const confirmDeleteVehicle = useCallback(async () => {
    if (isDeleting || !vehicleToDelete) return;

    setIsDeleting(true);
    try {
      await vehicleService.delete(vehicleToDelete.id);
      await loadVehicles();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [vehicleToDelete, isDeleting, closeDeleteModal, loadVehicles]);

  return {

    filteredVehicles,
    paginatedVehicles,
    searchTerm,
    statusFilter,
    statistics,
    pagination,

    isDialogOpen,
    isDeleteModalOpen,
    editingVehicle,
    vehicleToDelete,
    formData,

    isLoading,
    isDeleting,
    isSaving,

    companies,
    vehicleTypes,

    setStatusFilter,
    setSearchTerm,
    setPage,
    setItemsPerPage,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    closeDeleteModal,
    updateFormData,
    saveVehicle,
    confirmDeleteVehicle,
    getStatusInSpanish,
  };
};
