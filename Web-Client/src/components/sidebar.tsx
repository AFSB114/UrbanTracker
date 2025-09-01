"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Route, Truck, Clock, Settings, User, MapPin } from "lucide-react"

const navigationItems = [
  { id: "routes", icon: Route, label: "Rutas" },
  { id: "vehicles", icon: Truck, label: "Vehículos" },
  { id: "schedule", icon: Clock, label: "Horarios" },
  { id: "settings", icon: Settings, label: "Configuración" },
  { id: "profile", icon: User, label: "Perfil" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("routes")

  return (
    <div className="w-20 bg-black flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2">
          <MapPin className="w-6 h-6 text-black" />
        </div>
        <div className="text-white text-xs font-medium leading-tight">
          Urban
          <br />
          Tracker
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={`w-12 h-12 rounded-lg transition-all ${
                isActive
                  ? "bg-gray-800 text-white border border-gray-600"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="w-5 h-5" />
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
