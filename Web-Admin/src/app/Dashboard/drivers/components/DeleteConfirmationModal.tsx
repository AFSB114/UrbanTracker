
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2, User, CreditCard } from "lucide-react";
import type { Driver } from "../types/driverTypes";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  driver: Driver | null;
  isDeleting: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  driver,
  isDeleting,
}) => {
  if (!driver) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Eliminar Conductor
          </DialogTitle>
          <DialogDescription className="text-base">
            ¿Está seguro de que desea eliminar permanentemente este controlador?
          </DialogDescription>
        </DialogHeader>

        {/* Driver info to be deleted */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3 ">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-white" />
            <span className="font-medium text-white">Name:</span>
            <span className="text-white">{driver.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-white" />
            <span className="font-medium text-white">ID:</span>
            <span className="font-mono text-white px-2 py-1 rounded">
              {driver.identification}
            </span>
          </div>
        </div>

        {/* Warning message */}
        <div className=" bg-gray-900 border-red-700 rounded-lg p-4">
          <p className="text-sm text-red-800">
            <strong>advertencia:</strong> Esta acción no se puede deshacer. El controlador se eliminará permanentemente del sistema.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isDeleting ? 'Eliminando...' : 'Eliminar Conductor'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};