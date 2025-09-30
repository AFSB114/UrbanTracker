import { resetPasswordApi } from "./api/resetPasswordApi";
import { ResetPasswordFormData, ResetPasswordApiResponse } from "../types/resetPasswordTypes";

export const resetPasswordService = {
  async resetPassword(data: ResetPasswordFormData, token: string): Promise<ResetPasswordApiResponse> {
    return await resetPasswordApi(data, token);
  },
};