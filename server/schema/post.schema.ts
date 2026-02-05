import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is empty" }).trim(),
  description: z.string().min(1, { message: "Description is empty" }),
  slug: z.string().min(1, { message: "Slug is empty" }).trim(),
  content: z.string().min(1, { message: "Please enter some content" }),
});

export const postIdSchema = z.object({
  id: z.uuid("Invalid product ID format"),
});
