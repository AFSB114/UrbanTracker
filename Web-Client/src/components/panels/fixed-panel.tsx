"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { SearchBar } from "components/shared/search-bar"
import { RoutesPanel } from "./routes-panel"
import { StopInfoPanel } from "./stop-info-panel"
import { GeneralInfoPanel } from "./general-info-panel"
import { usePanelActive } from "components/panels/panel-active-context"
import { usePanelCollapse } from "components/panels/panel-collapse-context"
import { useRoute } from "components/map/route-context"
import { useRouter } from "next/navigation"

export function FixedPanel() {
  const { activePanel } = usePanelActive();
  const { isPanelCollapsed, togglePanelCollapse } = usePanelCollapse();
  const { selectedRoute, setSelectedRoute } = useRoute();
  const router = useRouter();

  const handleRouteSelection = (routeId: number | null) => {
    setSelectedRoute(routeId);
    if (routeId !== null) {
      router.push(`/map/routes/${routeId}`);
    } else {
      router.push("/map/routes");
    }
  };

  const renderPanel = () => {
    switch (activePanel) {
      case "routes":
        return <RoutesPanel showTitle selected={selectedRoute} setSelected={handleRouteSelection} />
      case "stop-info":
        return <StopInfoPanel />
      case "general-info":
        return <GeneralInfoPanel />
      default:
        return <RoutesPanel showTitle selected={selectedRoute} setSelected={handleRouteSelection} />
    }
  }

  return (
    <div className="fixed-panel-anim-wrapper">
      <div className={`fixed-panel-anim-panel ${isPanelCollapsed ? "collapsed" : "expanded"} w-96 bg-zinc-900/50 border-r border-zinc-800 flex flex-col h-full relative backdrop-blur-sm`}>
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-zinc-800 border border-l-0 border-zinc-700 rounded-r-md shadow-sm cursor-pointer hover:bg-zinc-700 transition-colors z-10"
          onClick={togglePanelCollapse}
        >
          <div className="flex items-center justify-center w-6 h-12">
            <ChevronLeft className="h-4 w-4 text-zinc-300" />
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="p-4 border-b border-zinc-800 bg-transparent">
          <SearchBar />
        </div>

        {/* Panel Title y contenido controlado por el panel activo */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
          {renderPanel()}
        </div>
      </div>
      {/* Botón para expandir cuando está colapsado */}
      {isPanelCollapsed && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 border border-zinc-700 rounded-r-md shadow-sm cursor-pointer hover:bg-zinc-700 transition-colors z-10"
          onClick={togglePanelCollapse}
        >
          <div className="flex items-center justify-center w-6 h-12">
            <ChevronRight className="h-4 w-4 text-zinc-300" />
          </div>
        </div>
      )}
    </div>
  );
}
