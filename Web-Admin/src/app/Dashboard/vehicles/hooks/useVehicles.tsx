import { useState, useMemo } from 'react'

export interface Vehicle {
  id: number
  licensePlate: string
  type: VehicleType
  brand: string
  model: string
  company: string
  status: VehicleStatus
  driver?: string
  mileage: string
}

export type VehicleType = 'Camion' | 'Van' | 'Pickup' | 'Coche' | 'Bus'
export type VehicleStatus = 'Operational' | 'En Ruta' | 'Fuera de Servicio'

export interface VehicleFormData {
  licensePlate: string
  type: VehicleType | ''
  brand: string
  model: string
  company: string
  status: VehicleStatus
  driver?: string
  mileage: string
}

interface UseVehiclesReturn {
  // State
  vehicles: Vehicle[]
  filteredVehicles: Vehicle[]
  statusFilter: string
  searchTerm: string
  isDialogOpen: boolean
  editingVehicle: Vehicle | null
  formData: VehicleFormData
  
  // Statistics
  statistics: {
    total: number
    operational: number
    onRoute: number
    outOfService: number
    operationalPercentage: number
  }
  
  // Actions
  setSearchTerm: (searchTerm: string) => void
  setStatusFilter: (filter: string) => void
  openCreateModal: () => void
  openEditModal: (vehicle: Vehicle) => void
  closeModal: () => void
  updateFormData: (field: keyof VehicleFormData, value: string | number | VehicleType | VehicleStatus) => void
  saveVehicle: () => boolean
  deleteVehicle: (id: number) => void
}

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 1,
    licensePlate: "ABC-123",
    type: "Camion",
    brand: "Volvo",
    model: "FH16",
    company: "Transporte SA",
    status: "Operational",
    driver: "Carlos Mendoza",
    mileage: "125,000 km",
  },
  {
    id: 2,
    licensePlate: "DEF-456",
    type: "Van",
    brand: "Mercedes",
    model: "Sprinter",
    company: "Logistica Ltda",
    status: "En Ruta",
    driver: "María García",
    mileage: "89,500 km",
  },
  {
    id: 3,
    licensePlate: "GHI-789",
    type: "Camion",
    brand: "Scania",
    model: "R450",
    company: "Carga Express",
    status: "Fuera de Servicio",
    driver: "José Rodríguez",
    mileage: "180,000 km",
  },
]

const INITIAL_FORM_DATA: VehicleFormData = {
  licensePlate: "",
  type: "",
  brand: "",
  model: "",
  company: "",
  status: "Operational",
  driver: "",
  mileage: "",
}

export function useVehicles(): UseVehiclesReturn {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [formData, setFormData] = useState<VehicleFormData>(INITIAL_FORM_DATA)

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch = searchTerm === "" || [
        vehicle.licensePlate,
        vehicle.brand,
        vehicle.model,
        vehicle.driver || ""
      ].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )

      const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [vehicles, searchTerm, statusFilter])

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = vehicles.length
    const operational = vehicles.filter(v => v.status === "Operational").length
    const onRoute = vehicles.filter(v => v.status === "En Ruta").length
    const outOfService = vehicles.filter(v => v.status === "Fuera de Servicio").length
    const operationalPercentage = total > 0 ? Math.round((operational / total) * 100) : 0

    return {
      total,
      operational,
      onRoute,
      outOfService,
      operationalPercentage
    }
  }, [vehicles])

  // Generate new ID
  const generateNewId = (): number => {
    return vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1
  }

  // Validate form
  const validateForm = (): boolean => {
    return !!(formData.licensePlate.trim() && formData.brand.trim() && formData.model.trim() && formData.type)
  }

  // Check if license plate exists
  const licensePlateExists = (licensePlate: string, currentId?: number): boolean => {
    return vehicles.some(v => 
      v.licensePlate.toLowerCase() === licensePlate.toLowerCase() && v.id !== currentId
    )
  }

  const openCreateModal = () => {
    setEditingVehicle(null)
    setFormData(INITIAL_FORM_DATA)
    setIsDialogOpen(true)
  }

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      licensePlate: vehicle.licensePlate,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      company: vehicle.company,
      status: vehicle.status,
      driver: vehicle.driver || "",
      mileage: vehicle.mileage,
    })
    setIsDialogOpen(true)
  }

  const closeModal = () => {
    setIsDialogOpen(false)
    setEditingVehicle(null)
    setFormData(INITIAL_FORM_DATA)
  }

  const updateFormData = (field: keyof VehicleFormData, value: string | number | VehicleType | VehicleStatus) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveVehicle = (): boolean => {
    if (!validateForm()) {
      return false
    }

    if (licensePlateExists(formData.licensePlate, editingVehicle?.id)) {
      alert('A vehicle with this license plate already exists')
      return false
    }

    const vehicleData: Vehicle = {
      id: editingVehicle?.id ?? generateNewId(),
      licensePlate: formData.licensePlate.trim().toUpperCase(),
      type: formData.type as VehicleType,
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      company: formData.company.trim(),
      status: formData.status,
      driver: formData.driver?.trim() || undefined,
      mileage: formData.mileage.trim(),
    }

    if (editingVehicle) {
      // Edit existing vehicle
      setVehicles(prev => 
        prev.map(v => v.id === editingVehicle.id ? vehicleData : v)
      )
    } else {
      // Create new vehicle
      setVehicles(prev => [...prev, vehicleData])
    }

    closeModal()
    return true
  }

  const deleteVehicle = (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(prev => prev.filter(v => v.id !== id))
    }
  }

  return {
    // State
    vehicles,
    filteredVehicles,
    statusFilter,
    searchTerm,
    isDialogOpen,
    editingVehicle,
    formData,
    
    // Statistics
    statistics,
    
    // Actions
    setSearchTerm,
    setStatusFilter,
    openCreateModal,
    openEditModal,
    closeModal,
    updateFormData,
    saveVehicle,
    deleteVehicle,
  }
}