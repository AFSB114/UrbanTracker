import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from "lucide-react"

import type { VehiculeStatistics } from "../types/vehiculeTypes";

interface StatisticsCardsProps {
  statistics: VehiculeStatistics;
}


interface StatisticsCardsProps {
  statistics: VehiculeStatistics;
}

export function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const cards = [
    {
      title: "Total Vehículos",
      value: statistics.totalVehicules,
      description: "En la flota",
      icon: Car,
      iconColor: "text-emerald-500"
    },
    {
      title: "Vehículos Activos",
      value: statistics.activeVehicules,
      description: "En operación",
      icon: Car,
      iconColor: "text-green-500"
    },
    {
      title: "Nuevos este mes",
      value: statistics.newThisMonth,
      description: "Agregados recientemente",
      icon: Car,
      iconColor: "text-blue-500"
    },
    {
      title: "vehículos Desactivados",
      value: statistics.inactiveVehicules,
      description: "Agregados recientemente",
      icon: Car,
      iconColor: "text-red-500"
    }
  ];

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