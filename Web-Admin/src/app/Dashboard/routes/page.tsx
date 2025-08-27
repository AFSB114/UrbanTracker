import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Route, MapPin, Clock, Plus, Truck } from "lucide-react"

export default function RutasPage() {
  const rutas = [
    {
      id: 1,
      nombre: "Ruta Centro-Norte",
      origen: "Centro Comercial",
      destino: "Zona Industrial Norte",
      distancia: "25 km",
      tiempoEstimado: "45 min",
      estado: "Activa",
      conductor: "Carlos Mendoza",
      vehiculo: "ABC-123",
    },
    {
      id: 2,
      nombre: "Ruta Sur-Este",
      origen: "Terminal Sur",
      destino: "Distrito Este",
      distancia: "18 km",
      tiempoEstimado: "35 min",
      estado: "En Progreso",
      conductor: "María García",
      vehiculo: "DEF-456",
    },
    {
      id: 3,
      nombre: "Ruta Oeste-Centro",
      origen: "Zona Oeste",
      destino: "Centro Ciudad",
      distancia: "22 km",
      tiempoEstimado: "40 min",
      estado: "Programada",
      conductor: "José Rodríguez",
      vehiculo: "GHI-789",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administrar Rutas</h1>
          <p className="text-muted-foreground mt-2">Gestiona y optimiza las rutas de transporte</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Ruta
        </Button>
      </div>

      {/* Estadísticas de Rutas */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rutas Activas</CardTitle>
            <Route className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Distancia Total</CardTitle>
            <MapPin className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">285 km</div>
            <p className="text-xs text-muted-foreground">Hoy</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">42 min</div>
            <p className="text-xs text-muted-foreground">Por ruta</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Rutas */}
      <div className="grid gap-6">
        {rutas.map((ruta) => (
          <Card key={ruta.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <Route className="h-8 w-8 text-accent" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-foreground">{ruta.nombre}</h3>
                      <Badge
                        variant={
                          ruta.estado === "Activa" ? "default" : ruta.estado === "En Progreso" ? "secondary" : "outline"
                        }
                        className={ruta.estado === "Activa" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {ruta.estado}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{ruta.origen}</span>
                      <span>→</span>
                      <span className="font-medium">{ruta.destino}</span>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-chart-3" />
                        <span>{ruta.tiempoEstimado}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-chart-2" />
                        <span>{ruta.distancia}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-accent" />
                        <span>
                          {ruta.conductor} - {ruta.vehiculo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Mapa
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
