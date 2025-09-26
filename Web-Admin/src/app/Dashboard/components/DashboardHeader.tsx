"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export function DashboardHeader() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Invalidate all dashboard queries
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  };

  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm overflow-hidden">
      <div className="flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-zinc-800"
            aria-label="Menú de navegación"
          >
            <span className="sr-only">Menú</span>
            <div className="h-4 w-4">☰</div>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Panel de Control
            </h2>
            <p className="text-sm text-zinc-400">
              Gestiona tu flota de transporte
            </p>
          </div>
        </div>
        <Button
          onClick={handleRefresh}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-zinc-800"
          aria-label="Actualizar datos del dashboard"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}