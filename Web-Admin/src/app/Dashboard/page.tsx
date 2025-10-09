"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Car, RefreshCw, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, memo } from "react"
import { decodeJWT } from "@/lib/utils"
import { useDashboard } from "./hooks/useDashboard"
import { Button } from "@/components/ui/button"

function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError, refetch } = useDashboard()


  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/")
      return
    }

    const decoded = decodeJWT(token)

    if (!decoded || (decoded.exp && decoded.exp < Date.now() / 1000)) {
      localStorage.removeItem("token")
      router.push("/")
      return
    }

    setUser({ email: decoded.email || decoded.name || "usuario@ejemplo.com" })
  }, [router])

  if (isDashboardLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-foreground">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          Cargando datos del dashboard...
        </div>
      </div>
    )
  }

  if (dashboardError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Error al cargar datos</h2>
            <p className="text-zinc-400 mb-4">{dashboardError}</p>
            <Button onClick={refetch} className="bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-white">
          Bienvenido a UrbanTracker
        </h1>
        <p className="text-zinc-400 mt-2">
          Panel de control para la gestión de tu flota de transporte
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          className="bg-zinc-900 border-zinc-800 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-zinc-800 group"
          role="region"
          aria-labelledby="drivers-title"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="drivers-title" className="text-sm font-medium text-zinc-400">
              Total Conductores
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white" aria-label={`${dashboardData?.stats.totalDrivers || 0} conductores totales`}>
              {dashboardData?.stats.totalDrivers || 0}
            </div>
            <p className="text-xs text-zinc-500">+{Math.floor((dashboardData?.stats.totalDrivers || 0) * 0.1)} nuevos este mes</p>
          </CardContent>
        </Card>

        <Card
          className="bg-zinc-900 border-zinc-800 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-zinc-800 group"
          role="region"
          aria-labelledby="vehicles-title"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="vehicles-title" className="text-sm font-medium text-zinc-400">
              Vehículos Activos
            </CardTitle>
            <Car className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white" aria-label={`${dashboardData?.stats.activeVehicles || 0} vehículos activos`}>
              {dashboardData?.stats.activeVehicles || 0}
            </div>
            <p className="text-xs text-zinc-500">{dashboardData?.stats.totalVehicles ? Math.round((dashboardData.stats.activeVehicles / dashboardData.stats.totalVehicles) * 100) : 0}% de la flota operativa</p>
          </CardContent>
        </Card>

        <Card
          className="bg-zinc-900 border-zinc-800 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 transform hover:bg-zinc-800 group"
          role="region"
          aria-labelledby="companies-title"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle id="companies-title" className="text-sm font-medium text-zinc-400">
              Total Empresas
            </CardTitle>
            <Building2 className="h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white" aria-label={`${dashboardData?.stats.totalCompanies || 0} empresas totales`}>
              {dashboardData?.stats.totalCompanies || 0}
            </div>
            <p className="text-xs text-zinc-500">Empresas registradas</p>
          </CardContent>
        </Card>
      </div>



    </div>
  );
}

export default memo(DashboardPage);