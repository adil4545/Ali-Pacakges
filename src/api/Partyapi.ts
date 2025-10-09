import { api } from "../slice/authapislice";
import type { Party } from "../Types/Party";
// import type { Province } from "../Types/Profile";

// --- Interfaces ---
export interface AddPartyRequest {
  id?: string;
  ntn: string;
  party_name: string;
  party_type: string;
  phone: string;
  cnic: string;
  strn: string;
  registration_type: string;
  province: string;
  address: string;
}

export interface AddPartyResponse {
  message: string;
  party: Party;
}

export interface AllPartyResponse {
  data: Party[];
  status: string;
  message?: string;
}

// --- Endpoints ---
export const partyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllParties: builder.query<AllPartyResponse, void>({
      query: () => ({
        url: "/party",
        method: "GET",
      }),
      providesTags: ["Parties"],
    }),

    addParty: builder.mutation<AddPartyResponse, AddPartyRequest>({
      query: (body) => ({
        url: "/party",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Parties"],
    }),

    updateParty: builder.mutation<
      AddPartyRequest,
      { id: string; body: AddPartyRequest }
    >({
      query: ({ id, body }) => ({
        url: `/party/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Parties"],
    }),

    deleteParty: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/party/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parties"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllPartiesQuery,
  useAddPartyMutation,
  useUpdatePartyMutation,
  useDeletePartyMutation,
} = partyApi;
