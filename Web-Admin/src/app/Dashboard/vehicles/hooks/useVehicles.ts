import { useState, useEffect, useMemo, useCallback } from "react";
import type {
  Vehicle,
  VehiculeFormData,
  UseVehiculesReturn,
  PaginationData,
  PaginationConfig,
  VehiculeStatistics,
} from "../types/vehiculeTypes";

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    licensePlate: "ABC-123",
    brand: "Volvo",
    model: "FH16",
    type: "Camion",
    status: "Operational",
    driver: "Carlos Mendoza",
    company: "Transporte SA",
  },
  {
    id: 2,
    licensePlate: "DEF-456",
    brand: "Mercedes",
    model: "Sprinter",
    type: "Van",
    status: "En Ruta",
    driver: "María García",
    company: "Transporte SA",
  },
  {
    id: 3,
    licensePlate: "GHI-789",
    brand: "Scania",
    model: "R450",
    type: "Camion",
    status: "Fuera de Servicio",
    driver: "José Rodríguez",
    company: "Transporte SA",
  },
];

const INITIAL_FORM_DATA: VehiculeFormData = {
  licensePlate: "",
  brand: "",
  model: "",
  type: "",
  status: "Operational",
  driver: "",
  company: "",
};

const DEFAULT_ITEMS_PER_PAGE = 5;

export function useVehicles(): UseVehiculesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
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

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setVehicles(MOCK_VEHICLES);
      } catch (error) {
        console.error("Failed to load vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, []);

  // Filter vehicles based on search term
  const filteredVehicles = useMemo(() => {
    if (!searchTerm.trim()) {
      return vehicles;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    if (statusFilter === "all") {
      return vehicles.filter(vehicle =>
        vehicle.licensePlate.toLowerCase().includes(searchLower) ||
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.driver.toLowerCase().includes(searchLower)
      );
    }

    return vehicles.filter(vehicle =>
        vehicle.licensePlate.toLowerCase().includes(searchLower) ||
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.driver.toLowerCase().includes(searchLower)
    );
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
    return {
      totalVehicules: vehicles.length,
      activeVehicules: vehicles.length, 
      inactiveVehicules: vehicles.length,
      newThisMonth: Math.floor(vehicles.length * 0.3), // Mock: 30% are new this month
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

  const openEditModal = useCallback((vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      licensePlate: vehicle.licensePlate,
      brand: vehicle.brand,
      model: vehicle.model,
      type: vehicle.type,
      status: vehicle.status,
      driver: vehicle.driver || "",
      company: vehicle.company || "",
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
    (field: keyof VehiculeFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const saveVehicle = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {

      if (
        !formData.licensePlate.trim() ||
        !formData.brand.trim() ||
        !formData.model.trim() ||
        !formData.type
      ) {
        throw new Error("License plate, brand, model and type are required");
      }

      const isDuplicate = vehicles.some(
        (vehicle) =>
          vehicle.licensePlate === formData.licensePlate.trim() &&
          vehicle.id !== editingVehicle?.id
      );

      if (isDuplicate) {
        throw new Error("A driver with this license plate already exists");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingVehicle) {
        setVehicles((prev) =>
          prev.map((vehicle) =>
            vehicle.id === editingVehicle.id
              ? {
                ...vehicle,
                licensePlate: formData.licensePlate.trim(),
                brand: formData.brand.trim(),
                model: formData.model.trim(),
                type: formData.type.trim(),
                status: formData.status.trim(),
                driver: formData.driver.trim(),
              }
              : vehicle
          )
        );
      } else {
        const newId = Math.max(...vehicles.map((v) => v.id), 0) + 1;
        const newVehicule: Vehicle = {
          id: newId,
          licensePlate: formData.licensePlate.trim(),
          brand: formData.brand.trim(),
          model: formData.model.trim(),
          type: formData.type.trim(),
          status: formData.status.trim(),
          driver: formData.driver.trim(),
          company: formData.company.trim(),
        };
        setVehicles((prev) => [...prev, newVehicule]);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving driver:", error);
      throw error; 
    } finally {
      setIsSaving(false);
    }
  }, [vehicles, editingVehicle, formData, closeModal, isSaving]);

  const confirmDeleteVehicle = useCallback(async () => {
    if (isDeleting || !vehicleToDelete) return;

    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle.id !== vehicleToDelete.id)
      );
      closeDeleteModal();

      const newTotalItems = filteredVehicles.length - 1;
      const newTotalPages = Math.ceil(
        newTotalItems / paginationConfig.itemsPerPage
      );

      if (paginationConfig.page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [vehicleToDelete, isDeleting, closeDeleteModal, filteredVehicles.length, paginationConfig, setPage]);

  return {
    
    filteredVehicles,
    paginatedVehicles,
    searchTerm,
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
  };
};
