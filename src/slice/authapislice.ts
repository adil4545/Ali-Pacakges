// ✅ Base API configuration for RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      const finalToken = token;
      if (finalToken) {
        headers.set("authorization", `Bearer ${finalToken}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["Admins", "UserProfile"],

  endpoints: () => ({}),
});
