import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, Phone, Mail, MapPin } from "lucide-react"

export default function ConductoresPage() {
  const conductores = [
    {
      id: 1,
      nombre: "Carlos Mendoza",
      licencia: "A2",
      telefono: "+1 234-567-8901",
      email: "carlos@transport.com",
      estado: "Activo",
      vehiculo: "Camión ABC-123",
      experiencia: "5 años",
    },
    {
      id: 2,
      nombre: "María García",
      licencia: "B1",
      telefono: "+1 234-567-8902",
      email: "maria@transport.com",
      estado: "En Ruta",
      vehiculo: "Van DEF-456",
      experiencia: "3 años",
    },
    {
      id: 3,
      nombre: "José Rodríguez",
      licencia: "A1",
      telefono: "+1 234-567-8903",
      email: "jose@transport.com",
      estado: "Descanso",
      vehiculo: "Camión GHI-789",
      experiencia: "8 años",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administrar Conductores</h1>
          <p className="text-muted-foreground mt-2">Gestiona la información de todos los conductores</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Conductor
        </Button>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Buscar por nombre..." className="max-w-sm" />
            <Button variant="outline">Filtrar por Estado</Button>
            <Button variant="outline">Filtrar por Licencia</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Conductores */}
      <div className="grid gap-6">
        {conductores.map((conductor) => (
          <Card key={conductor.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-accent/10 rounded-full">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-foreground">{conductor.nombre}</h3>
                      <Badge
                        variant={
                          conductor.estado === "Activo"
                            ? "default"
                            : conductor.estado === "En Ruta"
                              ? "secondary"
                              : "outline"
                        }
                        className={conductor.estado === "Activo" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {conductor.estado}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {conductor.telefono}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {conductor.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {conductor.vehiculo}
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="font-medium">
                        Licencia: <span className="text-accent">{conductor.licencia}</span>
                      </span>
                      <span className="font-medium">
                        Experiencia: <span className="text-accent">{conductor.experiencia}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Historial
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
