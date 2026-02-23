"use client";

import { useState, useEffect } from "react";
import { getAllUsersAccounts, insertCustomTransaction, getAllHistoricalTransactions, updateHistoricalTransactionDate } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomHistoryPage() {
    const [usersWithAccounts, setUsersWithAccounts] = useState<any[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState("");
    const [type, setType] = useState<"deposit" | "withdrawal">("deposit");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const [allTxs, setAllTxs] = useState<any[]>([]);
    const [editingTxId, setEditingTxId] = useState<string | null>(null);
    const [editDateStr, setEditDateStr] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const result = await getAllUsersAccounts();
        if (result.success && result.data) {
            setUsersWithAccounts(result.data);
            if (result.data.length > 0) {
                setSelectedAccountId(result.data[0].account.id);
            }
        }

        const txResult = await getAllHistoricalTransactions();
        if (txResult.success && txResult.data) {
            setAllTxs(txResult.data);
        }

        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setCreatedAt(now.toISOString().slice(0, 16));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            if (!selectedAccountId || !amount || parseFloat(amount) <= 0 || !createdAt) {
                throw new Error("Please fill out all fields correctly.");
            }

            const result = await insertCustomTransaction({
                accountId: selectedAccountId,
                type,
                amount: parseFloat(amount),
                description,
                createdAt: new Date(createdAt).toISOString(),
            });

            if (result.success) {
                setSuccess("Historical transaction generated successfully.");
                setAmount("");
                setDescription("");
                loadData();
            } else {
                setError(result.error || "Failed to create transaction.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUpdateDate(txId: string) {
        setError("");
        setSuccess("");

        const res = await updateHistoricalTransactionDate(txId, editDateStr);
        if (res.success) {
            setSuccess("Transaction date updated.");
            setEditingTxId(null);
            loadData();
        } else {
            setError(res.error || "Failed to update date");
        }
    }

    return (
        <div className="max-w-6xl space-y-8">
            <div className="mb-2">
                <h2 className="text-2xl font-bold tracking-tight">Admin History Portal</h2>
                <p className="text-muted-foreground">Manage transaction history completely, create backdated logs, and rewrite existing dates.</p>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate Transaction</CardTitle>
                            <CardDescription>
                                Alter balance and insert new history.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="account">Select User Account</Label>
                                    <select
                                        id="account"
                                        value={selectedAccountId}
                                        onChange={(e) => setSelectedAccountId(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        disabled={isLoading || usersWithAccounts.length === 0}
                                        required
                                    >
                                        {usersWithAccounts.map((item) => (
                                            <option key={item.account.id} value={item.account.id}>
                                                {item.user.fullName} ({item.user.email}) - {item.account.accountType}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <select
                                        id="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value as any)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        disabled={isLoading}
                                    >
                                        <option value="deposit">Deposit (+)</option>
                                        <option value="withdrawal">Withdrawal (-)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount ($)</Label>
                                    <Input id="amount" type="number" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={isLoading} required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Tx Date (ISO limit format)</Label>
                                    <Input id="date" type="datetime-local" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} disabled={isLoading} required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description line</Label>
                                    <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading} required />
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    Generate
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Platform Transactions</CardTitle>
                            <CardDescription>
                                You can overwrite the specific timestamp visual text for any record here securely.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border overflow-x-auto max-h-[600px] overflow-y-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-slate-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3">Timestamp / Date</th>
                                            <th className="px-4 py-3">User</th>
                                            <th className="px-4 py-3">Info</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {allTxs.map((row) => (
                                            <tr key={row.transaction.id} className="hover:bg-slate-50">
                                                <td className="px-4 py-3 min-w-[200px]">
                                                    {editingTxId === row.transaction.id ? (
                                                        <div className="flex gap-2">
                                                            <Input
                                                                className="h-8 text-xs"
                                                                value={editDateStr}
                                                                onChange={(e) => setEditDateStr(e.target.value)}
                                                                placeholder="e.g. Feb 19, 2026, 04:30 AM"
                                                            />
                                                            <Button size="sm" className="h-8 px-2" onClick={() => handleUpdateDate(row.transaction.id)}>Save</Button>
                                                            <Button size="sm" variant="outline" className="h-8 px-2" onClick={() => setEditingTxId(null)}>Cancel</Button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-between items-center group">
                                                            <span>{formatDate(row.transaction.createdAt)}</span>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingTxId(row.transaction.id);
                                                                    setEditDateStr(row.transaction.createdAt || "");
                                                                }}
                                                                className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity underline ml-2"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">{row.user.fullName}</div>
                                                    <div className="text-xs text-muted-foreground">{row.user.email}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="uppercase text-[10px] font-bold text-slate-500">{row.transaction.type}</div>
                                                    <div className="truncate max-w-[150px]" title={row.transaction.description}>{row.transaction.description}</div>
                                                </td>
                                                <td className="px-4 py-3 font-medium">
                                                    {row.transaction.type === "withdrawal" || row.transaction.type === "transfer" ? "-" : "+"}
                                                    {formatCurrency(row.transaction.amount)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${row.transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            row.transaction.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {row.transaction.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {allTxs.length === 0 && (
                                            <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No transactions exist anywhere.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
