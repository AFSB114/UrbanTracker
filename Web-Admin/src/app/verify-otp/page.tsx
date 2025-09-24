"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OTPInput } from "@/components/otp-input"
import { ArrowLeft } from "lucide-react"

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""

    const handleOTPComplete = (otpValue: string) => {
        setOtp(otpValue)
        setError("")
    }

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError("Por favor ingresa el código completo")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // Simular verificación del código
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Simular código correcto (123456)
            if (otp === "123456") {
                router.push(`/reset-password?token=mock-reset-token&email=${encodeURIComponent(email)}`)
            } else {
                setError("Código incorrecto. Inténtalo de nuevo.")
            }
        } catch (error) {
            setError("Error al verificar el código. Inténtalo de nuevo.")
        }

        setIsLoading(false)
    }

    const handleResendCode = async () => {
        setError("")
        // Simular reenvío de código
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Mostrar mensaje de éxito o manejar reenvío
    }

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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Verificar código</h1>
                    <p className="text-muted-foreground mt-2">Ingresa el código de 6 dígitos que enviamos a tu email</p>
                </div>

                <Card className="border-border bg-card">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center text-card-foreground">Código de verificación</CardTitle>
                        <CardDescription className="text-center text-muted-foreground">Enviado a {email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <OTPInput length={6} onComplete={handleOTPComplete} className="justify-center" />

                            <Button
                                onClick={handleVerify}
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                disabled={isLoading || otp.length !== 6}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Verificando...
                                    </div>
                                ) : (
                                    "Confirmar código"
                                )}
                            </Button>
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">¿No recibiste el código?</p>
                            <button
                                onClick={handleResendCode}
                                className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
                            >
                                Reenviar código
                            </button>
                        </div>

                        <div className="text-center text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            <p className="font-medium mb-1">Para pruebas:</p>
                            <p>
                                Usa el código: <span className="font-mono font-bold">123456</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}