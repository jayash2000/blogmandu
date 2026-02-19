import {
  AnyPgColumn,
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const commentStatusEnum = pgEnum("comment_status", [
  "visible",
  "hidden",
  "pending",
]);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references((): AnyPgColumn => comments.id, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    // is_deleted: for soft delete
    isDeleted: boolean("is_deleted").default(false).notNull(),
    // status: visible, hidden, pending
    status: commentStatusEnum("status").default("visible").notNull(),
    depth: integer("depth").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_comments_post_id").on(table.postId),
    index("idx_comments_parent_id").on(table.parentId),
    index("idx_comments_post_id_parent_id").on(table.postId, table.parentId),
    index("idx_comments_status").on(table.status),
  ],
);
