export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordApiResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
}