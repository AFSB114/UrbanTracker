import { forgotPasswordApi } from "./api/forgotPasswordApi";
import { ForgotPasswordFormData, ForgotPasswordApiResponse } from "../types/forgotPasswordTypes";

export const forgotPasswordService = {
  async forgotPassword(data: ForgotPasswordFormData): Promise<ForgotPasswordApiResponse> {
    return await forgotPasswordApi(data);
  },
};