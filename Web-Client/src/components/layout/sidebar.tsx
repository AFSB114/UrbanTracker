"use client"

import { Truck, MapPin, MessageCircle, User } from "lucide-react"
import { Button } from "components/ui/button"

interface SidebarProps {
  activePanel: string
  onPanelChange: (panel: string) => void
}

export function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const navigationItems = [
    { id: "routes", icon: Truck, label: "Rutas" },
    { id: "location", icon: MapPin, label: "Ubicación" },
    { id: "messages", icon: MessageCircle, label: "Mensajes" },
    { id: "profile", icon: User, label: "Perfil" },
  ]

  return (
    <div className="w-24 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
      <div className="flex flex-col items-center space-y-2 mb-4">
        <div className="w-16 h-16 flex items-center justify-center">
          <img src="/logo.svg" alt="UrbanTracker Logo" className="w-14 h-14 object-contain" />
        </div>
        <span className="text-xs font-medium text-gray-700 text-center leading-tight px-1">UrbanTracker</span>
      </div>

      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activePanel === item.id ? "default" : "ghost"}
          size="icon"
          onClick={() => onPanelChange(item.id)}
          className={`w-12 h-12 rounded-xl transition-colors ${
            activePanel === item.id
              ? "bg-black text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <item.icon className="h-6 w-6" />
          <span className="sr-only">{item.label}</span>
        </Button>
      ))}
    </div>
  )
}
