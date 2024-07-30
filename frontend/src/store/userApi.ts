import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRegisterData } from "../utils/types";

const apiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user: UserRegisterData) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    selfData: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useRegisterUserMutation, useSelfDataQuery } = apiSlice;
export default apiSlice;
