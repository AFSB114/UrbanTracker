import { Plus, Minus, Navigation } from "lucide-react"


import { Button } from "components/ui/button"
import { useMapboxRef } from "./map-view"

export function MapControls() {
  const mapRef = useMapboxRef();

  const handleZoom = (delta: number) => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.zoomTo(currentZoom + delta, { duration: 400 });
    }
  };

  return (
    <div className="absolute bottom-6 right-6 flex flex-col space-y-2 z-20">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <Button
          size="icon"
          className="w-8 h-8 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border-0 rounded-none"
          variant="ghost"
          onClick={() => handleZoom(1)}
        >
          <Plus className="h-4 w-4" />
        </Button>

        <div className="h-px bg-zinc-800" />

        <Button
          size="icon"
          className="w-8 h-8 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border-0 rounded-none"
          variant="ghost"
          onClick={() => handleZoom(-1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}

