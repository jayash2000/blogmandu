import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    postId: uuid("post_id")
      .references(() => posts.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    uniqueIndex("idx_likes_user_post_unique").on(table.userId, table.postId),
    index("idx_likes_post").on(table.postId),
    index("idx_likes_user").on(table.userId),
  ],
);
