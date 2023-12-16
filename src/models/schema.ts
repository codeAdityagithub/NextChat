import { integer, serial, text, pgTable, uuid } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("users", {
    user_id: uuid("user_id").primaryKey().default(sql`uuid_generate_v4()`),
    user_name: text("user_name").notNull(),
    user_email: text("user_email").notNull(),
    user_password: text("user_password").notNull(),
});

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts),
// }));

// export const posts = pgTable('posts', {
//   id: serial('id').primaryKey(),
//   content: text('content').notNull(),
//   authorId: integer('author_id').notNull(),
// });

// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, { fields: [posts.authorId], references: [users.id] }),
// }));
