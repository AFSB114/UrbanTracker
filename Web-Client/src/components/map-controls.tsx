import { Plus, Minus, Navigation } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export function MapControls() {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
      {/* Zoom Controls */}
      <div className="flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-none border-b border-gray-200 hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Zoom in</span>
        </Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-none hover:bg-gray-50">
          <Minus className="h-4 w-4" />
          <span className="sr-only">Zoom out</span>
        </Button>
      </div>

      {/* Location Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
      >
        <Navigation className="h-4 w-4" />
        <span className="sr-only">Mi ubicación</span>
      </Button>
    </div>
  )
}
