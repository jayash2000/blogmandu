import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { comments } from "~~/server/db/schema/comments";
import { idRouteSchema } from "~~/shared/schema/route.schema";

export default defineEventHandler(async (event) => {
  // authentication
  const user = await authorize(event);

  // validation (route params)
  const query = await getValidatedRouterParams(event, (body) =>
    idRouteSchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: query.error.issues[0]?.message as string,
    });
  }

  // fetch comment
  const commentId = query.data.commentId;
  const [foundComment] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, commentId))
    .limit(1);

  if (!foundComment) {
    throw createError({
      statusCode: 404,
      message: "Comment not found",
    });
  }

  // verify if comment belongs to the post
  const postId = query.data.id;
  if (foundComment.postId !== postId) {
    throw createError({
      statusCode: 400,
      message: "Comment does not belong to this post",
    });
  }

  // verify if user is author or admin
  if (foundComment.userId !== user.id && user.role !== "admin") {
    throw createError({
      statusCode: 403,
      message: "Forbidden",
    });
  }

  // update is_deleted and content
  const deletedComment = await db
    .update(comments)
    .set({
      isDeleted: true,
      content: "Comment removed",
    })
    .where(eq(comments.id, commentId))
    .returning();

  return {
    success: true,
    message: "Comment removed successfully",
    deletedComment,
  };
});
