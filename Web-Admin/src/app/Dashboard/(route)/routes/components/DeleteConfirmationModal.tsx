import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { RouteResponse } from "../types/routeTypes";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  route: RouteResponse | null;
  isDeleting: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  route,
  isDeleting,
}) => {
  if (!route) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Ruta</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas eliminar la ruta <span className="font-bold">{route.numberRoute}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="text-red-500" />
          <span className="text-muted-foreground">Esta acción no se puede deshacer.</span>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>Cancelar</Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
