import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Route, Edit, Trash2 } from "lucide-react"
import { RouteResponse } from "../types/routeTypes"

interface RouteCardProps {
  route: RouteResponse
  onEdit: (route: RouteResponse) => void
  onDelete: (id: number) => void
}

export function RouteCard({ route, onEdit, onDelete }: RouteCardProps) {
  const getStatusStyles = (active: boolean) => {
    return active
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-red-600 text-white hover:bg-red-700"
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-600/20 rounded-full">
              <Route className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">
                  {route.numberRoute}
                </h3>
                <Badge className={getStatusStyles(route.active)}>
                  {route.active ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              {route.description && (
                <div className="text-zinc-400">
                  <span className="font-medium text-white">
                    {route.description}
                  </span>
                </div>
              )}
              <div className="text-sm">
                <span className="font-medium text-zinc-400">
                  Distancia:{" "}
                </span>
                <span className="text-emerald-500">{route.totalDistance || 0} km</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-zinc-400">
                  Puntos:{" "}
                </span>
                <span className="text-emerald-500">{route.waypoints}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(route)}
              className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(route.id!)}
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
