import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface VehicleFiltersProps {
  searchTerm: string
  statusFilter: string
  onSearchChange: (searchTerm: string) => void
  onStatusFilterChange: (filter: string) => void
}

export function VehicleFilters({ 
  searchTerm, 
  statusFilter, 
  onSearchChange, 
  onStatusFilterChange 
}: VehicleFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by license plate, brand, model or driver..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="Operational">Operational</SelectItem>
          <SelectItem value="On Route">On Route</SelectItem>
          <SelectItem value="Out of Service">Out of Service</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}