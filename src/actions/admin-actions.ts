"use server";

import { db } from "@/lib/db";
import { accounts, transactions, users } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

async function verifyAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
        return false;
    }
    return true;
}

export async function getPendingTransactions() {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        const pendingTxs = await db
            .select({
                transaction: transactions,
                account: accounts,
                user: users,
            })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .innerJoin(users, eq(accounts.userId, users.id))
            .where(eq(transactions.status, "pending"))
            .orderBy(desc(transactions.createdAt));

        return { success: true, data: pendingTxs };
    } catch (error) {
        return { success: false, error: "Failed to fetch pending transactions" };
    }
}

export async function approveTransaction(transactionId: string, customDate?: string) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        return await db.transaction(async (tx: any) => {
            // 1. Get the transaction and account details
            const [transaction] = await tx
                .select()
                .from(transactions)
                .where(eq(transactions.id, transactionId))
                .limit(1);

            if (!transaction || transaction.status !== "pending") {
                throw new Error("Transaction not found or already processed");
            }

            const [account] = await tx
                .select()
                .from(accounts)
                .where(eq(accounts.id, transaction.accountId))
                .limit(1);

            if (!account) {
                throw new Error("Associated account not found");
            }

            // 2. Calculate new balance
            const amount = parseFloat(transaction.amount);
            const currentBalance = parseFloat(account.balance);

            let newBalance = currentBalance;
            if (transaction.type === "withdrawal") {
                if (currentBalance < amount) {
                    throw new Error("Insufficient funds to approve this withdrawal");
                }
                newBalance -= amount;
            } else if (transaction.type === "deposit") {
                newBalance += amount;
            }

            // 3. Update the account balance
            const [updatedAccount] = await tx
                .update(accounts)
                .set({
                    balance: newBalance.toFixed(4),
                    updatedAt: sql`CURRENT_TIMESTAMP`,
                })
                .where(eq(accounts.id, account.id))
                .returning();

            const updateData: any = {
                status: "completed",
                balanceAfter: updatedAccount.balance,
            };

            if (customDate) {
                updateData.createdAt = sql`${new Date(customDate).toISOString()}`;
            }

            // 4. Mark transaction as completed
            const [updatedTransaction] = await tx
                .update(transactions)
                .set(updateData)
                .where(eq(transactions.id, transactionId))
                .returning();

            return { success: true, message: "Transaction approved successfully", data: updatedTransaction };
        });
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Approval failed" };
    }
}

export async function rejectTransaction(transactionId: string) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        const [updated] = await db
            .update(transactions)
            .set({ status: "failed" })
            .where(eq(transactions.id, transactionId))
            .returning();

        if (!updated) {
            throw new Error("Transaction not found");
        }

        return { success: true, message: "Transaction rejected successfully" };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Rejection failed" };
    }
}

export async function getAllUsersAccounts() {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };
        const usersWithAccounts = await db
            .select({
                account: accounts,
                user: users,
            })
            .from(accounts)
            .innerJoin(users, eq(accounts.userId, users.id));

        return { success: true, data: usersWithAccounts };
    } catch (err) {
        return { success: false, error: "Failed to fetch user accounts" };
    }
}

export async function updateAccountBalance(accountId: string, newBalance: number) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        const [updatedAccount] = await db
            .update(accounts)
            .set({
                balance: newBalance.toFixed(4),
                updatedAt: sql`CURRENT_TIMESTAMP`
            })
            .where(eq(accounts.id, accountId))
            .returning();

        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return { success: true, message: "Balance updated successfully" };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to update balance" };
    }
}

export async function toggleAccountFreeze(accountId: string, allowWithdrawals: boolean) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        const isSQLite = process.env.DATABASE_URL?.startsWith("file:") || !process.env.DATABASE_URL;

        const [updatedAccount] = await db
            .update(accounts)
            .set({
                allowWithdrawals: (isSQLite ? (allowWithdrawals ? 1 : 0) : allowWithdrawals) as any,
                updatedAt: sql`CURRENT_TIMESTAMP`
            })
            .where(eq(accounts.id, accountId))
            .returning();

        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return { success: true, message: `Account ${allowWithdrawals ? 'unfrozen' : 'frozen'} successfully` };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to toggle freeze state" };
    }
}

export async function insertCustomTransaction(data: {
    accountId: string;
    type: "deposit" | "withdrawal" | "transfer";
    amount: number;
    description: string;
    createdAt: string; // ISO string date for backdating
}) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        return await db.transaction(async (tx: any) => {
            const [account] = await tx
                .select()
                .from(accounts)
                .where(eq(accounts.id, data.accountId))
                .limit(1);

            if (!account) throw new Error("Account not found");

            // Calculate new balance based on the operation
            let currentBalance = parseFloat(account.balance);
            if (data.type === "deposit") currentBalance += data.amount;
            if (data.type === "withdrawal" || data.type === "transfer") currentBalance -= data.amount;

            // Make the arbitrary date object
            const historicalDate = new Date(data.createdAt);

            // Create completed historical transaction
            const [newTx] = await tx
                .insert(transactions)
                .values({
                    accountId: data.accountId,
                    type: data.type,
                    amount: data.amount.toFixed(4),
                    description: data.description || "Admin Created",
                    status: "completed",
                    balanceAfter: currentBalance.toFixed(4),
                    createdAt: sql`${historicalDate.toISOString()}`,
                })
                .returning();

            // Because this might be backdated, we *still* adjust the current actual balance of the account
            // to reflect the overall ledger appropriately.
            await tx
                .update(accounts)
                .set({
                    balance: currentBalance.toFixed(4),
                    updatedAt: sql`CURRENT_TIMESTAMP`,
                })
                .where(eq(accounts.id, data.accountId));

            return { success: true, message: "Custom transaction generated successfully" };
        });
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to insert transaction" };
    }
}

export async function getAllHistoricalTransactions() {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        const allTxs = await db
            .select({
                transaction: transactions,
                account: accounts,
                user: users,
            })
            .from(transactions)
            .innerJoin(accounts, eq(transactions.accountId, accounts.id))
            .innerJoin(users, eq(accounts.userId, users.id))
            .orderBy(desc(transactions.createdAt));

        return { success: true, data: allTxs };
    } catch (error) {
        return { success: false, error: "Failed to fetch all historical transactions" };
    }
}

export async function updateHistoricalTransactionDate(transactionId: string, customDateString: string) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized" };

        const [updatedTransaction] = await db
            .update(transactions)
            .set({
                createdAt: customDateString, // Custom date string from UI (like string literal format in sqlite)
            })
            .where(eq(transactions.id, transactionId))
            .returning();

        if (!updatedTransaction) {
            throw new Error("Transaction not found");
        }

        return { success: true, message: "Transaction date updated successfully" };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to update date" };
    }
}
