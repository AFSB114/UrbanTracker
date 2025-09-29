import { Card, CardContent } from "@/components/ui/card";
import type { VehicleTypesStatistics } from "../types/vehicleTypes";

interface StatisticsCardsProps {
  statistics: VehicleTypesStatistics;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics }) => {
  const cards = [
    {
      title: "Total de Tipos de Vehículo",
      value: statistics.totalVehicles,
      description: "En la plataforma"
    },
    {
      title: "Nuevos este mes",
      value: statistics.newThisMonth,
      description: "Agregados recientemente",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
        >
          <CardContent>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <p className="text-xs text-zinc-400">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default StatisticsCards;
