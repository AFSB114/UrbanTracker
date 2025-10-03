
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Edit, Trash2, CreditCard, Smartphone, Mail } from "lucide-react"
import type { Driver } from "../types/driverTypes"

interface DriverCardProps {
    driver: Driver
    onEdit: (driver: Driver) => void
    onDelete: (id: number) => void
}

export function DriverCard({ driver, onEdit, onDelete }: DriverCardProps) {
    return (
        <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-emerald-600/20 rounded-full">
                            <Users className="h-8 w-8 text-emerald-500" />
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    {driver.firstName} {driver.lastName}
                                </h3>
                            </div>
                            <div className="text-zinc-400">
                                <span className="font-medium text-white flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-white" /> N° Identificación: {driver.idNumber}
                                </span>

                                <span className="font-medium text-white flex items-center gap-2">
                                    <Smartphone className="h-4 w-4 text-white" /> Teléfono: {driver.phone}
                                </span>

                                <span className="font-medium text-white flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-white" /> Correo: <span className="text-emerald-500"> {driver.email}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(driver)}
                            className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(driver.id)}
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