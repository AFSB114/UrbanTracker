"use client"

import { Button } from "@/components/ui/button"
import { Plus, Minus, Navigation } from "lucide-react"

export function MainContent() {
  return (
    <div className="flex-1 bg-gray-100 relative">
      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <div className="flex flex-col">
          <Button
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 bg-white border-gray-300 hover:bg-gray-50 rounded-t-md rounded-b-none"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 bg-white border-gray-300 hover:bg-gray-50 rounded-b-md rounded-t-none border-t-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="w-8 h-8 p-0 bg-white border-gray-300 hover:bg-gray-50 rounded-md"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
