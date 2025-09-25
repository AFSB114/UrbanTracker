"use client"

import { Sidebar } from "components/sidebar/sidebar"
import { FixedPanel } from "components/panels/fixed-panel"
import MapView from "components/map/map-view"
import { MapControls } from "components/map/map-controls"

export default function DemoPage() {
  // Ancho fijo del sidebar y del panel
  const SIDEBAR_WIDTH = 80; // w-20 en Tailwind = 80px
  const PANEL_WIDTH = 384; // w-96 en Tailwind = 384px
  return (
    <main className="relative h-screen bg-gray-100 flex">
      {/* Sidebar fijo, no se toca */}
      <Sidebar />
      {/* Mapa ocupa todo el espacio restante a la derecha del sidebar */}
      <div className="flex-1 relative h-screen">
        <MapView />
        <MapControls />
        {/* Panel principal sobrepuesto, alineado a la derecha del sidebar */}
        <div
          className="fixed top-0 z-40 h-screen"
          style={{ left: SIDEBAR_WIDTH, width: PANEL_WIDTH }}
        >
          <FixedPanel />
        </div>
      </div>
    </main>
  )
}