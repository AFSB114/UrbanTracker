import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordService } from "../services/forgotPasswordService";
import { ForgotPasswordFormData } from "../types/forgotPasswordTypes";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data: ForgotPasswordFormData = { email };
      const response = await forgotPasswordService.forgotPassword(data);
      if (response.success) {
        setIsEmailSent(true);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setErrorMessage("Error al conectar con el servidor");
    }

    setIsLoading(false);
  };

  const handleContinue = () => {
    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  };

  const handleResend = async () => {
    setIsEmailSent(false);
    setErrorMessage("");
    await handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  return {
    email,
    setEmail,
    isLoading,
    isEmailSent,
    errorMessage,
    handleSubmit,
    handleContinue,
    handleResend,
    router,
  };
};