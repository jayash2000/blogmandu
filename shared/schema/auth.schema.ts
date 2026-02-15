import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name must not be empty" }),
    email: z.email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),

    role: z.enum(["user", "admin"]).default("user"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords did not match",
        path: ["password"],
      });
    }
  });
