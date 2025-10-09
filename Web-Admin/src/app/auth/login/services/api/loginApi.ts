import { API_ENDPOINTS } from "./config";
import { LoginFormData, LoginApiResponse, ApiError } from "../../types/loginTypes";

export const loginApi = async (data: LoginFormData): Promise<LoginApiResponse> => {
  const response = await fetch(API_ENDPOINTS.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Credenciales inválidas");
  }

  return await response.json();
};

export const newMethodo = async () => {
  await fetch(API_ENDPOINTS.new, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

};