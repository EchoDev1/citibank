import { pgTable, uuid, varchar, timestamp, decimal, pgEnum, text, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { accounts } from "./accounts";

export const transactionTypeEnum = pgEnum("transaction_type", ["deposit", "withdrawal", "transfer"]);
export const transactionStatusEnum = pgEnum("transaction_status", ["pending", "completed", "failed"]);

export const transactions = pgTable("transactions", {
  id: uuid("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  type: transactionTypeEnum("type").notNull(),
  amount: decimal("amount", { precision: 19, scale: 4 }).notNull(),
  description: text("description"),
  balanceAfter: decimal("balance_after", { precision: 19, scale: 4 }),
  status: transactionStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  metadata: jsonb("metadata"),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
