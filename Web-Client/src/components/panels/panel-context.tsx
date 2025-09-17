"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface PanelContextProps {
  activePanel: string
  setActivePanel: (panel: string) => void
  isPanelCollapsed: boolean
  togglePanelCollapse: () => void
}

const PanelContext = createContext<PanelContextProps | undefined>(undefined)

export function usePanelContext() {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error("usePanelContext must be used within a PanelProvider")
  }
  return context
}

export function PanelProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<string>("routes")
  const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(false)

  const handleSetActivePanel = (panel: string) => {
    setActivePanel(panel)
    if (isPanelCollapsed) setIsPanelCollapsed(false)
  }

  const togglePanelCollapse = () => setIsPanelCollapsed((prev) => !prev)

  return (
    <PanelContext.Provider
      value={{
        activePanel,
        setActivePanel: handleSetActivePanel,
        isPanelCollapsed,
        togglePanelCollapse,
      }}
    >
      {children}
    </PanelContext.Provider>
  )
}
