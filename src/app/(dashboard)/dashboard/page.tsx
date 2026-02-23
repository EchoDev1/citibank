import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { accounts, transactions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { AccountCard } from "@/components/dashboard/account-card";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user accounts
  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, session.user.id));

  // Fetch recent transactions across all accounts
  const accountIds = userAccounts.map((acc: any) => acc.id);
  const recentTransactions = await db
    .select()
    .from(transactions)
    .where(eq(transactions.accountId, accountIds[0] || ""))
    .orderBy(desc(transactions.createdAt))
    .limit(5);

  // Calculate total balance
  const totalBalance = userAccounts.reduce(
    (sum: any, acc: any) => sum + parseFloat(acc.balance),
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {userAccounts.length} account{userAccounts.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        {userAccounts.map((account: any) => (
          <AccountCard
            key={account.id}
            accountNumber={account.accountNumber}
            accountType={account.accountType}
            balance={account.balance}
            currency={account.currency}
          />
        ))}
      </div>

      {recentTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.description || "No description"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      +{formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Balance: {formatCurrency(transaction.balanceAfter || "0")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
