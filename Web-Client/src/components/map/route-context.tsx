import React, { createContext, useContext, useState } from 'react';

interface RouteContextType {
  outboundPoints: [number, number][] | null;
  returnPoints: [number, number][] | null;
  setOutboundPoints: React.Dispatch<React.SetStateAction<[number, number][] | null>>;
  setReturnPoints: React.Dispatch<React.SetStateAction<[number, number][] | null>>;
}

const RouteContext = createContext<RouteContextType | null>(null);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [outboundPoints, setOutboundPoints] = useState<[number, number][] | null>(null);
  const [returnPoints, setReturnPoints] = useState<[number, number][] | null>(null);

  return (
    <RouteContext.Provider value={{ outboundPoints, returnPoints, setOutboundPoints, setReturnPoints }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoutePoints() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error('useRoutePoints debe usarse dentro de RouteProvider');
  return ctx;
}