import { api } from "../slice/authapislice";
import type { products } from "../Types/Products";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ HSCode list laane ka query
    getHSCodeList: builder.query<products[], void>({
      query: () => "/itemdesccode",
    }),

    // ✅ Product add karne ka mutation
    addProduct: builder.mutation<products, Partial<products>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});

// Hooks
export const { useGetHSCodeListQuery, useAddProductMutation } = productsApi;
