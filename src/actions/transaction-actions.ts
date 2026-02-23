"use server";

import { db } from "@/lib/db";
import { accounts, transactions } from "@/db/schema";
import { depositSchema, withdrawSchema, type DepositInput, type WithdrawInput } from "@/lib/validations";
import { eq, desc, and, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { PgTransaction } from "drizzle-orm/pg-core";
import type { PgQueryResultHKT } from "drizzle-orm/pg-core";

export async function depositFunds(data: DepositInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to make a deposit",
      };
    }

    // Validate input
    const validated = depositSchema.parse(data);
    const amount = parseFloat(validated.amount);

    // Verify account belongs to user
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.id, validated.accountId),
          eq(accounts.userId, session.user.id)
        )
      )
      .limit(1);

    if (!account) {
      return {
        success: false,
        error: "Account not found or access denied",
      };
    }

    if (account.status !== "active") {
      return {
        success: false,
        error: "Account is not active",
      };
    }

    // Perform atomic transaction
    const result = await db.transaction(async (tx: any) => {
      // Create transaction record
      const [newTransaction] = await tx
        .insert(transactions)
        .values({
          accountId: validated.accountId,
          type: "deposit",
          amount: amount.toFixed(4),
          description: validated.description || "Deposit",
          status: "pending",
        })
        .returning();

      // Update account balance atomically using SQL
      const [updatedAccount] = await tx
        .update(accounts)
        .set({
          balance: `${(parseFloat(account.balance) + amount).toFixed(4)}`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(accounts.id, validated.accountId))
        .returning();

      // Update transaction with final balance and mark as completed
      await tx
        .update(transactions)
        .set({
          balanceAfter: updatedAccount.balance,
          status: "completed",
        })
        .where(eq(transactions.id, newTransaction.id));

      return {
        transaction: newTransaction,
        newBalance: updatedAccount.balance,
      };
    });

    return {
      success: true,
      message: `Successfully deposited $${amount.toFixed(2)}`,
      data: result,
    };
  } catch (error) {
    console.error("Deposit error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during deposit",
    };
  }
}

export async function getTransactionHistory(accountId: string, limit: number = 50) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to view transactions",
      };
    }

    // Verify account belongs to user
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.id, accountId),
          eq(accounts.userId, session.user.id)
        )
      )
      .limit(1);

    if (!account) {
      return {
        success: false,
        error: "Account not found or access denied",
      };
    }

    // Fetch transactions
    const accountTransactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.accountId, accountId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit);

    return {
      success: true,
      data: accountTransactions,
    };
  } catch (error) {
    console.error("Get transactions error:", error);

    return {
      success: false,
      error: "Failed to fetch transactions",
    };
  }
}

export async function getUserAccounts() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in",
      };
    }

    const userAccounts = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, session.user.id));

    return {
      success: true,
      data: userAccounts,
    };
  } catch (error) {
    console.error("Get accounts error:", error);

    return {
      success: false,
      error: "Failed to fetch accounts",
    };
  }
}

export async function requestWithdrawal(data: WithdrawInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in to make a withdrawal",
      };
    }

    // Validate input
    const validated = withdrawSchema.parse(data);
    const amount = parseFloat(validated.amount);

    // Verify account belongs to user and is active
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.id, validated.accountId),
          eq(accounts.userId, session.user.id)
        )
      )
      .limit(1);

    if (!account) {
      return {
        success: false,
        error: "Account not found or access denied",
      };
    }

    if (account.status !== "active") {
      return {
        success: false,
        error: "Account is not active",
      };
    }

    if (!account.allowWithdrawals) {
      return {
        success: false,
        error: "Account Frozen",
      };
    }

    // Optional: check if there are sufficient funds before allowing a pending withdrawal
    if (parseFloat(account.balance) < amount) {
      return {
        success: false,
        error: "Insufficient funds for this withdrawal",
      };
    }

    // Create a pending transaction. We won't deduct the balance yet.
    // The balance will be adjusted when an admin approves it.
    const [newTransaction] = await db
      .insert(transactions)
      .values({
        accountId: validated.accountId,
        type: "withdrawal",
        amount: amount.toFixed(4),
        description: validated.description || "Withdrawal request",
        status: "pending",
        balanceAfter: account.balance, // Initial balance state when requested
      })
      .returning();

    return {
      success: true,
      message: "Contact bank to approve withdrawals.",
      data: newTransaction,
    };
  } catch (error) {
    console.error("Withdrawal request error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during withdrawal request",
    };
  }
}
