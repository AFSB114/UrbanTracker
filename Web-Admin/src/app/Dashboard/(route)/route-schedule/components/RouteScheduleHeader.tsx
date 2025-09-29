import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface RouteScheduleHeaderProps {
  onCreateSchedule: () => void
}

export function RouteScheduleHeader({ onCreateSchedule }: RouteScheduleHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Horarios de Rutas
        </h1>
        <p className="text-zinc-400 mt-2">
          Gestiona los horarios de operación de tus rutas
        </p>
      </div>
      <Button
        onClick={onCreateSchedule}
        className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
      >
        <Plus className="h-4 w-4 mr-2" />
        Nuevo Horario
      </Button>
    </header>
  )
}