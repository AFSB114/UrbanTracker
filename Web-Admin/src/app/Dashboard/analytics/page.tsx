import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Análisis detallado de tu rendimiento</p>
      </div>

      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.2% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.24%</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:32</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.1% vs mes anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tráfico por Día</CardTitle>
            <CardDescription>Visitantes en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="w-8 bg-primary rounded-t" style={{ height: `${height}%` }}></div>
                  <span className="text-xs text-muted-foreground">{["L", "M", "X", "J", "V", "S", "D"][index]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fuentes de Tráfico</CardTitle>
            <CardDescription>De dónde vienen tus visitantes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Búsqueda Orgánica</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-3/5 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Directo</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-1/4 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Redes Sociales</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-2/12 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-muted-foreground">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
