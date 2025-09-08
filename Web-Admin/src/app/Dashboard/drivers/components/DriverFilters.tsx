// components/drivers/DriverFilters.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DriverFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const DriverFilters: React.FC<DriverFiltersProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Card className="border-0 shadow-lg bg-zinc-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Search className="h-5 w-5" />
          Buscar conductores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o identificación..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};