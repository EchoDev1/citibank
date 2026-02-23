import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash", { length: 255 }).notNull(),
  fullName: text("full_name", { length: 255 }).notNull(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
