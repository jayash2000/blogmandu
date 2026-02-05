import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";

export default defineEventHandler(async (event) => {
  try {
    const postList = await db.select().from(posts);

    return createApiResponse(
      event,
      200,
      true,
      "Post fetched successfully",
      postList as Record<string, any>[],
    );
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});
