"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getToken, validateToken } from "@/lib/auth"
import { Button } from "@/components/ui/button"

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
                <div className="animate-pulse">
                    <Image
                        src="/white-logo.svg"
                        alt="UrbanTracker Logo"
                        width={300}
                        height={75}
                        className="mx-auto mb-6 opacity-80"
                    />
                </div>
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
    )
}
