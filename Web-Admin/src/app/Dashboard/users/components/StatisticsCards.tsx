
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserCheck } from "lucide-react";
import type { UserStatistics } from "../types/userTypes";

interface StatisticsCardsProps {
  statistics: UserStatistics;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics }) => {
  const cards = [
    {
      title: "Total Usuarios",
      value: statistics.totalUsers,
      icon: User,
      color: "text-emerald-600",
    },
    {
      title: "Usuarios Activos",
      value: statistics.activeUsers,
      icon: UserCheck,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-0 shadow-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-foreground">{card.value}</span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
