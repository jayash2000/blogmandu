import { asc, count, desc, eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";
import { postFilterSchema } from "~~/shared/schema/post.schema";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  const query = await getValidatedQuery(event, (body) =>
    postFilterSchema.safeParse(body),
  );

  if (!query.success) {
    return createApiResponse(
      event,
      400,
      false,
      query.error.issues[0]?.message as string,
    );
  }

  const page = query.data.page || 1;
  const limit = query.data.limit || 10;

  const offset = (page - 1) * limit;

  const { order } = query.data;

  const totalCount = await db
    .select({ value: count() })
    .from(posts)
    .where(eq(posts.authorId, user.id))
    .then((res) => res[0]?.value || 0);

  const myPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, user.id))
    .limit(limit)
    .offset(offset)
    .orderBy(order === "desc" ? desc(posts.createdAt) : asc(posts.createdAt));

  return {
    message: "Your posts",
    count: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    page,
    limit,
    author: user.email,
    data: myPosts,
  };
});
