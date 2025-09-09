import { Card } from "@/src/components/ui/card"
import { MessageCircle, AlertTriangle } from "lucide-react"

export function MessagesPanel() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Notificaciones</h3>

      <Card className="p-3">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">Retraso en Ruta 999</h4>
            <p className="text-xs text-gray-600">Demora de 10 minutos por tráfico</p>
            <span className="text-xs text-gray-400">Hace 5 min</span>
          </div>
        </div>
      </Card>

      <Card className="p-3">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">Nueva ruta disponible</h4>
            <p className="text-xs text-gray-600">Ruta 305 ahora activa</p>
            <span className="text-xs text-gray-400">Hace 1 hora</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
