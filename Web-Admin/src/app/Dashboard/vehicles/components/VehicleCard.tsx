import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Edit, Trash2 } from "lucide-react"
import { Vehicle } from "../hooks/useVehicles"

interface VehicleCardProps {
  vehicle: Vehicle
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: number) => void
}

export function VehicleCard({ vehicle, onEdit, onDelete }: VehicleCardProps) {
  const getStatusStyles = (status: Vehicle['status']) => {
    const styles = {
      "Operational": "bg-green-600 text-white hover:bg-green-700",
      "En Ruta": "bg-blue-600 text-white hover:bg-blue-700",
      "Fuera de Servicio": "bg-red-600 text-white hover:bg-red-700"
    }
    return styles[status]
  }

  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-600/20 rounded-full">
              <Car className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">{vehicle.licensePlate}</h3>
                <Badge className={getStatusStyles(vehicle.status)}>
                  {vehicle.status}
                </Badge>
              </div>
              <div className="text-gray-400">
                <span className="font-medium text-white">
                  {vehicle.brand} {vehicle.model}
                </span>
                <span className="mx-2">•</span>
                <span>{vehicle.type}</span>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span>{vehicle.mileage}</span>
                </div>
              </div>
              {vehicle.driver && (
                <div className="text-sm">
                  <span className="font-medium text-gray-400">Assigned driver: </span>
                  <span className="text-emerald-500">{vehicle.driver}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(vehicle)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(vehicle.id)}
              className="border-red-700 text-red-500 hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}