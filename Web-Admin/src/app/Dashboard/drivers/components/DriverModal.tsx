// components/drivers/DriverModal.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, User, CreditCard } from "lucide-react";
import type { DriverFormData } from "../types/driverTypes";

interface DriverModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: DriverFormData;
  onClose: () => void;
  onSave: () => Promise<void>;
  onFormChange: (field: keyof DriverFormData, value: string) => void;
}

export const DriverModal: React.FC<DriverModalProps> = ({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<DriverFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<DriverFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.identification.trim()) {
      newErrors.identification = 'Identification is required';
    } else if (formData.identification.trim().length < 4) {
      newErrors.identification = 'Identification must be at least 4 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.identification.trim())) {
      newErrors.identification = 'Identification can only contain letters and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof DriverFormData) => 
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
      console.error('Error saving driver:', error);
      // You can add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <User className="h-5 w-5" />
            {isEditing ? 'Edit Driver' : 'Add New Driver'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the driver's information below."
              : "Enter the new driver's information below."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-400">
              Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter driver's full name"
              className={` bg-gray-800 border-gray-700 text-white ${errors.name ? "border-red-500 " : ""}`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="identification" className="text-sm font-medium">
              Identification *
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="identification"
                value={formData.identification}
                onChange={handleInputChange('identification')}
                placeholder="Enter identification number"
                className={`pl-10 bg-gray-800 border-gray-700 text-white ${errors.identification ? "border-red-500" : ""}`}
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
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isEditing ? 'Update Driver' : 'Create Driver'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};