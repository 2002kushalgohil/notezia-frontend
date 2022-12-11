import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteziaApi = createApi({
  reducerPath: "noteziaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notezia-backend.kushalgohil.com/.netlify/functions/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/user/Register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/Login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = noteziaApi;
