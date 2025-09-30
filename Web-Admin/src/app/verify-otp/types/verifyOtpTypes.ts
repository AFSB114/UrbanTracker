export interface VerifyOTPFormData {
  email: string;
  code: string;
}

export interface VerifyOtpApiResponse {
  token: string;
  success?: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}