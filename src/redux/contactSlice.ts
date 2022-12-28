// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// export interface IContact {
//   name: string;
//   number: string;
//   id: string;
// }

// interface CounterState {
//   contacts: IContact[];
//   filter: string;
// }

// const initialState = {
//   contacts: [],
//   filter: "",
// } as CounterState;

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   reducers: {
//     addContact(state, action: PayloadAction<IContact>) {
//       const findContact = state.contacts.find((contact) =>
//         contact.name
//           .toLocaleLowerCase()
//           .includes(action.payload.name.toLocaleLowerCase())
//       );
//       findContact
//         ? alert(`${action.payload.name} is already in contacts.`)
//         : state.contacts.push(action.payload);
//     },
//     deleteContact(state, action: PayloadAction<string>) {
//       state.contacts = state.contacts.filter(
//         (contact) => contact.id !== action.payload
//       );
//     },
//     updateFilter(state, action: PayloadAction<string>) {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { addContact, deleteContact, updateFilter } =
//   contactsSlice.actions;

// // Reducer

// const persistConfig = {
//   key: "contacts",
//   storage,
//   whitelist: ["contacts"],
// };

// export const persistedContactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

// // Selectors

// interface RootState {
//   contacts: CounterState;
//   filter: string;
// }

// export const selectContacts = (state: RootState) => state.contacts.contacts;
// export const selectFilterValue = (state: RootState) => state.contacts.filter;

import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
// import type { Post } from "./types";

// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: "" }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, params });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err = axiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//     };

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
  // endpoints: (builder) => ({
  //   getContacts: builder.query({
  //     query: () => ({ url: "/contacts", method: "GET" }),
  //     providesTags: ["Contacts"],
  //   }),
  //   addContact: builder.mutation({
  //     query: (contact) => ({
  //       url: "/contacts",
  //       method: "POST",
  //       data: contact,
  //     }),
  //     invalidatesTags: ["Contacts"],
  //   }),
  //   deleteContact: builder.mutation({
  //     query: (id) => ({
  //       url: `/contacts/${id}`,
  //       method: "DELETE",
  //     }),
  //     invalidatesTags: ["Contacts"],
  //   }),
  //   updateContact: builder.mutation({
  //     query: ({ id, contact }) => ({
  //       url: `/contacts/${id}`,
  //       method: "PATCH",
  //       data: contact,
  //     }),
  //     invalidatesTags: ["Contacts"],
  //   }),
  // }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;

// export const { useGetContactsQuery } = contactsApi;

// const useQueryResult = contactsApi.endpoints.getContacts.useQuery();
