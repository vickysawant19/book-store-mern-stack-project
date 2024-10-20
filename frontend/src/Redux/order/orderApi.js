import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/orders`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  },
});

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "orders", id: _id }))]
          : [{ type: "orders", id: "LIST" }],
    }),
    getOrderByEmail: builder.query({
      query: (email) => `email/${email}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "orders", id: _id }))]
          : [{ type: "orders", id: "LIST" }],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/create-order",
        method: "POST",
        body: data,
      }),
      providesTags: (result, error, { _id }) => [{ type: "books", _id }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
} = orderApi;
