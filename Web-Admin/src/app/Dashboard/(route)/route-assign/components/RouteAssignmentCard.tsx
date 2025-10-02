import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Route, Car, Edit, Trash2 } from "lucide-react"
import { RouteAssignment } from "../types/routeAssignmentTypes"

interface RouteAssignmentCardProps {
  routeAssignment: RouteAssignment
  onEdit: (assignment: RouteAssignment) => void
  onDelete: (id: number) => void
}

const getStatusLabel = (assignmentStatus: string): string => {
    return assignmentStatus === 'ACTIVE' ? 'Activo' : 'Inactivo';
};

const getStatusColor = (assignmentStatus: string): string => {
    return assignmentStatus === 'ACTIVE' ? 'bg-green-600' : 'bg-red-600';
};

export function RouteAssignmentCard({ routeAssignment, onEdit, onDelete }: RouteAssignmentCardProps) {

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
                                    Ruta {routeAssignment.routeNumber} - Vehículo {routeAssignment.vehiclePlate}
                                </h3>
                                <Badge className={getStatusColor(routeAssignment.assignmentStatus)}>
                                    {getStatusLabel(routeAssignment.assignmentStatus)}
                                </Badge>
                            </div>
                            <div className="text-zinc-400 space-y-1">
                                {routeAssignment.driverId && (
                                    <div>
                                        <span className="font-medium text-white">Conductor ID: </span>
                                        <span className="text-emerald-500">{routeAssignment.driverId}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium text-white">Estado: </span>
                                    <span className={`font-medium ${routeAssignment.assignmentStatus === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>
                                        {routeAssignment.assignmentStatus === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                                {routeAssignment.note && (
                                    <div>
                                        <span className="font-medium text-white">Nota: </span>
                                        <span className="text-zinc-300">{routeAssignment.note}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="font-medium text-white">Creado: </span>
                                    <span className="text-zinc-300">{new Date(routeAssignment.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(routeAssignment)}
                            className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(routeAssignment.id)}
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