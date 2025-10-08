import { api } from "../slice/authapislice";
import type { products } from "../Types/Products";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHSCodeList: builder.query<products[], void>({
      query: () => "/itemdesccode",
    }),

    addProduct: builder.mutation<products, Partial<products>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});

export const { useGetHSCodeListQuery, useAddProductMutation } = productsApi;
