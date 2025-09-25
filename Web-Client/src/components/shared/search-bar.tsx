import { Search } from "lucide-react"
import { Input } from "components/ui/input"

export function SearchBar() {
  return (
  <div className="w-full flex px-2 bg-transparent">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar..."
          className="pl-10 border-zinc-700 text-zinc-100 placeholder-zinc-400 rounded-full focus:bg-transparent focus:ring-1 focus:ring-zinc-700 focus:border-zinc-500 w-full bg-transparent transition-colors duration-200 hover:border-zinc-400 hover:ring-0"
        />
      </div>
    </div>
  )
}
