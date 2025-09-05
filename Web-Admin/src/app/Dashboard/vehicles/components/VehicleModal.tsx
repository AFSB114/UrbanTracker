
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import type { VehiculeFormData } from "../types/vehiculeTypes"
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VehicleModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: VehiculeFormData
  onClose: () => void
  onSave: () => void
  onFormChange: (field: keyof VehiculeFormData, value: string ) => void
  isSaving: boolean;
  errors: Record<string, string>
}

type VehicleType = string;
type VehicleStatus = string;

const VEHICLE_TYPES: VehicleType[] = [
  'Camion', 'Van', 'Pickup', 'Coche', 'Bus'
]

const VEHICLE_STATUSES: VehicleStatus[] = [
  'Operational', 'En Ruta', 'Fuera de Servicio'
]

export const VehicleModal: React.FC<VehicleModalProps> = ({ 
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
  }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<VehiculeFormData>>({});
  
    const validateForm = (): boolean => {
      const newErrors: Partial<VehiculeFormData> = {};
  
      if (!formData.licensePlate.trim()) {
        newErrors.licensePlate = 'Número de matrícula requerido';
      } else if (formData.licensePlate.trim().length < 4) {
        newErrors.licensePlate = 'Número de matrícula debe tener al menos 4 caracteres';
      } else if (!/^[a-zA-Z0-9]+$/.test(formData.licensePlate.trim())) {
        newErrors.licensePlate = 'Número de matrícula debe ser alfanumérico';
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
  
      if (!formData.type.trim()) {
        newErrors.type = 'Tipo requerido';
      } else if (formData.type.trim().length < 2) {
        newErrors.type = 'Tipo debe tener al menos 2 caracteres';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleInputChange = (field: keyof VehiculeFormData) => 
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
      <DialogContent className="bg-gray-900  text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Vehiculo" : "Nuevo Vehiculo"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licensePlate" className="text-gray-400">
                Matrícula *
              </Label>
              <Input
                id="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange('licensePlate')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="ABC-123"
                disabled={isLoading}
              />
              {errors.licensePlate && (
              <p className="text-sm text-red-500">{errors.licensePlate}</p>
            )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-400">
                Tipo *
              </Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: VehicleType) => onFormChange('type', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Seleccione el tipo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {VEHICLE_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand" className="text-gray-400">
                Marca *
              </Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={handleInputChange('brand')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Volvo"
                disabled={isLoading}
              />
              {errors.brand && (
              <p className="text-sm text-red-500">{errors.brand}</p>
            )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model" className="text-gray-400">
                Modelo *
              </Label>
              <Input
                id="model"
                value={formData.model}
                onChange={handleInputChange('model')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="FH16"
                disabled={isLoading}
              />
              {errors.model && (
              <p className="text-sm text-red-500">{errors.model}</p>
            )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-400">
                Compañia *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleInputChange('company')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Transporte SA"
                disabled={isLoading}
              />
              {errors.company && (
              <p className="text-sm text-red-500">{errors.company}</p>
            )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-400">
                Estado *
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: VehicleStatus) => onFormChange('status', value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {VEHICLE_STATUSES.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driver" className="text-gray-400">
                Conductor
              </Label>
              <Input
                id="driver"
                value={formData.driver}
                onChange={handleInputChange('driver')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Nombre del conductor"
                disabled={isLoading}
              />
              {errors.driver && (
              <p className="text-sm text-red-500">{errors.driver}</p>
            )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-white hover:bg-gray-800"
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
    </Dialog>
  )
}