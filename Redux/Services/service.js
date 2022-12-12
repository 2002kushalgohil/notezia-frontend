import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteziaApi = createApi({
  reducerPath: "noteziaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notezia-backend.kushalgohil.com/.netlify/functions/api",
    // baseUrl: "http://localhost:9000/.netlify/functions/api",
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
      transformResponse: (data) => {
        if (!data?.data?.photos) {
          data = {
            ...data,
            data: {
              ...data.data,
              photos: {
                id: "NA",
                secure_url:
                  "https://res.cloudinary.com/dryviglqd/image/upload/v1670610093/users/avataaars_odsvbg.png",
              },
            },
          };
        }
        return data;
      },
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
} = noteziaApi;
