import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is empty" }).trim(),
  content: z.string().min(1, { message: "Please enter some content" }),
});

export const postIdSchema = z.object({
  id: z.uuid({ message: "Invalid post ID format" }),
});

export const postFilterSchema = z.object({
  page: z.coerce
    .number({ message: "Page must be in number format" })
    .min(1)
    .optional(),
  limit: z.coerce
    .number({ message: "Page limit must be in number format" })
    .min(1)
    .max(50)
    .default(10),
  createdAt: z.iso
    .datetime({ message: "Invalid cursor datetime format" })
    .optional(),
  id: z.uuid({ message: "Invalid cursor id format" }).optional(),

  // cursor: z
  //   .object({
  //     createdAt: z.iso
  //       .datetime({ message: "Invalid cursor datetime format" })
  //       .optional(),
  //     id: z.uuid({ message: "Invalid cursor id format" }),
  //   })
  //   .optional(),
  // cursor: z.iso
  //   .datetime({ message: "Cursor must be in datetime format" })
  //   .optional(),
  sort: z.literal("createdAt").default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().min(1).optional(),
  tags: z
    .string()
    .transform((t) => t.split(","))
    .optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, { message: "Title is empty" }).trim(),
  contentMarkdown: z
    .string()
    .min(1, { message: "Please enter markdown content" }),
  contentHtml: z.string().min(1, { message: "Please enter HTML content" }),
  imageUrl: z.string().optional(),
});
