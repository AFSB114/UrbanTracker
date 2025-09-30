import { loginApi } from "./api/loginApi";
import { LoginFormData, LoginApiResponse } from "../types/loginTypes";

export const loginService = {
  async login(data: LoginFormData): Promise<LoginApiResponse> {
    return await loginApi(data);
  },
};