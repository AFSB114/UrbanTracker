import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordService } from "../services/resetPasswordService";
import { ResetPasswordFormData } from "../types/resetPasswordTypes";

export const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data: ResetPasswordFormData = { email, newPassword: password };
      const response = await resetPasswordService.resetPassword(data, token);
      if (response.success) {
        setSuccessMessage(response.message || "Contraseña actualizada correctamente");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError(response.message || "Error al actualizar la contraseña");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al conectar con el servidor");
    }

    setIsLoading(false);
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    error,
    successMessage,
    email,
    handleSubmit,
    router,
  };
};