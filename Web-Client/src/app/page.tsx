"use client"

import { useState } from "react"
import { Sidebar } from "@/src/components/layout/sidebar"
import { FixedPanel } from "@/src/components/panels/fixed-panel"
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
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <MapControls />
      </main>
    </div>
  )
}
