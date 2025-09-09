import { Card } from "@/src/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

export function LocationPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Ubicación actual</h3>

      <Card className="p-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">Mi ubicación</h4>
            <p className="text-xs text-gray-600">Av. Principal 123, Centro</p>
          </div>
        </div>
      </Card>

      <Card className="p-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Navigation className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">Parada más cercana</h4>
            <p className="text-xs text-gray-600">Parada Central - 150m</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
