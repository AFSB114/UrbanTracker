import { Card } from "components/ui/card"
import { User, Settings, CreditCard, HelpCircle } from "lucide-react"
import { Button } from "components/ui/button"

export function ProfilePanel() {
  return (
    <div className="space-y-3">
      <Card className="p-3">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Usuario</h4>
            <p className="text-xs text-gray-600">usuario@email.com</p>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start h-10 px-3">
          <Settings className="h-4 w-4 mr-3" />
          <span className="text-sm">Configuración</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start h-10 px-3">
          <CreditCard className="h-4 w-4 mr-3" />
          <span className="text-sm">Métodos de pago</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start h-10 px-3">
          <HelpCircle className="h-4 w-4 mr-3" />
          <span className="text-sm">Ayuda</span>
        </Button>
      </div>
    </div>
  )
}
