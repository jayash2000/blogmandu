import {
  boolean,
  index,
  pgTable,
  PgVector,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { db } from "../client";
import { sql } from "drizzle-orm";

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    contentMarkdown: text("content_markdown").notNull(),
    contentHtml: text("content_html").notNull(),
    imageUrl: text("image_url"),
    tags: text("tags").array(),
    authorId: uuid("author_id")
      .references(() => users.id)
      .notNull(),
    isPublished: boolean("is_published").default(false),
    // metadata: short preview for card
    description: varchar("description", { length: 500 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => ({
    createdAtIdx: index("idx_posts_created_at").on(table.createdAt.desc()),
    tagsIdx: index("idx_posts_tags").using("gin", table.tags),
  }),
  //   [
  //   index("idx_posts_created_at").on(table.createdAt.desc()),
  //   index("idx_posts_tags").on(table.tags),
  // ],
);

// db.execute(
//   sql`CREATE INDEX idx_posts_created_at ON ${posts}(${posts.createdAt} DESC)`,
// );

// db.execute(
//   sql`CREATE INDEX idx_posts_tags ON ${posts} USING GIN(${post.tags}))`,
// );
