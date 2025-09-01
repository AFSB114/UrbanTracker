"use client"

import type React from "react"

import { X, Search, Filter, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { PanelContent } from "./PanelContent"
import { useState, useEffect } from "react"

interface DynamicPanelProps {
  isOpen: boolean
  activeSection: string
  onClose: () => void
  isMobile?: boolean
  isTablet?: boolean
}

export function DynamicPanel({
  isOpen,
  activeSection,
  onClose,
  isMobile = false,
  isTablet = false,
}: DynamicPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setSearchQuery("")
  }, [activeSection])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isAnimating && !isOpen) return null

  return (
    <div
      className={cn(
        "bg-popover border-r border-gray-200 shadow-2xl z-40 transition-all duration-300 ease-out",
        /* Reemplazando border-border con border-gray-200 */
        isMobile
          ? cn(
              "fixed inset-x-4 top-20 bottom-4 rounded-lg",
              isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95",
            )
          : isTablet
            ? cn(
                "fixed inset-y-0 right-0 w-full max-w-md",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
              )
            : cn(
                "fixed left-[280px] top-0 h-full w-[320px]",
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
              ),
      )}
      role="complementary"
      aria-label={`Panel de ${activeSection}`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Header con barra de búsqueda */}
      <div className="p-4 border-b border-gray-200 bg-popover/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-popover-foreground capitalize">{activeSection}</h2>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" aria-hidden="true" />
          </div>
          <div className="flex items-center space-x-1">
            {!isMobile && (
              <>
                <button
                  className="p-1.5 hover:bg-muted rounded-md transition-colors duration-200"
                  aria-label="Filtros"
                  title="Filtros"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  className="p-1.5 hover:bg-muted rounded-md transition-colors duration-200"
                  aria-label="Más opciones"
                  title="Más opciones"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-muted rounded-md transition-colors duration-200"
              aria-label="Cerrar panel"
              title="Cerrar panel (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors duration-200" />
          <input
            type="text"
            placeholder={`Buscar en ${activeSection}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-input border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 hover:border-ring/50"
            /* Reemplazando border-border con border-gray-200 */
            aria-label="Buscar en la sección actual"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 hover:bg-muted rounded transition-colors duration-200"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <PanelContent activeSection={activeSection} searchQuery={searchQuery} />
      </div>

      {/* Footer del panel */}
      <div className="p-4 border-t border-gray-200 bg-popover/95 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Sección: {activeSection}</span>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span>Activo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
