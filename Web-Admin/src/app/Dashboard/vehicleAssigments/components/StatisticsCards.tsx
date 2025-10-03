import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from "lucide-react"

import type { VehicleAssigmentsStatistics } from "../types/VehicleAssigmentsType";

interface StatisticsCardsProps {
  statistics: VehicleAssigmentsStatistics;
}

export function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const cards = [
    {
      title: "Total de Asignaciones",
      value: statistics.totalVehicles,
      description: "En la plataforma",
      icon: Car,
      iconColor: "text-emerald-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
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
  );
}