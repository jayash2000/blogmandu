import { eq, like, sql } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { likes } from "~~/server/db/schema/like";
import { posts } from "~~/server/db/schema/posts";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  const likedPosts = await db
    .select({
      id: likes.id,
      post: posts,
    })
    .from(likes)
    .leftJoin(posts, eq(likes.postId, posts.id))
    .where(eq(likes.userId, user.id));

  return {
    message: "Your liked posts",
    data: { posts: likedPosts, count: likedPosts.length },
  };
});
