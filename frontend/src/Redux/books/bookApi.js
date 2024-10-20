import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/getBaseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["books"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query({
      query: () => ``,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "books", id: _id }))]
          : [{ type: "books", id: "LIST" }],
    }),

    // Get a single book by ID
    getSingleBook: builder.query({
      query: (id) => `/${id}`, // Append the ID to the base URL
      providesTags: (result, error, id) => [{ type: "books", id }],
    }),

    // Delete a book by ID
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`, // Use the ID for deletion
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "books" }],
    }),

    // Update a book by ID
    updateBook: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/${_id}`, // Use the ID for the update
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: "books", _id }],
    }),

    // Create a new book
    createBook: builder.mutation({
      query: (data) => ({
        url: "/create-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "books" }],
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = bookApi;
