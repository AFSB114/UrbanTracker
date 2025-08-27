import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, User } from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia en el dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil de Usuario
            </CardTitle>
            <CardDescription>Información básica de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <input
                type="text"
                defaultValue="Usuario Demo"
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue="usuario@ejemplo.com"
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </CardTitle>
            <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notificaciones por Email</p>
                <p className="text-xs text-muted-foreground">Recibe actualizaciones por correo</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notificaciones Push</p>
                <p className="text-xs text-muted-foreground">Alertas en tiempo real</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Reportes Semanales</p>
                <p className="text-xs text-muted-foreground">Resumen semanal de actividad</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Seguridad
            </CardTitle>
            <CardDescription>Configuración de seguridad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Autenticación de Dos Factores</p>
                <p className="text-xs text-muted-foreground">Protección adicional para tu cuenta</p>
              </div>
              <Badge variant="outline">Desactivado</Badge>
            </div>
            <Button variant="outline" size="sm">
              Activar 2FA
            </Button>
            <div className="pt-2">
              <Button variant="outline" size="sm">
                Cambiar Contraseña
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferencias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferencias
            </CardTitle>
            <CardDescription>Personaliza la apariencia del dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tema</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Sistema</option>
                <option>Claro</option>
                <option>Oscuro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Idioma</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Español</option>
                <option>English</option>
                <option>Français</option>
              </select>
            </div>
            <Button>Aplicar Cambios</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
