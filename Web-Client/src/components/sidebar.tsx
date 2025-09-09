import { Truck, MapPin, MessageCircle, User } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export function Sidebar() {
  const navigationItems = [
    { icon: Truck, label: "Rutas", active: true },
    { icon: MapPin, label: "Ubicación", active: false },
    { icon: MessageCircle, label: "Mensajes", active: false },
    { icon: User, label: "Perfil", active: false },
  ]

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
      {navigationItems.map((item, index) => (
        <Button
          key={index}
          variant={item.active ? "default" : "ghost"}
          size="icon"
          className={`w-12 h-12 rounded-xl ${
            item.active
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
