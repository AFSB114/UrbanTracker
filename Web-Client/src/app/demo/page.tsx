"use client"

import { Sidebar } from "components/sidebar/sidebar"
import { FixedPanel } from "components/panels/fixed-panel"
import MapView from "components/map/map-view"
import { MapControls } from "components/map/map-controls"

export default function DemoPage() {
  return (
    <main className="flex h-screen bg-gray-100">
      <div className="flex relative">
        <Sidebar />
        <FixedPanel />
      </div>
      <div className="flex-1 relative overflow-hidden">
        <MapView />
        <MapControls />
      </div>
    </main>
  )
}