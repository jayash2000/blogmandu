import { eq } from "drizzle-orm";
import DOMPurify from "isomorphic-dompurify";
import { db } from "~~/server/db/client";
import { comments } from "~~/server/db/schema/comments";
import { posts } from "~~/server/db/schema/posts";
import { authorize } from "~~/server/utils/auth";
import { checkRateLimit } from "~~/server/utils/rate-limit";
import { commentSchema } from "~~/shared/schema/comment.schema";
import { postIdSchema } from "~~/shared/schema/post.schema";

export default defineEventHandler(async (event) => {
  // authorization
  const user = await authorize(event);

  // validation (post id)
  const query = await getValidatedRouterParams(event, (body) =>
    postIdSchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: query.error.issues[0]?.message as string,
    });
  }

  const postId = query.data.id;

  // validation (body)
  const body = await readValidatedBody(event, (body) =>
    commentSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues[0]?.message as string,
    });
  }

  const { content } = body.data;

  // trim & sanitize
  const cleanContent = DOMPurify.sanitize(content.trim());

  if (!cleanContent) {
    throw createError({
      statusCode: 400,
      message: "Empty content",
    });
  }

  // rate limit: 1 comment per 10 seconds; 50 comments per hour
  await checkRateLimit(user.id);

  // find post if exists
  const post = await db.select().from(posts).where(eq(posts.id, postId));

  if (!post.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }

  // create comment
  await db.insert(comments).values({
    postId,
    userId: user.id,
    parentId: null,
    content,
    // status: user.isVerified? "visible": "pending"
  });

  return { success: true, message: "Comment created successfully" };
});
