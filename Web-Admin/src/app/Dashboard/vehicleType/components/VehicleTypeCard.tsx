import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Edit, Trash2 } from "lucide-react";
import { VehicleType } from "../types/vehicleTypes";

interface VehicleTypeCardProps {
  vehicleType: VehicleType;
  onEdit: (vehicleType: VehicleType) => void;
  onDelete: (id: number) => void;
}

const VehicleTypeCard: React.FC<VehicleTypeCardProps> = ({ vehicleType, onEdit, onDelete }) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-600/20 rounded-full">
              <Car className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">
                  {vehicleType.name}
                </h3>
                <Badge className={vehicleType.active ? "bg-emerald-600" : "bg-zinc-600"}>
                  {vehicleType.active ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <div className="text-zinc-400">
                <span className="font-medium text-white">
                  {vehicleType.description}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(vehicleType)}
              className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(vehicleType.id)}
              className="border-red-700 text-red-500 hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleTypeCard;
