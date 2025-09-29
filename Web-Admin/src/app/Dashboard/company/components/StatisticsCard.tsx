import { Card, CardContent } from "@/components/ui/card"
import type { CompanyStatistics } from "../types/companyTypes"

interface StatisticsCardProps {
    statistics: CompanyStatistics
}

export function StatisticsCard({ statistics }: StatisticsCardProps) {
    const cards = [
        {
            title: "Total de Empresas",
            value: statistics.totalCompanies,
            description: "En la plataforma"
        },
        {
            title: "Empresas Activos",
            value: statistics.activeCompanies,
            description: "En operación",
        },
        {
            title: "Empresas Desactivados",
            value: statistics.inactiveCompanies,
            description: "Agregados recientemente",
        },
    ];

    return (
        <div className="flex justify-center gap-6 flex-wrap">
            {cards.map((card) => (
                <Card
                    key={card.title}
                    className="flex-1 bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
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