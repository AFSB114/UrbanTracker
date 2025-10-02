"use client";

import { PanelActiveProvider } from "components/panels/panel-active-context";
import { PanelCollapseProvider } from "components/panels/panel-collapse-context";
import { VehicleProvider } from "components/map/vehicle-context";
import { RouteProvider } from "components/map/route-context";
import { Sidebar } from "components/sidebar/sidebar";
import MapView from "components/map/map-view";
import { MapControls } from "components/map/map-controls";

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VehicleProvider>
      <RouteProvider>
        <PanelActiveProvider>
          <PanelCollapseProvider>
            <main className="relative h-screen bg-[#18181b] flex">
              <Sidebar />
              <div className="flex-1 relative h-screen">
                <MapView>
                  <MapControls />
                </MapView>
                <div className="fixed top-0 left-20 w-96 z-40 h-screen">
                  {children}
                </div>
              </div>
            </main>
          </PanelCollapseProvider>
        </PanelActiveProvider>
      </RouteProvider>
    </VehicleProvider>
  );
}