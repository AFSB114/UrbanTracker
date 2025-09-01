"use client"

import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  activeSection: string
  onMenuClick: () => void
  onPanelClick: () => void
}

export function MobileHeader({ activeSection, onMenuClick, onPanelClick }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-gray-200 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button
          id="hamburger-button"
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="hover:bg-accent/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold capitalize">{activeSection}</h1>
      </div>

      <Button variant="ghost" size="sm" onClick={onPanelClick} className="hover:bg-accent/10 transition-colors">
        <Search className="w-5 h-5" />
      </Button>
    </header>
  )
}
