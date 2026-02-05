import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";
import { postIdSchema } from "~~/server/schema/post.schema";

export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedRouterParams(event, (body) =>
      postIdSchema.safeParse(body),
    );

    if (!query.success) {
      return createApiResponse(
        event,
        400,
        false,
        query.error.issues[0]?.message!,
      );
    }

    const { id } = query.data;

    const [post] = await db.select().from(posts).where(eq(posts.id, id));

    if (!post) {
      return createApiResponse(event, 404, false, "Post not found");
    }

    return createApiResponse(
      event,
      200,
      true,
      "Post fetched successfully",
      post,
    );
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});
