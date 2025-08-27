import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Route, Car, TrendingUp, Activity, AlertTriangle, MapPin } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-white">Bienvenido a UrbanTracker</h1>
        <p className="text-gray-400 mt-2">Panel de control para la gestión de tu flota de transporte</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-gray-800 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Conductores</CardTitle>
            <Users className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-500">+3 nuevos este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-gray-800 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Vehículos Activos</CardTitle>
            <Car className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">18</div>
            <p className="text-xs text-gray-500">75% de la flota operativa</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-gray-800 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Rutas Completadas</CardTitle>
            <Route className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-gray-500">+12% desde la semana pasada</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-gray-800 group animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-gray-500">2 mantenimientos pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-102 transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-emerald-500 animate-bounce" />
              Rendimiento Diario
            </CardTitle>
            <CardDescription className="text-gray-400">Métricas de hoy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <span className="text-sm text-gray-400">Distancia recorrida</span>
              <span className="font-bold text-emerald-500">1,245 km</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <span className="text-sm text-gray-400">Combustible consumido</span>
              <span className="font-bold text-white">285 L</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <span className="text-sm text-gray-400">Tiempo promedio</span>
              <span className="font-bold text-white">42 min</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-102 transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
              Actividad Reciente
            </CardTitle>
            <CardDescription className="text-gray-400">Últimos eventos del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Ruta Centro-Norte completada</p>
                <p className="text-xs text-gray-500">Carlos Mendoza - Hace 15 min</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Vehículo ABC-123 en mantenimiento</p>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Nueva ruta programada</p>
                <p className="text-xs text-gray-500">María García - Hace 2 horas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:scale-102 transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MapPin className="h-5 w-5 text-amber-500 animate-bounce" />
              Estado de la Flota
            </CardTitle>
            <CardDescription className="text-gray-400">Resumen actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">En ruta</span>
              </div>
              <span className="font-bold text-white">12 vehículos</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Disponibles</span>
              </div>
              <span className="font-bold text-white">6 vehículos</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Mantenimiento</span>
              </div>
              <span className="font-bold text-white">3 vehículos</span>
            </div>
            <div className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span className="text-sm text-gray-300">Fuera de servicio</span>
              </div>
              <span className="font-bold text-white">3 vehículos</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-white">Acciones Rápidas</CardTitle>
          <CardDescription className="text-gray-400">Tareas importantes para hoy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Mantenimientos Programados</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-102 transform">
                  <div>
                    <p className="text-sm font-medium text-white">Vehículo DEF-456</p>
                    <p className="text-xs text-gray-400">Mantenimiento preventivo</p>
                  </div>
                  <span className="text-xs bg-amber-500 text-black px-2 py-1 rounded font-medium">8 días</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-102 transform animate-pulse">
                  <div>
                    <p className="text-sm font-medium text-white">Vehículo GHI-789</p>
                    <p className="text-xs text-gray-400">Revisión técnica</p>
                  </div>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded font-medium">Vencido</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">Conductores Disponibles</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-102 transform">
                  <div>
                    <p className="text-sm font-medium text-white">José Rodríguez</p>
                    <p className="text-xs text-gray-400">Licencia A1 - 8 años exp.</p>
                  </div>
                  <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded font-medium">Disponible</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-102 transform">
                  <div>
                    <p className="text-sm font-medium text-white">Ana López</p>
                    <p className="text-xs text-gray-400">Licencia B1 - 4 años exp.</p>
                  </div>
                  <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded font-medium">Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
