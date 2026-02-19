import z from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Content must have at least three characters" })
    .max(1000, { message: "Max characters limit reached" }),
});
