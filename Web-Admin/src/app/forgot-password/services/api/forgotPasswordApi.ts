import { API_ENDPOINTS } from "./config";
import { ForgotPasswordFormData, ForgotPasswordApiResponse } from "../../types/forgotPasswordTypes";

export const forgotPasswordApi = async (data: ForgotPasswordFormData): Promise<ForgotPasswordApiResponse> => {
  const response = await fetch(API_ENDPOINTS.forgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al enviar el email");
  }

  return result;
};