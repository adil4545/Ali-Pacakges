import { api } from "../slice/authapislice";
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  refresh_token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ForgetPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    forgetPassword: builder.mutation<
      ForgetPasswordResponse,
      ForgetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = loginApi;
