"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAccounts, getTransactionHistory } from "@/actions/transaction-actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Account, Transaction } from "@/db/schema";
import { Label } from "@/components/ui/label";

export default function TransactionsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAccounts() {
      const result = await getUserAccounts();
      if (result.success && result.data) {
        setAccounts(result.data);
        if (result.data.length > 0) {
          setSelectedAccountId(result.data[0].id);
        }
      }
      setIsLoading(false);
    }
    loadAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccountId) {
      loadTransactions();
    }
  }, [selectedAccountId]);

  async function loadTransactions() {
    setIsLoading(true);
    const result = await getTransactionHistory(selectedAccountId);
    if (result.success && result.data) {
      setTransactions(result.data);
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
        <p className="text-muted-foreground">View all your account transactions</p>
      </div>

      <div className="max-w-md">
        <Label htmlFor="account-select">Select Account</Label>
        <select
          id="account-select"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} -
              ****{account.accountNumber.slice(-4)}
            </option>
          ))}
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found for this account.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Description</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Amount</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Balance After</th>
                    <th className="text-center py-3 px-4 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b last:border-b-0">
                      <td className="py-3 px-4 text-sm">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-sm capitalize">
                        {transaction.type}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {transaction.description || "No description"}
                      </td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-600">
                        +{formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        {formatCurrency(transaction.balanceAfter || "0")}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
