"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { SearchBar } from "components/shared/search-bar"
import { RoutesPanel } from "./routes-panel"
import { LocationPanel } from "./location-panel"
import { MessagesPanel } from "./messages-panel"
import { ProfilePanel } from "./profile-panel"
import { usePanelActive } from "components/panels/panel-active-context"
import { usePanelCollapse } from "components/panels/panel-collapse-context"

export function FixedPanel() {
  const { activePanel } = usePanelActive();
  const { isPanelCollapsed, togglePanelCollapse } = usePanelCollapse();

  const renderPanel = () => {
    switch (activePanel) {
      case "routes":
        return <RoutesPanel />
      case "location":
        return <LocationPanel />
      case "messages":
        return <MessagesPanel />
      case "profile":
        return <ProfilePanel />
      default:
        return <RoutesPanel />
    }
  }

  const getPanelTitle = () => {
    switch (activePanel) {
      case "routes":
        return "Rutas recomendadas"
      case "location":
        return "Ubicación"
      case "messages":
        return "Mensajes"
      case "profile":
        return "Perfil"
      default:
        return "Rutas recomendadas"
    }
  }

  if (isPanelCollapsed) {
    return (
      <div className="relative">
        {/* Etiqueta visible cuando está colapsado */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-r-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors z-10"
          onClick={togglePanelCollapse}
        >
          <div className="flex items-center justify-center w-6 h-12">
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col h-full relative">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-white border border-l-0 border-gray-200 rounded-r-md shadow-sm cursor-pointer hover:bg-gray-50 transition-colors z-10"
        onClick={togglePanelCollapse}
      >
        <div className="flex items-center justify-center w-6 h-12">
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="p-4 border-b border-gray-100">
        <SearchBar />
      </div>

      {/* Panel Title y contenido controlado por el panel activo */}
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === "routes" ? (
          <RoutesPanel showTitle />
        ) : renderPanel()}
      </div>
    </div>
  )

}