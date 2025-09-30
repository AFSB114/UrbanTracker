export interface ResetPasswordFormData {
  email: string;
  newPassword: string;
}

export interface ResetPasswordApiResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
}