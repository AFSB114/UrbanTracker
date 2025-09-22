import type React from "react"
import { Users, Route, Car, BarChart3, Settings, Menu, FileText, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import "../globals.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 shadow-2xl">
        <div className="flex h-20 items-center px-8 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Image
              src="/white-logo.svg"
              alt="Logo UrbanTracker"
              width={280}
              height={280}
              className="mx-auto h-11 w-11"
            />
            <div>
              <h1 className="text-xl font-bold text-white">UrbanTracker</h1>
              <p className="text-sm text-zinc-400">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-6">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Principal
            </h3>
            <Link
              href="/Dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
            >
              <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Gestión
            </h3>
            <div className="space-y-1">
              <Link
                href="/Dashboard/drivers"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
              >
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
                <span className="font-medium">Administrar Conductores</span>
              </Link>
              <Link
                href="/Dashboard/routes"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
              >
                <Route className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
                <span className="font-medium">Administrar Rutas</span>
              </Link>
              <Link
                href="/Dashboard/vehicles"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
              >
                <Car className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
                <span className="font-medium">Administrar Vehículos</span>
              </Link>
              <Link
                href="/Dashboard/company"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
              >
                <Building className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
                <span className="font-medium">Administrar Empresas</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Sistema
            </h3>
            <div className="space-y-1">
              <Link
                href="/dashboard/reportes"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
              >
                <FileText className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
                <span className="font-medium">Reportes</span>
              </Link>
              <Link
                href="/Dashboard/configuration"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all duration-300 group hover:shadow-lg hover:scale-105 transform"
              >
                <Settings className="h-5 w-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400" />
                <span className="font-medium">Configuración</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-72">
        {/* Header */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm overflow-hidden">
          <div className="flex h-20 items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-zinc-800"
              >
                <Menu className="h-4 w-4" />
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
          </div>
        </header>

        {/* Page content */}
        <main className="p-8 bg-zinc-900 min-h-[calc(100vh-5rem)] relative overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
