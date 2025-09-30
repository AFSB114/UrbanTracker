import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/loginService";
import { LoginFormData } from "../types/loginTypes";

export const useLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data: LoginFormData = { userName, password };
      const response = await loginService.login(data);
      localStorage.setItem("token", response.token);
      router.push("/Dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }

    setIsLoading(false);
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
    router,
  };
};