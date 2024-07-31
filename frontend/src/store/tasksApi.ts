import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskData } from "../utils/types";

const tasksApiSlice = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/todo`,
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
    createTask: builder.mutation({
      query: (task: TaskData) => ({
        url: "/",
        method: "POST",
        body: task,
      }),
    }),

    updateTask: builder.mutation({
      query: (task: TaskData) => ({
        url: `/${task.id}`,
        method: "PUT",
        body: task,
      }),
    }),

    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),

    getById: builder.query({
      query: (id: string) => `/${id}`,
    }),

    getAllByStatus: builder.query({
      query: (userId: string) => `/get-by-status?userId=${userId}`,
      // Include userId in the query to prevent from cached value when user switch his account
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetByIdQuery,
  useGetAllByStatusQuery,
} = tasksApiSlice;
export default tasksApiSlice;
