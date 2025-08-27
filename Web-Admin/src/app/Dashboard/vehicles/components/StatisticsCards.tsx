import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, AlertTriangle } from "lucide-react"

interface StatisticsCardsProps {
  statistics: {
    total: number
    operational: number
    onRoute: number
    outOfService: number
    operationalPercentage: number
  }
}

export function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const cards = [
    {
      title: "Total Vehicles",
      value: statistics.total,
      description: "In fleet",
      icon: Car,
      iconColor: "text-emerald-500"
    },
    {
      title: "Operational",
      value: statistics.operational,
      description: `${statistics.operationalPercentage}% of fleet`,
      icon: Car,
      iconColor: "text-green-500"
    },
    {
      title: "En Ruta",
      value: statistics.onRoute,
      description: "Active",
      icon: Car,
      iconColor: "text-blue-500"
    },
    {
      title: "Fuera de Servicio",
      value: statistics.outOfService,
      description: "Need attention",
      icon: AlertTriangle,
      iconColor: "text-red-500"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <Card 
          key={card.title}
          className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <p className="text-xs text-gray-400">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}