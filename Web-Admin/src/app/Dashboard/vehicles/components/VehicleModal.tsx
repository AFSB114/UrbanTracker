
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import type { VehiculeFormData, Company, VehicleType } from "../types/vehiculeTypes"
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: VehiculeFormData
  onClose: () => void
  onSave: () => void
  onFormChange: (field: keyof VehiculeFormData, value: string | number | boolean) => void
  isSaving: boolean;
  errors: Record<string, string>
  companies: Company[]
  vehicleTypes: VehicleType[]
}

type VehicleStatus = string;


const VEHICLE_STATUSES: VehicleStatus[] = [
  'ACTIVE', 'INACTIVE'
]

export const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
  companies,
  vehicleTypes,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.licencePlate.trim()) {
      newErrors.licencePlate = 'Número de matrícula requerido';
    } else if (formData.licencePlate.trim().length < 4) {
      newErrors.licencePlate = 'Número de matrícula debe tener al menos 4 caracteres';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.licencePlate.trim())) {
      newErrors.licencePlate = 'Número de matrícula debe ser alfanumérico';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Marca requerida';
    } else if (formData.brand.trim().length < 2) {
      newErrors.brand = 'Marca debe tener al menos 2 caracteres';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Modelo requerido';
    } else if (formData.model.trim().length < 2) {
      newErrors.model = 'Modelo debe tener al menos 2 caracteres';
    }

    if (formData.companyId === 0) {
      newErrors.companyId = 'Compañía requerida';
    }

    if (formData.vehicleTypeId === 0) {
      newErrors.vehicleTypeId = 'Tipo de vehículo requerido';
    }

    if (formData.year <= 0) {
      newErrors.year = 'Año debe ser mayor a 0';
    }

    if (formData.passengerCapacity <= 0) {
      newErrors.passengerCapacity = 'Capacidad debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof VehiculeFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
      onFormChange(field, value);

      // Clear error when user starts typing
      if (errors[field as string]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Error cargando conductores:', error);
      // You can add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900  text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Vehiculo" : "Nuevo Vehiculo"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licencePlate" className="text-zinc-400">
                Matrícula *
              </Label>
              <Input
                id="licencePlate"
                value={formData.licencePlate}
                onChange={handleInputChange("licencePlate")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="ABC-123"
                disabled={isLoading}
              />
              {errors.licencePlate && (
                <p className="text-sm text-red-500">{errors.licencePlate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleTypeId" className="text-zinc-400">
                Tipo de Vehículo *
              </Label>
              <Select
                value={`${formData.vehicleTypeId}`}
                onValueChange={(value) => onFormChange("vehicleTypeId", Number(value))}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Seleccione el tipo de vehículo" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleTypeId && (
                <p className="text-sm text-red-500">{errors.vehicleTypeId}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-zinc-400">
                Marca *
              </Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={handleInputChange("brand")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Volvo"
                disabled={isLoading}
              />
              {errors.brand && (
                <p className="text-sm text-red-500">{errors.brand}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-zinc-400">
                Modelo *
              </Label>
              <Input
                id="model"
                value={formData.model}
                onChange={handleInputChange("model")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="FH16"
                disabled={isLoading}
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyId" className="text-zinc-400">
                Compañía *
              </Label>
              <Select
                value={`${formData.companyId}`}
                onValueChange={(value) => onFormChange("companyId", Number(value))}
              >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Seleccione la compañía" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id.toString()}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companyId && (
              <p className="text-sm text-red-500">{errors.companyId}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year" className="text-zinc-400">
              Año *
            </Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={handleInputChange("year")}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="2023"
              disabled={isLoading}
            />
            {errors.year && (
              <p className="text-sm text-red-500">{errors.year}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-zinc-400">
              Color
            </Label>
            <Input
              id="color"
              value={formData.color}
              onChange={handleInputChange("color")}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Rojo"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="passengerCapacity" className="text-zinc-400">
              Capacidad de Pasajeros *
            </Label>
            <Input
              id="passengerCapacity"
              type="number"
              value={formData.passengerCapacity}
              onChange={handleInputChange("passengerCapacity")}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="10"
              disabled={isLoading}
            />
            {errors.passengerCapacity && (
              <p className="text-sm text-red-500">{errors.passengerCapacity}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-zinc-400">
              Estado *
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: VehicleStatus) =>
                onFormChange("status", value)
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {VEHICLE_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inService" className="text-zinc-400">
            En Servicio
          </Label>
          <input
            id="inService"
            type="checkbox"
            checked={formData.inService}
            onChange={(e) => onFormChange("inService", e.target.checked)}
            className="bg-zinc-800 border-zinc-700 text-white"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-white hover:bg-zinc-800"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEditing ? "Editar" : "Crear"} Vehiculo
          </Button>
        </div>
      </form>
    </DialogContent>
    </Dialog >
  );
}