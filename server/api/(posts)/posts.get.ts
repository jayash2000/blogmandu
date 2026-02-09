import { eq } from "drizzle-orm";
import { db } from "~~/server/db/client";
import { posts } from "~~/server/db/schema/posts";
import { postFilterSchema } from "~~/server/schema/post.schema";
import { cursorPagination, offsetPagination } from "~~/server/utils/pagination";

export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedQuery(event, (body) =>
      postFilterSchema.safeParse(body),
    );

    if (!query.success) {
      return createApiResponse(
        event,
        400,
        false,
        query.error.issues[0]?.message!,
      );
    }

    const page = query.data.page || 1;
    const limit = query.data.limit || 10;

    const { cursor, order, search, tags } = query.data;

    if (cursor) {
      const postList = await cursorPagination({
        limit,
        cursor,
        order,
        search: search!,
        tags: tags!,
      });

      return createApiResponse(
        event,
        200,
        true,
        "Post fetched successfully",
        postList,
      );
    }

    const postList = await offsetPagination({
      limit,
      order,
      page,
      search: search!,
      tags: tags!,
    });

    return createApiResponse(
      event,
      200,
      true,
      "Post fetched successfully",
      postList,
    );
  } catch (error) {
    console.error("Server error:", error);
    return createApiResponse(event, 500, false, "Server error");
  }
});
