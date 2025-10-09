import { api } from "../slice/authapislice";
import type { UserProfile } from "../Types/Profile";

import type { Province } from "../Types/Profile";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserProfile[], void>({
      query: () => "/auth/users",
    }),
    getProvince: builder.query<Province[], void>({
      query: () => "/auth/provinces",
    }),
    addUser: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (newUser) => ({
        url: "/auth/users",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useGetProvinceQuery } =
  usersApi;
