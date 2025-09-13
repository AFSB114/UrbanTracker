"use client"

import { useState } from "react"
import { Sidebar } from "@/src/components/layout/sidebar"
import { FixedPanel } from "@/src/components/panels/fixed-panel"
import MapView from "@/src/components/map/map-view"
import { MapControls } from "@/src/components/map/map-controls"

export default function Home() {
  const [activePanel, setActivePanel] = useState<string>("routes")
  const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(false)

  const handlePanelChange = (panel: string) => {
    setActivePanel(panel)
    if (isPanelCollapsed) {
      setIsPanelCollapsed(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex relative">
        <Sidebar activePanel={activePanel} onPanelChange={handlePanelChange} />
        <FixedPanel
          activePanel={activePanel}
          isCollapsed={isPanelCollapsed}
          onToggleCollapse={() => setIsPanelCollapsed(!isPanelCollapsed)}
        />
      </div>

      <main className="flex-1 relative overflow-hidden">
        {/* Main Map Component */}
        <MapView isPanelCollapsed={isPanelCollapsed} />
        <MapControls />
      </main>
    </div>
  )
}