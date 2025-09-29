"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getToken, validateToken } from "@/lib/auth"
import Image from "next/image"
import whiteLogo from "@Public/white-logo.svg"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isValidating, setIsValidating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/auth/login", "/forgot-password", "/reset-password", "/verify-otp"]

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    const checkAuth = async () => {
      if (isPublicRoute) {
        setIsValidating(false)
        setIsAuthenticated(true) // Permitir acceso a rutas públicas
        return
      }

      const token = getToken()

      if (!token) {
        router.push("/auth/login")
        setIsValidating(false)
        return
      }

      const isValid = await validateToken(token)

      if (isValid) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("token")
        router.push("/auth/login")
      }

      setIsValidating(false)
    }

    checkAuth()
  }, [pathname, router, isPublicRoute])

  if (isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <Image
              src="/white-logo.svg"
              alt="UrbanTracker Logo"
              className="mx-auto mb-6 opacity-80 w-72 h-auto"
              width={72}
              height={72}
            />
          </div>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !isPublicRoute) {
    return null // No renderizar nada mientras redirige
  }

  return <>{children}</>
}