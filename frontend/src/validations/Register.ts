import { z } from "zod";

const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name can't exceed 30 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password can't exceed 100 characters"),
    cpassword: z.string(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
  });

type RegisterSchema = z.infer<typeof RegisterSchema>;

export default RegisterSchema;
