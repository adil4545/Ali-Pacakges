import { api } from "../slice/authapislice";
import type { products } from "../Types/Products";

export interface AddProductRequest {
  id?: string;
  hs_code: string;
  fbr_product: string;
  product_uom: string;
  sale_price: string;
  tax: string;
}

export interface AddProductResponse {
  message: string;
  product: products;
}

export interface AllProductsResponse {
  data: products[];
  status: string;
  message?: string;
}

// --- Endpoints ---
export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<AllProductsResponse, void>({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;
