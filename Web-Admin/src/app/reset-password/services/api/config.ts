export const API_BASE_URL = "http://localhost:8080/api/v1/public/auth";

export const API_ENDPOINTS = {
  changePassword: `${API_BASE_URL}/change-password`,
} as const;