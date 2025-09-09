"use client"

import { X } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { RoutesPanel } from "./routes-panel"
import { LocationPanel } from "./location-panel"
import { MessagesPanel } from "./messages-panel"
import { ProfilePanel } from "./profile-panel"

interface PanelContainerProps {
  activePanel: string
  onClose: () => void
}

export function PanelContainer({ activePanel, onClose }: PanelContainerProps) {
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
        return null
    }
  }

  return (
    <div className="absolute top-4 left-4 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-20">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900 capitalize">{activePanel}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-gray-100">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">{renderPanel()}</div>
    </div>
  )
}
