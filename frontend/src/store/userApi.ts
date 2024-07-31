import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoginData, UserRegisterData } from "../utils/types";

const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Credentials", "true");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
      );
      headers.set(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user: UserRegisterData) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user: UserLoginData) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    selfData: builder.query({
      query: () => "/",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST", // Change to POST if needed for logout
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSelfDataQuery,
  useLogoutMutation,
} = apiSlice;
export default apiSlice;
