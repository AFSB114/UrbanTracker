"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface PanelActiveContextProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

const PanelActiveContext = createContext<PanelActiveContextProps | undefined>(undefined);

export function usePanelActive() {
  const context = useContext(PanelActiveContext);
  if (!context) throw new Error("usePanelActive must be used within PanelActiveProvider");
  return context;
}

export function PanelActiveProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<string>("routes");
  return (
    <PanelActiveContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </PanelActiveContext.Provider>
  );
}
