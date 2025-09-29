import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import type { RouteScheduleStatistics } from "../hooks/useRouteSchedules"

interface StatisticsCardsProps {
  statistics: RouteScheduleStatistics
}

export function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const cards = [
    {
      title: "Total Horarios",
      value: statistics.totalSchedules,
      description: "En el sistema",
      icon: Calendar,
      iconColor: "text-emerald-500"
    },
    {
      title: "Horarios Activos",
      value: statistics.activeSchedules,
      description: "En operación",
      icon: CheckCircle,
      iconColor: "text-green-500"
    },
    {
      title: "Horarios Inactivos",
      value: statistics.inactiveSchedules,
      description: "Fuera de servicio",
      icon: XCircle,
      iconColor: "text-red-500"
    },
    {
      title: "Días con Horarios",
      value: Object.keys(statistics.schedulesByDay).length,
      description: "Días de la semana",
      icon: Clock,
      iconColor: "text-blue-500"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <p className="text-xs text-zinc-400">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}