import { Card } from "@/src/components/ui/card"

export function RecommendedRoutes() {
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Rutas recomendadas</h2>

      <Card className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">1HGBH41JXMN109186</div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">Ruta 999</h3>
            <p className="text-sm text-gray-600">Antigua ruta 63</p>
          </div>

          {/* Bus Icon */}
          <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-12 h-8 text-gray-600" viewBox="0 0 48 32" fill="currentColor">
              <rect x="4" y="8" width="40" height="16" rx="2" />
              <rect x="8" y="12" width="6" height="4" fill="white" />
              <rect x="16" y="12" width="6" height="4" fill="white" />
              <rect x="26" y="12" width="6" height="4" fill="white" />
              <rect x="34" y="12" width="6" height="4" fill="white" />
              <circle cx="12" cy="28" r="3" />
              <circle cx="36" cy="28" r="3" />
              <rect x="2" y="16" width="4" height="2" />
              <rect x="42" y="16" width="4" height="2" />
            </svg>
          </div>
        </div>
      </Card>
    </div>
  )
}
