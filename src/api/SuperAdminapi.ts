import { api } from "../slice/authapislice"; // ✅ make sure path is correct
import type { UserProfile } from "../Types/Profile";

// --- Types ---
export interface AddAdminRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  sellerBusinessName: string;
  role: string;
  status: "active" | "inactive";
}

export interface AddAdminResponse {
  message: string;
  admin: UserProfile;
}

export interface AllAdminsResponse {
  data: UserProfile[];
  status: string;
  message?: string;
}

// --- Endpoints ---
export const superAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all admins
    getAllAdmins: builder.query<AllAdminsResponse, void>({
      query: () => ({
        url: "/all-admins",
        method: "GET",
      }),

      providesTags: ["Admins"],
    }),

    // ✅ Add admin
    addAdmin: builder.mutation<AddAdminResponse, AddAdminRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admins"],
    }),

    // ✅ Delete admin
    deleteAdmin: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),

  overrideExisting: false,
});

// --- Export hooks ---
export const {
  useGetAllAdminsQuery,
  useAddAdminMutation,
  useDeleteAdminMutation,
} = superAdminApi;
