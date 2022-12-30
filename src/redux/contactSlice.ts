import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: "contacts",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com",
  }),
  tagTypes: ["Contacts"],
  endpoints(build) {
    return {
      getContacts: build.query({
        query: () => ({ url: "/contacts", method: "GET" }),
        providesTags: ["Contacts"],
      }),
      addContact: build.mutation({
        query: (contact) => ({
          url: "/contacts",
          method: "POST",
          data: contact,
        }),
        invalidatesTags: ["Contacts"],
      }),
      deleteContact: build.mutation({
        query: (id) => ({
          url: `/contacts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Contacts"],
      }),
      updateContact: build.mutation({
        query: ({ id, contact }) => ({
          url: `/contacts/${id}`,
          method: "PATCH",
          data: contact,
        }),
        invalidatesTags: ["Contacts"],
      }),
    };
  },
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
