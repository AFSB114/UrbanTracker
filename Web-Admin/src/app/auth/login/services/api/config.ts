export const API_BASE_URL = "http://localhost:8080/api/v1/public/auth";

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  new: `http://localhost:8080/api/v1/public/security/recovery-request/new`,
}as const;  