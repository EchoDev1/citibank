import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { transactions, accounts } from "@/db/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (accountId) {
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
        return NextResponse.json(
          { error: "Account not found or access denied" },
          { status: 404 }
        );
      }

      // Get transactions for specific account
      const accountTransactions = await db
        .select()
        .from(transactions)
        .where(eq(transactions.accountId, accountId))
        .orderBy(desc(transactions.createdAt))
        .limit(limit);

      return NextResponse.json({
        success: true,
        data: accountTransactions,
      });
    } else {
      // Get all user's accounts
      const userAccounts = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, session.user.id));

      if (userAccounts.length === 0) {
        return NextResponse.json({
          success: true,
          data: [],
        });
      }

      const accountIds = userAccounts.map((acc: any) => acc.id);

      // Get transactions for all user's accounts
      const allTransactions = await db
        .select()
        .from(transactions)
        .where(inArray(transactions.accountId, accountIds))
        .orderBy(desc(transactions.createdAt))
        .limit(limit);

      return NextResponse.json({
        success: true,
        data: allTransactions,
      });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
