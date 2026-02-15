import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";
import { postIdSchema, updatePostSchema } from "~~/shared/schema/post.schema";

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
      message: query.error?.issues[0]?.message as string,
    });
  }

  const { id } = query.data;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Empty parameters",
    });
  }

  const body = await readValidatedBody(event, (body) =>
    updatePostSchema.safeParse(body),
  );

  console.log(body, "body");

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error?.issues[0]?.message as string,
    });
  }

  const [postFound] = await db.select().from(posts).where(eq(posts.id, id));

  if (!postFound) {
    throw createError({
      statusCode: 404,
      message: "Could not find requested post",
    });
  }

  if (postFound.authorId !== user.id) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const { title, contentHtml, contentMarkdown, imageUrl } = body.data;

  await db
    .update(posts)
    .set({
      title: title || postFound.title,
      contentMarkdown: contentMarkdown || postFound.contentMarkdown,
      contentHtml: contentHtml || postFound.contentHtml,
      imageUrl: imageUrl || postFound.imageUrl,
      updatedAt: new Date(Date.now()),
    })
    .where(eq(posts.id, postFound.id));

  return { success: true, message: "Post updated successfully" };
});
