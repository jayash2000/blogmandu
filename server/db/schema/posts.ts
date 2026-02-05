import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  contentMarkdown: text("content_markdown").notNull(),
  contentHtml: text("content_html").notNull(),
  imageUrl: text("image_url"),
  tags: text("tags").array(),
  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  isPublished: boolean("is_published").default(false),
  // metadata: short preview for card
  description: varchar("description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});
