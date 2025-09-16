// components/drivers/DriverModal.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter,  DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Loader2, User, CreditCard, AlertTriangle } from "lucide-react";
import type { DriverFormData } from "../types/driverTypes";
import type { ApiError } from "../services/api/types";

interface DriverModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: DriverFormData;
  onClose: () => void;
  onSave: () => Promise<void>;
  onFormChange: (field: keyof DriverFormData, value: string) => void;
  isSaving: boolean;
  errors: Record<string, string>;
  apiError?: ApiError | null;
}

export const DriverModal: React.FC<DriverModalProps> = ({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
  apiError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<DriverFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<DriverFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nombre requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nombre debe tener al menos 2 caracteres';
    }

    if (!formData.identification.trim()) {
      newErrors.identification = 'Identificacion es requerida';
    } else if (formData.identification.trim().length < 4) {
      newErrors.identification = 'Identificación debe tener al menos 4 caracteres';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.identification.trim())) {
      newErrors.identification = 'Identificación debe ser alfanumérica';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof DriverFormData) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onFormChange(field, value);
      
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
      <DialogContent className="sm:max-w-md bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5" />
            {isEditing ? "Editar conductor" : "Agregar nuevo conductor"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualice la información del conductor a continuación."
              : "Ingrese la información del nuevo conductor a continuación."}
          </DialogDescription>
        </DialogHeader>

        {/* API Error Display */}
        {apiError && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-red-200/80 text-sm">
                  {apiError.message}
                </p>
                {/* Mostrar errores de validación del servidor si existen */}
                {apiError.errors && Object.keys(apiError.errors).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(apiError.errors).map(([field, messages]) => (
                      <div key={field} className="text-red-200/70 text-xs">
                        <strong className="capitalize">{field}:</strong>{" "}
                        {Array.isArray(messages) ? messages.join(", ") : messages}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-400">
              Nombre *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Ingrese el nombre completo del conductor"
              className={` bg-zinc-800 border-zinc-700 text-white ${
                errors.name ? "border-red-500 " : ""
              }`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="identification" className="text-sm font-medium">
              Identificación *
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="identification"
                value={formData.identification}
                onChange={handleInputChange("identification")}
                placeholder="Introduzca el número de identificación"
                className={`pl-10 bg-zinc-800 border-zinc-700 text-white ${
                  errors.identification ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.identification && (
              <p className="text-sm text-red-500">{errors.identification}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isEditing ? "Actualizar conductor" : "Crear conductor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};