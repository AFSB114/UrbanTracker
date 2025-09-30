import { API_ENDPOINTS } from "./config";
import { VerifyOTPFormData, VerifyOtpApiResponse } from "../../types/verifyOtpTypes";

export const verifyOtpApi = async (data: VerifyOTPFormData): Promise<VerifyOtpApiResponse> => {
  const response = await fetch(API_ENDPOINTS.validateCode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al validar el código");
  }

  return result;
};

export const resendOtpApi = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(API_ENDPOINTS.forgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error al reenviar el código");
  }

  return result;
};