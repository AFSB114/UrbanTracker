"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useForgotPassword } from "./hooks/useForgotPassword"

export default function ForgotPasswordPage() {
    const { email, setEmail, isLoading, isEmailSent, errorMessage, handleSubmit, handleContinue, handleResend, router } = useForgotPassword()

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                </button>

                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                        <Image src="/white-logo.svg" alt="Logo" width={50} height={50} />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {isEmailSent ? "Revisa tu email" : "¿Olvidaste tu contraseña?"}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        {isEmailSent
                            ? "Te hemos enviado un código de verificación"
                            : "Te enviaremos un código para restablecer tu contraseña"}
                    </p>
                </div>

                <Card className="border-border bg-card">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center text-card-foreground">
                            {isEmailSent ? "Código enviado" : "Recuperar contraseña"}
                        </CardTitle>
                        <CardDescription className="text-center text-muted-foreground">
                            {isEmailSent
                                ? `Hemos enviado un código de 6 dígitos a ${email}`
                                : "Ingresa tu email para recibir el código de verificación"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isEmailSent ? (
                            <>
                                {errorMessage && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{errorMessage}</AlertDescription>
                                    </Alert>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-card-foreground">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                            Enviando código...
                                        </div>
                                    ) : (
                                        "Enviar código"
                                    )}
                                </Button>
                            </form>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-green-800">Código enviado exitosamente</p>
                                </div>
                                <Button
                                    onClick={handleContinue}
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    Continuar
                                </Button>
                                <div className="text-center">
                                    <button
                                        onClick={handleResend}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                                    >
                                        ¿No recibiste el código? Reenviar
                                    </button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
