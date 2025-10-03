import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_FBR_TOKEN;
      localStorage.setItem("fbr_token", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
