import {
  and,
  asc,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  is,
  isNull,
  lt,
  or,
} from "drizzle-orm";
import { db } from "~~/server/db/client";
import { comments } from "~~/server/db/schema/comments";
import { postFilterSchema } from "~~/shared/schema/post.schema";
import { postRouteSchema } from "~~/shared/schema/route.schema";

export default defineEventHandler(async (event) => {
  // validation (route params)
  const router = await getValidatedRouterParams(event, (body) =>
    postRouteSchema.safeParse(body),
  );

  if (!router.success) {
    throw createError({
      statusCode: 400,
      message: router.error.issues[0]?.message as string,
    });
  }

  // pagination
  const query = await getValidatedQuery(event, (body) =>
    postFilterSchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: query.error.issues[0]?.message as string,
    });
  }

  const limit = query.data?.limit || 10;

  const { createdAt, id, order = "desc" } = query.data;

  const conditions = [];

  if (createdAt && id) {
    // des  = Comments created before this date; if date is same, then with the higher ID
    // asc = Comments created after this date; if date is same, then with the higher ID
    conditions.push(
      order === "desc"
        ? or(
            lt(comments.createdAt, new Date(createdAt)),
            and(
              eq(comments.createdAt, new Date(createdAt)),
              lt(comments.id, id),
            ),
          )
        : or(
            gt(comments.createdAt, new Date(createdAt)),
            and(
              eq(comments.createdAt, new Date(createdAt)),
              gt(comments.id, id),
            ),
          ),
    );
  }

  // moderation condition (admin doesn't need any restriction)
  if (event.context.user.role === "admin") {
    conditions.push(eq(comments.status, "visible"));
  }

  // top level comments
  const postId = router.data.id;

  const topLevelComments = await db
    .select()
    .from(comments)
    .where(
      and(
        eq(comments.postId, postId),
        isNull(comments.parentId),
        ...conditions,
      ),
    )
    .orderBy(
      order === "desc" ? desc(comments.createdAt) : asc(comments.createdAt),
    )
    .limit(limit + 1);

  if (!topLevelComments) {
    return {
      type: "cursor",
      nextCursor: null,
      data: [],
    };
  }

  // top level comments id
  const topLevelIds = topLevelComments.map((c) => c.id);

  // replies
  const replies = await db
    .select()
    .from(comments)
    // inArray = for multiple checking and matching
    .where(inArray(comments.parentId, topLevelIds))
    .orderBy(desc(comments.createdAt));

  // Build tree
  const tree = buildTree([...topLevelComments, ...replies]);

  // check if there are more comments after
  const hasNextPage = topLevelComments.length > limit;
  const data = topLevelComments.slice(0, limit);

  return {
    type: "cursor",
    limit,
    currentPostCount: data.length,
    hasNextPage,
    nextCursor: hasNextPage
      ? {
          id: data[data.length - 1]?.postId,
          createdAt: data[data.length - 1]?.createdAt,
        }
      : null,
    data,
  };
});
