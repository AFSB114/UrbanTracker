import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Edit, Trash2 } from "lucide-react"
import { VehicleAssigment } from "../types/VehicleAssigmentsType"

interface VehicleAssigmentCardProps {
  vehicleAssigment: VehicleAssigment
  onEdit: (vehicle: VehicleAssigment) => void
  onDelete: (id: number) => void
}

export function VehicleAssigmentCard({ vehicleAssigment, onEdit, onDelete }: VehicleAssigmentCardProps) {

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
                                    {vehicleAssigment.vehicle_id}
                                </h3>
                                <Badge className="bg-emerald-600">
                                    {vehicleAssigment.driver_id}
                                </Badge>
                            </div>
                            <div className="text-zinc-400">
                                <span className="font-medium text-white">
                                    {vehicleAssigment.assignmentStatus}
                                </span>
                                <span className="text-emerald-500">{vehicleAssigment.note}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(vehicleAssigment)}
                            className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(vehicleAssigment.id)}
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
}

