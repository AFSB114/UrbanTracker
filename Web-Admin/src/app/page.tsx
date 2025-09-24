"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function LoginPage() {
    const [userName, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("http://localhost:8086/api/v1/public/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName, password }),
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                localStorage.setItem("token", data.token)
                router.push("/Dashboard")
            } else {
                setError("Credenciales inválidas")
            }
        } catch (error) {
           return setError("Error al iniciar sesión. Inténtalo de nuevo.")
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                        <Image src="/white-logo.svg" alt="Logo" width={50} height={50} />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Bienvenido</h1>
                    <p className="text-muted-foreground mt-2">Inicia sesión en tu cuenta</p>
                </div>

                <Card className="border-border bg-card">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center text-card-foreground">Iniciar sesión</CardTitle>
                        <CardDescription className="text-center text-muted-foreground">
                            Ingresa tus credenciales para acceder
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">{error}</div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-card-foreground">
                                    Nombre del usuario
                                </Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Admin123456"
                                    value={userName}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-card-foreground">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-ring"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Iniciando sesión...
                                    </div>
                                ) : (
                                    "Iniciar sesión"
                                )}
                            </Button>
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => router.push("/forgot-password")}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
