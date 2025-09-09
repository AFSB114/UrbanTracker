import { Card } from "@/src/components/ui/card"

export function RoutesPanel() {
  const routes = [
    {
      id: "1HGBH41JXMN109186",
      name: "Ruta 999",
      description: "Antigua ruta 63",
    },
    {
      id: "2HGBH41JXMN109187",
      name: "Ruta 101",
      description: "Centro - Universidad",
    },
    {
      id: "3HGBH41JXMN109188",
      name: "Ruta 205",
      description: "Terminal - Aeropuerto",
    },
  ]

  return (
    <div className="space-y-3">
      {routes.map((route) => (
        <Card key={route.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">{route.id}</div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">{route.name}</h4>
              <p className="text-xs text-gray-600">{route.description}</p>
            </div>

            <div className="w-12 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-6 text-gray-600" viewBox="0 0 32 24" fill="currentColor">
                <rect x="2" y="6" width="28" height="12" rx="2" />
                <rect x="5" y="9" width="4" height="3" fill="white" />
                <rect x="11" y="9" width="4" height="3" fill="white" />
                <rect x="17" y="9" width="4" height="3" fill="white" />
                <rect x="23" y="9" width="4" height="3" fill="white" />
                <circle cx="8" cy="21" r="2" />
                <circle cx="24" cy="21" r="2" />
              </svg>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
