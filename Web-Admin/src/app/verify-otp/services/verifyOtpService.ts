import { verifyOtpApi, resendOtpApi } from "./api/verifyOtpApi";
import { VerifyOTPFormData, VerifyOtpApiResponse } from "../types/verifyOtpTypes";

export const verifyOtpService = {
  async verifyOtp(data: VerifyOTPFormData): Promise<VerifyOtpApiResponse> {
    return await verifyOtpApi(data);
  },

  async resendOtp(email: string): Promise<{ success: boolean; message: string }> {
    return await resendOtpApi(email);
  },
};