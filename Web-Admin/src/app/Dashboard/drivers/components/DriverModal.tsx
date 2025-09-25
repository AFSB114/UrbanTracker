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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localApiError, setLocalApiError] = useState<ApiError | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<DriverFormData> = {};

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'Número de identificación requerido';
    } else if (formData.idNumber.trim().length < 4) {
      newErrors.idNumber = 'Número de identificación debe tener al menos 4 caracteres';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.idNumber.trim())) {
      newErrors.idNumber = 'Número de identificación debe ser alfanumérico';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Contraseña requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nombre requerido';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Nombre debe tener al menos 2 caracteres';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Apellido requerido';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Apellido debe tener al menos 2 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email requerido';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email no válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Teléfono requerido';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Teléfono debe tener al menos 7 caracteres';
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
    setSuccessMessage(null);
    setLocalApiError(null);

    try {
      await onSave();
      // Modal will be closed by the hook's closeModal() call
    } catch (error) {
      console.error('Error guardando conductor:', error);
      // Error is handled by the hook and passed via apiError prop
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

        {/* Success Message Display */}
        {successMessage && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
            <p className="text-green-200/80 text-sm">{successMessage}</p>
          </div>
        )}

        {/* API Error Display */}
        {(localApiError || apiError) && (() => {
          const errorToShow = localApiError || apiError;
          return (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-red-200/80 text-sm">
                    {errorToShow!.message}
                  </p>
                  {/* Mostrar errores de validación del servidor si existen */}
                  {errorToShow!.errors && Object.keys(errorToShow!.errors).length > 0 && (
                    <div className="mt-2 space-y-1">
                      {Object.entries(errorToShow!.errors).map(([field, messages]) => (
                        <div key={field} className="text-red-200/70 text-xs">
                          <strong className="capitalize">{field}:</strong>{" "}
                          {Array.isArray(messages) ? messages.join(", ") : String(messages)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="idNumber" className="text-zinc-400">
              Número de Identificación *
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange("idNumber")}
                placeholder="Ingrese el número de identificación"
                className={`pl-10 bg-zinc-800 border-zinc-700 text-white ${
                  errors.idNumber ? "border-red-500 " : ""
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.idNumber && (
              <p className="text-sm text-red-500">{errors.idNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-400">
              Contraseña *
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              placeholder="Ingrese la contraseña"
              className={` bg-zinc-800 border-zinc-700 text-white ${
                errors.password ? "border-red-500 " : ""
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-zinc-400">
              Nombre *
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              placeholder="Ingrese el nombre"
              className={` bg-zinc-800 border-zinc-700 text-white ${
                errors.firstName ? "border-red-500 " : ""
              }`}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-zinc-400">
              Apellido *
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              placeholder="Ingrese el apellido"
              className={` bg-zinc-800 border-zinc-700 text-white ${
                errors.lastName ? "border-red-500 " : ""
              }`}
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-400">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="Ingrese el email"
              className={` bg-zinc-800 border-zinc-700 text-white ${
                errors.email ? "border-red-500 " : ""
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-400">
              Teléfono *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              placeholder="Ingrese el teléfono"
              className={` bg-zinc-800 border-zinc-700 text-white ${
                errors.phone ? "border-red-500 " : ""
              }`}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
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