import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpService } from "../services/verifyOtpService";
import { VerifyOTPFormData } from "../types/verifyOtpTypes";

export const useVerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Por favor ingresa el código completo");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const data: VerifyOTPFormData = { email, code: otp };
      const response = await verifyOtpService.verifyOtp(data);
      if (response.token) {
        router.push(`/reset-password?token=${response.token}&email=${encodeURIComponent(email)}`);
      } else {
        setError(response.message || "Error al validar el código");
      }
    } catch (err) {
      console.error("Error sending reset email:", err);
      setError(err instanceof Error ? err.message : "Error al conectar con el servidor");
    }

    setIsLoading(false);
  };

  const handleResendCode = async () => {
    try {
      await verifyOtpService.resendOtp(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al reenviar el código");
    }
  };

  return {
    otp,
    isLoading,
    error,
    email,
    handleOTPComplete,
    handleVerify,
    handleResendCode,
    router,
  };
};