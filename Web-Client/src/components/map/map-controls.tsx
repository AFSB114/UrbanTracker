import { Plus, Minus, Navigation } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export function MapControls() {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <Button
          size="icon"
          className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 border-0 rounded-none"
          variant="ghost"
        >
          <Plus className="h-5 w-5" />
        </Button>

        <div className="h-px bg-gray-200" />

        <Button
          size="icon"
          className="w-10 h-10 bg-white text-gray-700 hover:bg-gray-50 border-0 rounded-none"
          variant="ghost"
        >
          <Minus className="h-5 w-5" />
        </Button>
      </div>

      <Button
        size="icon"
        className="w-10 h-10 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-md"
        variant="outline"
      >
        <Navigation className="h-5 w-5" />
      </Button>
    </div>
  )
}
