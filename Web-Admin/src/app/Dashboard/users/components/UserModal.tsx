

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
import { Loader2, User } from "lucide-react";
import type { User as UserType } from "../types/userTypes";

interface UserModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: UserType;
  onClose: () => void;
  onSave: () => Promise<void>;
  onFormChange: (field: keyof UserType, value: string) => void;
  isSaving: boolean;
  errors: Record<string, string>;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSave,
  onFormChange,
  isSaving,
  errors,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edita la información del usuario." : "Agrega un nuevo usuario."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => onFormChange('name', e.target.value)}
              disabled={isSaving}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={e => onFormChange('email', e.target.value)}
              disabled={isSaving}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="animate-spin h-4 w-4" /> : isEditing ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
