export interface LoginFormData {
  userName: string;
  password: string;
}

export interface LoginApiResponse {
  token: string;
  success?: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}