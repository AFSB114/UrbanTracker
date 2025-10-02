"use client"

import { Bus, MapPin, Info } from "lucide-react"
import { Button } from "components/ui/button"
import { usePanelActive } from "components/panels/panel-active-context"
import { usePanelCollapse } from "components/panels/panel-collapse-context"
import { useRouter, usePathname } from "next/navigation"

export function Sidebar() {
  const { setActivePanel } = usePanelActive()
  const { isPanelCollapsed, togglePanelCollapse } = usePanelCollapse()
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    { id: "routes", icon: Bus, label: "Rutas", path: "/map/routes" },
    { id: "stop-info", icon: MapPin, label: "Paraderos", path: "/map/stops" },
    { id: "general-info", icon: Info, label: "Información", path: "/map/info" },
  ]

  const getActivePanel = () => {
    if (pathname.startsWith("/map/routes")) return "routes"
    if (pathname.startsWith("/map/stops")) return "stop-info"
    if (pathname.startsWith("/map/info")) return "general-info"
    return "routes" // default
  }

  const activePanel = getActivePanel()

  const handleNavigation = (item: typeof navigationItems[0]) => {
    setActivePanel(item.id)
    router.push(item.path)
    if (isPanelCollapsed) togglePanelCollapse()
  }

  return (
    <div className="w-20 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
      <div className="flex flex-col items-center space-y-1 mb-8">
        <a href="/" className="w-15 h-15 flex items-center justify-center" title="Ir a la página principal">
          <img src="/logo-icon-white.svg" alt="UrbanTracker Logo" className="w-13 h-13 object-contain" />
        </a>
  <span className="text-[10px] font-medium text-zinc-100 text-center leading-tight px-0">UrbanTracker</span>
      </div>

      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activePanel === item.id ? "default" : "ghost"}
          size="icon"
          onClick={() => handleNavigation(item)}
          title={item.label}
          className={`w-12 h-12 rounded-xl transition-colors ${activePanel === item.id
            ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            }`}
        >
          <item.icon className="h-8 w-8" />
          <span className="sr-only">{item.label}</span>
        </Button>
      ))}
    </div>
  )
}
