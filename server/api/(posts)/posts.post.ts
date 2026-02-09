import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";
import { createPostSchema } from "~~/server/schema/post.schema";
import { parseMarkdown } from "~~/server/utils/markdown";
import slugify from "slugify";

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user;

    if (!user) {
      return createApiResponse(event, 403, false, "Unauthorized");
    }

    const result = await readValidatedBody(event, (body) =>
      createPostSchema.safeParse(body),
    );

    if (!result.success) {
      return createApiResponse(
        event,
        400,
        false,
        result.error.issues[0]?.message!,
      );
    }

    const { title, content } = result.data;
    // const { title, content } = await readBody(event);

    const slug = slugify(title, { lower: true, strict: true });

    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (post) {
      return createApiResponse(
        event,
        400,
        false,
        `Post with ${slug} already exists`,
      );
    }

    const html = await parseMarkdown(content);

    await db.insert(posts).values({
      title,
      slug,
      description: content.slice(0, 150),
      contentMarkdown: content,
      contentHtml: html,
      authorId: user.id,
    });

    return createApiResponse(event, 200, true, "Post created successfully");
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});
