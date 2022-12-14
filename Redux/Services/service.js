import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://notezia-backend.kushalgohil.com/.netlify/functions/api",
  baseUrl: "http://localhost:9000/.netlify/functions/api",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const oldRefreshToken = localStorage.getItem("refreshToken");
    const refreshResult = await baseQuery(
      `/user/refreshtoken?refreshToken=${oldRefreshToken}`,
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const accessToken = refreshResult.data.data.accessToken;
      const refreshToken = refreshResult.data.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }

  return result;
};

export const noteziaApi = createApi({
  reducerPath: "noteziaApi",
  baseQuery: baseQueryWithReauth,
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
