"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OTPInput } from "@/components/otp-input"

export default function ForgotPasswordPage() {
    const [otp, setOtp] = useState("")

    const handleOTPComplete = (otpValue: string) => {
        setOtp(otpValue)
        console.log("OTP para reset de contraseña:", otpValue)
        // Aquí manejarías el envío del OTP para reset de contraseña
    }

    const handleResetPassword = () => {
        console.log("Reset de contraseña solicitado con OTP:", otp)
        // Aquí manejarías el reset de contraseña
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo/Brand */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Restablecer contraseña</h1>
                    <p className="text-muted-foreground mt-2">
                        Ingresa el código de 6 dígitos enviado a tu email
                    </p>
                </div>

                <Card className="border-border bg-card">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center text-card-foreground">
                            Verificación de código
                        </CardTitle>
                        <CardDescription className="text-center text-muted-foreground">
                            Ingresa el código de 6 dígitos que enviamos a tu email para restablecer tu contraseña
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <OTPInput length={6} onComplete={handleOTPComplete} className="justify-center" />
                        </div>
                        <Button
                            onClick={handleResetPassword}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            disabled={otp.length !== 6}
                        >
                            Restablecer contraseña
                        </Button>
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">¿No recibiste el código?</p>
                            <button
                                type="button"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                            >
                                Reenviar código
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>
                        {"Al continuar, aceptas nuestros "}
                        <button className="underline underline-offset-4 hover:text-foreground transition-colors">
                            Términos de servicio
                        </button>
                        {" y "}
                        <button className="underline underline-offset-4 hover:text-foreground transition-colors">
                            Política de privacidad
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}