import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { comments } from "~~/server/db/schema/comments";
import { authorize } from "~~/server/utils/auth";
import { commentSchema } from "~~/shared/schema/comment.schema";
import { idRouteSchema } from "~~/shared/schema/route.schema";
import DOMPurify from "isomorphic-dompurify";
import { posts } from "~~/server/db/schema/posts";

export default defineEventHandler(async (event) => {
  // authorization
  const user = await authorize(event);

  // validation (router params)
  const query = await getValidatedRouterParams(event, (body) =>
    idRouteSchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: query.error.issues[0]?.message as string,
    });
  }

  // validate body
  const body = await readValidatedBody(event, (body) =>
    commentSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues[0]?.message as string,
    });
  }

  // verify if post exist
  const postId = query.data.id;

  const findPost = await db.select().from(posts).where(eq(posts.id, postId));

  if (!findPost.length) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }

  // trim & sanitize
  const { content } = body.data;
  const cleanContent = DOMPurify.sanitize(content.trim());

  if (!cleanContent) {
    throw createError({
      statusCode: 400,
      message: "Please add some content",
    });
  }

  // fetch parent comment
  const commentId = query.data.commentId;
  const [parent] = await db
    .select()
    .from(comments)
    .where(eq(comments.id, commentId))
    .limit(1);

  if (!parent) {
    throw createError({
      statusCode: 404,
      message: "Parent comment not found",
    });
  }

  if (parent.postId !== postId) {
    throw createError({
      statusCode: 400,
      message: "Parent comment does not belong to this post",
    });
  }

  if (parent.depth > 3) {
    throw createError({
      statusCode: 400,
      message: "Maximum reply depth reached",
    });
  }

  // depth limit [this is used for limiting number of replies]
  const newDepth = parent.depth + 1;

  await db.insert(comments).values({
    postId,
    content,
    userId: user.id,
    parentId: commentId,
    depth: newDepth,
  });

  return { success: true, message: "Comment reply sent successfully" };
});
