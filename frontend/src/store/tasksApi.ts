import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TaskData } from "../utils/types";

const tasksApiSlice = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/todo`,
    credentials: "include",
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
      query: ({ id, task }) => ({
        url: `/${id}`,
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
