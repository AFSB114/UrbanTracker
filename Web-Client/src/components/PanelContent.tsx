"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  CalendarIcon,
  Clock,
  SettingsIcon,
  UserIcon,
  FileText,
  BarChart,
  PieChart,
  Plus,
} from "lucide-react"

interface PanelContentProps {
  activeSection: string
  searchQuery?: string
}

export function PanelContent({ activeSection, searchQuery = "" }: PanelContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-4 space-y-4">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent" />
                  Métricas en Tiempo Real
                </h3>
                <Badge variant="secondary">Actualizado</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Usuarios Activos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">1,234</span>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Ventas Hoy</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">€2,456</span>
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Acciones Rápidas</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Proyecto
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Generar Reporte
                </Button>
              </div>
            </Card>
          </div>
        )

      case "analytics":
        return (
          <div className="p-4 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-accent" />
                  Reportes Disponibles
                </h3>
                <Badge variant="outline">3 nuevos</Badge>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-muted rounded-lg text-sm transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-blue-500" />
                    <span>Reporte Mensual</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    PDF
                  </Badge>
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded-lg text-sm transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Análisis de Tráfico</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Excel
                  </Badge>
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded-lg text-sm transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-500" />
                    <span>Métricas de Rendimiento</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    CSV
                  </Badge>
                </button>
              </div>
            </Card>
          </div>
        )

      case "calendar":
        return (
          <div className="p-4 space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-accent" />
                  Próximos Eventos
                </h3>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-accent bg-accent/5 rounded-r-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Reunión de Equipo</p>
                    <Badge variant="outline" className="text-xs">
                      Hoy
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>14:00 - 15:30</span>
                  </div>
                </div>
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">Presentación Cliente</p>
                    <Badge variant="outline" className="text-xs">
                      Mañana
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>10:00 - 11:00</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div className="p-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <SettingsIcon className="w-4 h-4 text-accent" />
                Configuración
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-muted rounded-lg text-sm transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Preferencias Generales</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded-lg text-sm transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Notificaciones</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    2
                  </Badge>
                </button>
                <button className="w-full text-left p-3 hover:bg-muted rounded-lg text-sm transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>Seguridad</span>
                  </div>
                </button>
              </div>
            </Card>
          </div>
        )

      case "profile":
        return (
          <div className="p-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <UserIcon className="w-4 h-4 text-accent" />
                Mi Perfil
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground font-semibold text-lg">U</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-medium">Usuario Administrador</p>
                    <p className="text-sm text-muted-foreground">usuario@ejemplo.com</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      En línea
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    Editar Perfil
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    Cambiar Contraseña
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )

      default:
        return (
          <div className="p-4">
            <p className="text-muted-foreground text-center">Selecciona una sección para ver el contenido</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-full">
      {searchQuery && (
        <div className="p-4 bg-muted/30 border-b border-gray-200">
          <p className="text-sm text-muted-foreground">
            Buscando: <strong>{searchQuery}</strong>
          </p>
        </div>
      )}
      {renderContent()}
    </div>
  )
}
