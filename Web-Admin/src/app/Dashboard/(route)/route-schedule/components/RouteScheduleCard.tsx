import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Route, Clock, Edit, Trash2 } from "lucide-react"
import { RouteWithSchedules } from "../hooks/useRouteSchedules"

interface RouteScheduleCardProps {
  routeWithSchedules: RouteWithSchedules
  onEdit: (route: RouteWithSchedules) => void
  onDelete: (route: RouteWithSchedules) => void
}

export function RouteScheduleCard({ routeWithSchedules, onEdit, onDelete }: RouteScheduleCardProps) {
  const { route, schedules } = routeWithSchedules

  const getDayName = (dayOfWeek: string) => {
    const days = {
      'MONDAY': 'L',
      'TUESDAY': 'M',
      'WEDNESDAY': 'X',
      'THURSDAY': 'J',
      'FRIDAY': 'V',
      'SATURDAY': 'S',
      'SUNDAY': 'D'
    }
    return days[dayOfWeek.toUpperCase() as keyof typeof days] || dayOfWeek
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5) // HH:MM format
  }

  // Sort schedules by day of week
  const sortedSchedules = [...schedules].sort((a, b) => {
    const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    return dayOrder.indexOf(a.dayOfWeek.toUpperCase()) - dayOrder.indexOf(b.dayOfWeek.toUpperCase())
  })

  return (
    <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6 flex-1">
            <div className="p-4 bg-emerald-600/20 rounded-full">
              <Route className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">
                  Ruta {route.numberRoute}
                </h3>
                <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                  {schedules.length} horario{schedules.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {/* Schedule Grid */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-400">Horarios:</div>
                <div className="grid grid-cols-7 gap-2">
                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(day => {
                    const daySchedules = sortedSchedules.filter(s => s.dayOfWeek.toUpperCase() === day)
                    return (
                      <div key={day} className="text-center">
                        <div className="text-xs text-zinc-500 mb-1">{getDayName(day)}</div>
                        {daySchedules.length > 0 ? (
                          <div className="space-y-1">
                            {daySchedules.map(schedule => (
                              <div key={schedule.id} className={`p-2 rounded text-xs ${
                                schedule.active
                                  ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                                  : 'bg-red-600/20 text-red-400 border border-red-600/30'
                              }`}>
                                <div className="font-medium">{formatTime(schedule.startTime)}</div>
                                <div className="text-zinc-400">-</div>
                                <div className="font-medium">{formatTime(schedule.endTime)}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2 rounded bg-zinc-800/50 border border-zinc-700/50 text-zinc-600 text-xs">
                            Sin horario
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(routeWithSchedules)}
              className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(routeWithSchedules)}
              className="border-red-700 text-red-500 hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}