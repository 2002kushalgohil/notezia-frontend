import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteziaApi = createApi({
  reducerPath: "noteziaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notezia-backend.kushalgohil.com/.netlify/functions/api",
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
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgotpassword",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ userData, queryToken }) => ({
        url: `/user/resetpassword/${queryToken}`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = noteziaApi;
