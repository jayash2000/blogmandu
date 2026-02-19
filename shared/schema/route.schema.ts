import z from "zod";

export const idRouteSchema = z.object({
  id: z.uuid({ message: "Invalid post ID format" }),
  commentId: z.uuid({ message: "Invalid comment ID format" }),
});

export const postRouteSchema = z.object({
  id: z.uuid({ message: "Invalid post ID format" }),
});

export const userRouteSchema = z.object({
  userId: z.uuid({ message: "Invalid user ID format" }),
});
