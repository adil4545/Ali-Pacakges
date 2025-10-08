import { api } from "../slice/authapislice";
import type { UserProfile } from "../Types/Profile";

export interface ProfileResponse {
  data: UserProfile;
}

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<ProfileResponse, void>({
      query: () => "/me",
      providesTags: ["UserProfile"],
    }),

    updateMyProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (updatedData) => ({
        url: "/me",
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileApi;
