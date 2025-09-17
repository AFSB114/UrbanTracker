import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Route, Car, Users } from "lucide-react"

const features = [
  {
    icon: Map,
    title: "Mapa Interactivo en Tiempo Real",
    description:
      "Visualiza la ubicación exacta de todos los vehículos de transporte público en tiempo real con actualizaciones instantáneas.",
  },
  {
    icon: Route,
    title: "Gestión de Rutas y Vehículos",
    description:
      "Administra eficientemente todas las rutas, horarios y vehículos desde un panel de control centralizado.",
  },
  {
    icon: Car,
    title: "App para Conductores",
    description:
      "Aplicación móvil especializada para conductores con navegación GPS y reportes de estado en tiempo real.",
  },
  {
    icon: Users,
    title: "App para Usuarios",
    description:
      "Aplicación intuitiva para pasajeros que permite consultar horarios, rutas y tiempos de llegada estimados.",
  },
]

export default function Features() {
  return (
    <section id="funciones" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Funciones Principales</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Descubre las características que hacen de UrbanTracker la solución ideal para el transporte público
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
