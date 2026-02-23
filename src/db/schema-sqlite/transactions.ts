import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { accounts } from "./accounts";

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  accountId: text("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["deposit", "withdrawal", "transfer"] }).notNull(),
  amount: text("amount").notNull(), // Store as text for precision
  description: text("description"),
  balanceAfter: text("balance_after"), // Store as text for precision
  status: text("status", { enum: ["pending", "completed", "failed"] })
    .default("pending")
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  metadata: text("metadata", { mode: "json" }),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
