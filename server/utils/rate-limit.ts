import { and, count, eq, gte } from "drizzle-orm";
import { db } from "../db/client";
import { comments } from "../db/schema/comments";

export const checkRateLimit = async (userId: string) => {
  const last10Seconds = await db
    .select({ value: count() })
    .from(comments)
    .where(
      and(
        eq(comments.userId, userId),
        gte(comments.createdAt, new Date(Date.now() - 1000 * 10)),
      ),
    )
    .then((res) => res[0]?.value);

  if (last10Seconds && last10Seconds > 0) {
    throw createError({
      statusCode: 400,
      message: "Too many comments at once",
    });
  }

  const lastHour = await db
    .select({ value: count() })
    .from(comments)
    .where(
      and(
        eq(comments.userId, userId),
        gte(comments.createdAt, new Date(Date.now() - 1000 * 60 * 60)),
      ),
    )
    .then((res) => res[0]?.value);

  if (lastHour && lastHour >= 30) {
    throw createError({
      statusCode: 400,
      message: "Hourly comment limit reached (30/hour)",
    });
  }
};
