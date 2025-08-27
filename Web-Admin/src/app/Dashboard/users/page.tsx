import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"

export default function UsuariosPage() {
  const usuarios = [
    { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", estado: "Activo", fechaRegistro: "2024-01-15" },
    { id: 2, nombre: "Carlos López", email: "carlos@ejemplo.com", estado: "Inactivo", fechaRegistro: "2024-01-10" },
    { id: 3, nombre: "María Rodríguez", email: "maria@ejemplo.com", estado: "Activo", fechaRegistro: "2024-01-08" },
    { id: 4, nombre: "Juan Martínez", email: "juan@ejemplo.com", estado: "Pendiente", fechaRegistro: "2024-01-05" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona todos los usuarios de tu plataforma</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>Todos los usuarios registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar usuarios..."
                className="pl-8 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha Registro</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b">
                    <td className="p-4 align-middle font-medium">{usuario.nombre}</td>
                    <td className="p-4 align-middle text-muted-foreground">{usuario.email}</td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant={
                          usuario.estado === "Activo"
                            ? "default"
                            : usuario.estado === "Inactivo"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {usuario.estado}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">{usuario.fechaRegistro}</td>
                    <td className="p-4 align-middle">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
