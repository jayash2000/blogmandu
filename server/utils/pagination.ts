import { and, asc, desc, eq, gt, ilike, lt, or, sql } from "drizzle-orm";
import { posts } from "../db/schema/posts";
import { db } from "../db/client";
import { parseMarkdown } from "~~/server/utils/markdown";
import { users } from "../db/schema/users";

export const offsetPagination = async ({
  page = 1,
  limit,
  order = "desc",
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
    .select({
      post: posts,
      author: {
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(and(...conditions))
    .orderBy(order === "desc" ? desc(posts.createdAt) : asc(posts.createdAt))
    .limit(limit)
    .offset(offset);

  const totalPosts = await db
    .select({ count: sql<number>`count(*)` })
    .from(posts)
    .where(and(...conditions))
    .then((res) => res?.[0]?.count);

  return {
    type: "offset",
    page,
    limit,
    data,
    count: totalPosts,
    currentPostCount: data.length,
  };
};

export const cursorPagination = async ({
  limit,
  id,
  createdAt,
  order,
  search,
  tags,
}: {
  limit: number;
  id: string;
  createdAt?: string;
  order?: "asc" | "desc";
  search?: string;
  tags?: string[];
}) => {
  const conditions = [];

  if (!id || !createdAt) return null;

  // cursor check
  conditions.push(
    order === "desc"
      ? or(
          lt(posts.createdAt, new Date(createdAt)),
          and(eq(posts.createdAt, new Date(createdAt)), lt(posts.id, id)),
        )
      : or(
          gt(posts.createdAt, new Date(createdAt)),
          and(eq(posts.createdAt, new Date(createdAt)), gt(posts.id, id)),
        ),
    // ? sql`${posts.createdAt} < ${cursor}`
    // : sql`${posts.createdAt} > ${cursor}`,
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
    .select({
      post: posts,
      author: {
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      },
    })
    .from(posts)
    .where(and(...conditions))
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(order === "desc" ? desc(posts.createdAt) : asc(posts.createdAt))
    .limit(limit + 1);

  // check if there are more posts after
  const hasNextPage = rows.length > limit;
  const data = rows.slice(0, limit);

  return {
    type: "cursor",
    limit,
    currentPostCount: data.length,
    // if there is next post after, return cursor id (created_at) of final post
    hasNextPage,
    nextCursor: hasNextPage
      ? {
          // id and createdAt of last post
          id: data[data.length - 1]?.post.id,
          createdAt: data[data.length - 1]?.post.createdAt,
        }
      : null,
    data,
  };
};
