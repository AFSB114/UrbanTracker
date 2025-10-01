"use client"

import { Sidebar } from "components/sidebar/sidebar"
import { FixedPanel } from "components/panels/fixed-panel"
import MapView from "components/map/map-view"
import { MapControls } from "components/map/map-controls"
import { VehicleProvider } from "components/map/vehicle-context"
import { RouteProvider } from "components/map/route-context"

export default function DemoPage() {
  return (
    <VehicleProvider>
      <RouteProvider>
        <main className="relative h-screen bg-[#18181b] flex">
          <Sidebar />
          <div className="flex-1 relative h-screen">
            <MapView>
              <MapControls />
            </MapView>
            <div className="fixed top-0 left-20 w-96 z-40 h-screen">
              <FixedPanel />
            </div>
          </div>
        </main>
      </RouteProvider>
    </VehicleProvider>
  );
}