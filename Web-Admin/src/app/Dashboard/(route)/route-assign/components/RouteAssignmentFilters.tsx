import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface RouteAssignmentFiltersProps {
  searchTerm: string
  statusFilter: string
  onSearchChange: (searchTerm: string) => void
  onStatusFilterChange: (filter: string) => void
}

export function RouteAssignmentFilters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange
}: RouteAssignmentFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
        <Input
          placeholder="Buscar por número de ruta o placa del vehículo..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-400"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-48 bg-zinc-900 border-zinc-700 text-white">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-700">
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="ACTIVE">Activo</SelectItem>
          <SelectItem value="INACTIVE">Inactivo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}