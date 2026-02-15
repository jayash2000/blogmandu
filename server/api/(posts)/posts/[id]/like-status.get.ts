import { and, eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { likes } from "~~/server/db/schema/like";
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

  const findLikedPost = await db
    .select()
    .from(likes)
    .where(and(eq(likes.postId, id), eq(likes.userId, user.id)));

  if (!findLikedPost.length) {
    return { message: "Post like status fetched successfully", isLiked: false };
  }

  return { message: "Post like status fetched successfully", isLiked: true };
});
