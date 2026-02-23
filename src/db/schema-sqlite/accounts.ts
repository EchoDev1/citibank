import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountNumber: text("account_number", { length: 50 }).notNull().unique(),
  accountType: text("account_type", { enum: ["checking", "savings"] })
    .default("checking")
    .notNull(),
  balance: text("balance").default("0.0000").notNull(), // Store as text for precision
  currency: text("currency", { length: 3 }).default("USD").notNull(),
  status: text("status", { enum: ["active", "suspended", "closed"] })
    .default("active")
    .notNull(),
  allowWithdrawals: integer("allow_withdrawals", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
