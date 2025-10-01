
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import type { VehicleAssigmentFormData } from "../types/VehicleAssigmentsType"
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVehicles } from "../../vehicles/hooks/useVehicles";
import { useDrivers } from "../../drivers/hooks/useDrivers";

interface VehicleAssigmentModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: VehicleAssigmentFormData
  onClose: () => void
  onSave: () => void
  onFormChange: (field: keyof VehicleAssigmentFormData, value: string ) => void
  isSaving: boolean;
  errors: Record<string, string>
}

export const VehicleAssigmentModal: React.FC<VehicleAssigmentModalProps> = ({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
  }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { filteredVehicles: vehicles } = useVehicles();
    const { filteredDrivers: drivers } = useDrivers();
  
    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};

      if (!formData.vehicleId) {
        newErrors.vehicleId = 'Vehículo requerido';
      }

      if (!formData.driverId) {
        newErrors.driverId = 'Conductor requerido';
      }

      if (!formData.assignmentStatus.trim()) {
        newErrors.assignmentStatus = 'Estado de asignación requerido';
      } else if (formData.assignmentStatus.trim().length < 2) {
        newErrors.assignmentStatus = 'Estado de asignación debe tener al menos 2 caracteres';
      }

      if (!formData.note.trim()) {
        newErrors.note = 'Nota requerida';
      } else if (formData.note.trim().length < 2) {
        newErrors.note = 'Nota debe tener al menos 2 caracteres';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleInputChange = (field: keyof VehicleAssigmentFormData) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onFormChange(field, value);

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }));
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
      <DialogContent className="bg-zinc-900 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Asignación" : "Nueva Asignación"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle_id" className="text-zinc-400">
                Vehículo *
              </Label>
              <Select
                value={formData.vehicleId ? formData.vehicleId.toString() : ""}
                onValueChange={(value: string) => onFormChange("vehicleId", value)}
              >
                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Seleccione un vehículo" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 min-w-[300px]">
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                      {vehicle.licencePlate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicle_id && (
                <p className="text-sm text-red-500">{errors.vehicle_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver_id" className="text-zinc-400">
                Conductor *
              </Label>
              <Select
                value={formData.driverId ? formData.driverId.toString() : ""}
                onValueChange={(value: string) => onFormChange("driverId", value)}
              >
                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Seleccione un conductor" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 min-w-[300px]">
                  {drivers.map(driver => (
                    <SelectItem key={driver.id} value={driver.id.toString()}>
                      {driver.firstName} {driver.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.driver_id && (
                <p className="text-sm text-red-500">{errors.driver_id}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignmentStatus" className="text-zinc-400">
                Estado *
              </Label>
              <Select
                value={formData.assignmentStatus}
                onValueChange={(value: string) =>
                  onFormChange("assignmentStatus", value)
                }
              >
                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Seleccione el estado" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 min-w-[200px]">
                  <SelectItem value="ACTIVE">Activo</SelectItem>
                  <SelectItem value="INACTIVE">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-zinc-400">
                Nota *
              </Label>
              <textarea
                id="note"
                value={formData.note}
                onChange={(event) => {
                  const value = event.target.value;
                  onFormChange("note", value);
                  if (errors.note) {
                    setErrors(prev => ({ ...prev, note: '' }));
                  }
                }}
                className="w-full bg-zinc-800 border-zinc-700 text-white rounded px-3 py-2 resize-none"
                placeholder="Nota de asignación"
                disabled={isLoading}
                rows={3}
              />
              {errors.note && (
                <p className="text-sm text-red-500">{errors.note}</p>
              )}
            </div>
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
              {isEditing ? "Editar" : "Crear"} Asignación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}