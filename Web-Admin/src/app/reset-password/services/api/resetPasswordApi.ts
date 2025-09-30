import { API_ENDPOINTS } from "./config";
import { ResetPasswordFormData, ResetPasswordApiResponse } from "../../types/resetPasswordTypes";

export const resetPasswordApi = async (data: ResetPasswordFormData, token: string): Promise<ResetPasswordApiResponse> => {
  const response = await fetch(API_ENDPOINTS.changePassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al actualizar la contraseña");
  }

  return result;
};