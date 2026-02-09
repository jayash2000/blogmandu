import { and, asc, desc, ilike, sql } from "drizzle-orm";
import { posts } from "../db/schema/posts";
import { db } from "../db/client";

export const offsetPagination = async ({
  page = 1,
  limit,
  order = 'desc',
  search,
  tags,
}: {
  page: number;
  limit: number;
  order: "asc" | "desc";
  search: string;
  tags: string[];
}) => {
  const offset = (page - 1) * limit;

  const conditions = [];

  // search: 'technology'
  if (search) {
    conditions.push(
      ilike(posts.title, `%${search}%`) ||
        ilike(posts.description, `%${search}%`),
    );
    // || conditions.push(ilike(posts.description, `%${search}%`));
  }

  if (tags?.length) {
    conditions.push(sql`${posts.tags} && ${tags}`);
  }

  const data = await db
    .select()
    .from(posts)
    .where(and(...conditions))
    .orderBy(order === "desc" ? desc(posts.createdAt) : asc(posts.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    type: "offset",
    page,
    limit,
    data,
  };
};

export const cursorPagination = async ({
  limit,
  cursor,
  order,
  search,
  tags,
}: {
  limit: number;
  cursor: { id: string; createdAt?: string };
  order: "asc" | "desc";
  search: string;
  tags: string[];
}) => {
  const conditions = [];

  if (!cursor.id || !cursor.createdAt) return null;

  // cursor check
  conditions.push(
    order === "desc"
      ? sql`${posts.createdAt} < ${cursor}`
      : sql`${posts.createdAt} > ${cursor}`,
  );

  if (search) {
    conditions.push(
      ilike(posts.title, `%${search}%`) ||
        ilike(posts.description, `%${search}%`),
    );
  }

  if (tags?.length) {
    conditions.push(sql`${posts.tags} && ${tags}`);
  }

  const rows = await db
    .select()
    .from(posts)
    .where(and(...conditions))
    .orderBy(order === "desc" ? desc(posts.createdAt) : asc(posts.createdAt))
    .limit(limit + 1);

  // check if there are more posts after
  const hasNextPage = rows.length > limit;
  const data = rows.slice(0, limit);

  return {
    type: "cursor",
    // if there is next post after, return cursor id (created_at) of final post
    nextCursor: {
      createdAt: hasNextPage
        ? {
            createdAt: data[data.length - 1]?.createdAt,
            id: data[data.length - 1]?.id,
          }
        : null,
    },
    data,
  };
};
