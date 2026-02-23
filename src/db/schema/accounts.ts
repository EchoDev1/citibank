import { pgTable, uuid, varchar, timestamp, decimal, pgEnum, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const accountTypeEnum = pgEnum("account_type", ["checking", "savings"]);
export const accountStatusEnum = pgEnum("account_status", ["active", "suspended", "closed"]);

export const accounts = pgTable("accounts", {
  id: uuid("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountNumber: varchar("account_number", { length: 50 }).notNull().unique(),
  accountType: accountTypeEnum("account_type").default("checking").notNull(),
  balance: decimal("balance", { precision: 19, scale: 4 }).default("0.0000").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  status: accountStatusEnum("status").default("active").notNull(),
  allowWithdrawals: boolean("allow_withdrawals").default(true).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
