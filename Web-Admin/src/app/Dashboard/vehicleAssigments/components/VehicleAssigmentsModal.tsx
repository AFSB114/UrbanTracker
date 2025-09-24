
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import type { VehicleAssigmentFormData } from "../types/VehicleAssigmentsType"
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const [errors, setErrors] = useState<Partial<VehicleAssigmentFormData>>({});
  
    const validateForm = (): boolean => {
      const newErrors: Partial<VehicleAssigmentFormData> = {};
  
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
          setErrors(prev => ({ ...prev, [field]: undefined }));
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
            {isEditing ? "Editar Asignación" : "Nueva Asignación"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle_id" className="text-zinc-400">
                Número de Vehículo *
              </Label>
              <Input
                id="vehicle_id"
                value={formData.vehicle_id}
                onChange={handleInputChange("vehicle_id")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="ABC-123"
                disabled={isLoading}
              />
              {errors.vehicle_id && (
                <p className="text-sm text-red-500">{errors.vehicle_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver_id" className="text-zinc-400">
                Identificador del Conductor *
              </Label>
              <Input
                id="driver_id"
                value={formData.driver_id}
                onChange={handleInputChange("driver_id")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="ABC-123"
                disabled={isLoading}
              />
              {errors.driver_id && (
                <p className="text-sm text-red-500">{errors.driver_id}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Seleccione el estado" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="Assigned">Asignado</SelectItem>
                  <SelectItem value="Unassigned">Sin Asignar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="note" className="text-zinc-400">
                Nota *
              </Label>
              <Input
                id="note"
                value={formData.note}
                onChange={handleInputChange("note")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Nota de asignación"
                disabled={isLoading}
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