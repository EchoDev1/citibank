"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { depositFunds, getUserAccounts } from "@/actions/transaction-actions";
import type { Account } from "@/db/schema";

export default function DepositPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadAccounts() {
      const result = await getUserAccounts();
      if (result.success && result.data) {
        setAccounts(result.data);
        if (result.data.length > 0) {
          setSelectedAccountId(result.data[0].id);
        }
      }
    }
    loadAccounts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await depositFunds({
        accountId: selectedAccountId,
        amount,
        description,
      });

      if (result.success) {
        setSuccess(result.message || "Deposit successful!");
        setAmount("");
        setDescription("");

        // Refresh the page after a delay to show updated balance
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        setError(result.error || "Deposit failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Deposit Funds</h2>
        <p className="text-muted-foreground">Add money to your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Make a Deposit</CardTitle>
          <CardDescription>
            Enter the amount you want to deposit into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="account">Select Account</Label>
              <select
                id="account"
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isLoading || accounts.length === 0}
                required
              >
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} -
                    ****{account.accountNumber.slice(-4)}
                    (${parseFloat(account.balance).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                max="1000000"
                placeholder="100.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Enter the amount you wish to deposit (max: $1,000,000)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                type="text"
                placeholder="e.g., Salary, Gift, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Processing..." : "Deposit Funds"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
