import { and, eq, sql } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { likes } from "~~/server/db/schema/like";
import { users } from "~~/server/db/schema/users";
import { postIdSchema } from "~~/shared/schema/post.schema";

export default defineEventHandler(async (event) => {
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

  const likedUsers = await db
    .select({
      id: likes.id,
      user: {
        name: users.name,
        email: users.email,
      },
    })
    .from(likes)
    .where(eq(likes.postId, id))
    .innerJoin(users, eq(likes.userId, users.id));

  return {
    message: `Likes fetched successfully`,
    data: { liked_by: likedUsers, count: likedUsers.length },
  };
});
