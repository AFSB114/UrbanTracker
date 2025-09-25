import { Plus, Minus, Navigation } from "lucide-react"
import { Button } from "components/ui/button"

export function MapControls() {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-2 z-20">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <Button
          size="icon"
          className="w-8 h-8 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border-0 rounded-none"
          variant="ghost"
        >
          <Plus className="h-4 w-4" />
        </Button>

        <div className="h-px bg-zinc-800" />

        <Button
          size="icon"
          className="w-8 h-8 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border-0 rounded-none"
          variant="ghost"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        size="icon"
        className="w-8 h-8 bg-zinc-900 text-zinc-200 border border-zinc-800 hover:bg-zinc-800 shadow-lg"
        variant="outline"
      >
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  )
}
