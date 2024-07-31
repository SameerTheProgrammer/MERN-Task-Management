import { z } from "zod";

const TodoModelSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title cannot exceed 100 characters" }),
  status: z.string().min(1, { message: "Status is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  description: z
    .string()
    .max(500, { message: "description cannot exceed 500 characters" })
    .optional(),
});

type TodoModelSchema = z.infer<typeof TodoModelSchema>;

export default TodoModelSchema;
