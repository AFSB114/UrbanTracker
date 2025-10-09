"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useLogin } from "./hooks/useLogin"
import { newMethodo } from "./services/api/loginApi"

export default function LoginPage() {
    const { userName, setUserName, password, setPassword, isLoading, error, handleLogin, router } = useLogin()

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Image src="/white-complete-logo.svg" alt="Logo" width={200} height={50} />
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
                                <Label htmlFor="userName" className="text-card-foreground">
                                    Nombre del usuario
                                </Label>
                                <Input
                                    id="userName"
                                    type="text"
                                    placeholder="Admin123456"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
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
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/100 transition-colors"
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
                    {/* //nuevo metodo */}
                    <div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={newMethodo}>
                            nuevo metodo
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}