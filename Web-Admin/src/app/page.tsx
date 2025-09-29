"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken, validateToken } from "@/lib/auth"

export default function HomePage() {
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken()

            if (!token) {
                router.push("/auth/login")
                return
            }

            const isValid = await validateToken(token)

            if (isValid) {
                router.push("/Dashboard")
            } else {
                // Token inválido, limpiar y redirigir a login
                localStorage.removeItem("token")
                router.push("/auth/login")
            }
        }

        checkAuth()
    }, [router])

    // Mostrar loading mientras verifica
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Verificando autenticación...</p>
            </div>
        </div>
    )
}
