import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react";
import type { CompanyFormData } from "../types/companyTypes"

interface CompanyModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: CompanyFormData
  onClose: () => void
  onSave: () => void
  onFormChange: (field: keyof CompanyFormData, value: string ) => void
  isSaving: boolean;
  errors: Record<string, string>
}

export const CompanyModal: React.FC<CompanyModalProps> = ({ 
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
  }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<CompanyFormData>>({});
  
    const validateForm = (): boolean => {
      const newErrors: Partial<CompanyFormData> = {};
 
      if (!formData.name.trim()) {
        newErrors.name = 'Nombre requerido';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Nombre debe tener al menos 2 caracteres';
      }
 
      if (!formData.nit.trim()) {
        newErrors.nit = 'NIT requerido';
      } else if (formData.nit.trim().length < 4) {
        newErrors.nit = 'NIT debe tener al menos 4 caracteres';
      }
 
      if (!formData.email.trim()) {
        newErrors.email = 'Email requerido';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = 'Email debe tener un formato válido';
        }
      }
 
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleInputChange = (field: keyof CompanyFormData) => 
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
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900  text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Empresa" : "Nueva Empresa"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400">
                Nombre *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Nombre de la empresa"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nit" className="text-zinc-400">
                NIT *
              </Label>
              <Input
                id="nit"
                value={formData.nit}
                onChange={handleInputChange("nit")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="NIT de la empresa"
                disabled={isLoading}
              />
              {errors.nit && (
                <p className="text-sm text-red-500">{errors.nit}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-zinc-400">
                Teléfono
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Teléfono de la empresa"
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">
                Email *
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="Email de la empresa"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-zinc-400">
                País
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={handleInputChange("country")}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="País de la empresa"
                disabled={isLoading}
              />
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country}</p>
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
              {isEditing ? "Editar" : "Crear"} Empresa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}