import { cursorPagination, offsetPagination } from "~~/server/utils/pagination";
import { postFilterSchema } from "~~/shared/schema/post.schema";

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
        query.error.issues[0]?.message as string,
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
        search: search as string,
        tags: tags as string[],
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
      search: search as string,
      tags: tags as string[],
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
