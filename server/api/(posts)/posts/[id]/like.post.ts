import { and, eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { likes } from "~~/server/db/schema/like";
import { posts } from "~~/server/db/schema/posts";
import { users } from "~~/server/db/schema/users";
import { postIdSchema } from "~~/shared/schema/post.schema";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  const query = await getValidatedRouterParams(event, (body) =>
    postIdSchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: query.error.issues[0]?.message as string,
    });
  }

  const { id } = query.data;

  const [post] = await db.select().from(posts).where(eq(posts.id, id));

  if (!post) {
    throw createError({
      statusCode: 404,
      message: "Could not find requested post",
    });
  }

  const [alreadyLiked] = await db
    .select()
    .from(likes)
    .where(and(eq(likes.postId, post.id), eq(likes.userId, user.id)));

  if (alreadyLiked) {
    await db
      .delete(likes)
      .where(and(eq(likes.postId, post.id), eq(likes.userId, user.id)));

    return { message: "Post unliked successfully" };
  }

  // Insert a new like for this user and post
  await db.insert(likes).values({ postId: post.id, userId: user.id });

  return { message: "Post liked successfully" };
});
