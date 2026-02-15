import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";
import { users } from "~~/server/db/schema/users";
import { postIdSchema } from "~~/shared/schema/post.schema";

export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedRouterParams(event, (body) =>
      postIdSchema.safeParse(body),
    );

    console.log(query, "q");

    if (!query.success) {
      return createApiResponse(
        event,
        400,
        false,
        query.error.issues[0]?.message as string,
      );

      // throw new ApiError(
      //   400,
      //   "Validation failed",
      //   true,
      //   z.treeifyError(query.error),
      // );
    }

    const { id } = query.data;

    const [post] = await db
      .select({
        post: { ...posts },
        author: {
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
        },
      })
      .from(posts)
      .where(eq(posts.id, id))
      .leftJoin(users, eq(posts.authorId, users.id));

    if (!post) {
      return createApiResponse(event, 404, false, "Post not found");
    }

    return {
      success: true,
      message: "Post fetched successfully",
      data: post,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
