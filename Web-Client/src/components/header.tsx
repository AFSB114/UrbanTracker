import { Search } from "lucide-react"
import { Input } from "@/src/components/ui/input"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-sm">UT</div>
          </div>
          <span className="font-semibold text-gray-900 text-lg">UrbanTracker</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 bg-gray-50 border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </header>
  )
}
