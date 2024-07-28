import { z } from "zod";

const TodoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  deadline: z.string().optional(),
  description: z.string().optional(),
});

export type TodoSchema = z.infer<typeof TodoSchema>;
