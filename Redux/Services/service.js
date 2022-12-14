import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteziaApi = createApi({
  reducerPath: "noteziaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notezia-backend.kushalgohil.com/.netlify/functions/api",
    // baseUrl: "http://localhost:9000/.netlify/functions/api",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["userProfile"],
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

    googleAuth: builder.query({
      query: (accessToken) => `/user/googleAuth?googleAuthToken=${accessToken}`,
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

    userProfile: builder.query({
      query: () => "/user/",
      providesTags: ["userProfile"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/user/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userProfile"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGoogleAuthQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUserProfileQuery,
  useUpdateUserProfileMutation,
} = noteziaApi;
