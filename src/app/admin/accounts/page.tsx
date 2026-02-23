"use client";

import { useState, useEffect } from "react";
import { getAllUsersAccounts, updateAccountBalance, toggleAccountFreeze } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Check, X, ShieldAlert } from "lucide-react";

type UserAccountData = {
    account: {
        id: string;
        accountNumber: string;
        accountType: string;
        balance: string;
        status: string;
        allowWithdrawals: boolean;
    };
    user: {
        id: string;
        email: string;
        fullName: string;
    };
};

export default function AdminAccountsPage() {
    const [accountsData, setAccountsData] = useState<UserAccountData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
    const [editBalance, setEditBalance] = useState<string>("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setIsLoading(true);
        const result = await getAllUsersAccounts();
        if (result.success && result.data) {
            setAccountsData(result.data);
        }
        setIsLoading(false);
    }

    function handleEditStart(account: UserAccountData['account']) {
        setEditingAccountId(account.id);
        setEditBalance(parseFloat(account.balance).toFixed(2));
        setError("");
        setSuccess("");
    }

    async function handleSaveBalance(accountId: string) {
        setError("");
        setSuccess("");

        const newBalance = parseFloat(editBalance);
        if (isNaN(newBalance) || newBalance < 0) {
            setError("Please enter a valid positive number.");
            return;
        }

        const result = await updateAccountBalance(accountId, newBalance);
        if (result.success) {
            setSuccess(result.message || "Balance updated successfully.");
            setEditingAccountId(null);
            loadData(); // Reload to reflect changes globally
        } else {
            setError(result.error || "Failed to update balance.");
        }
    }

    async function handleToggleFreeze(accountId: string, currentlyAllowed: boolean) {
        setError("");
        setSuccess("");
        setActionLoading(accountId);

        const result = await toggleAccountFreeze(accountId, !currentlyAllowed);

        if (result.success) {
            setSuccess(result.message || "Account state updated successfully.");
            loadData();
        } else {
            setError(result.error || "Failed to toggle account state.");
        }
        setActionLoading(null);
    }

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">User Accounts Manager</h2>
                <p className="text-muted-foreground">Directly manage and edit user account balances.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm border border-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm border border-green-200">
                    {success}
                </div>
            )}

            {isLoading ? (
                <p>Loading accounts...</p>
            ) : accountsData.length === 0 ? (
                <p>No user accounts found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {accountsData.map((data) => (
                        <Card key={data.account.id} className="shadow-sm">
                            <CardHeader className="pb-4 border-b bg-slate-50/50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Users className="h-4 w-4 text-slate-500" />
                                            {data.user.fullName}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            {data.user.email}
                                        </CardDescription>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <div className="px-2 py-1 bg-slate-200 text-xs rounded font-medium text-slate-700 uppercase">
                                            {data.account.accountType}
                                        </div>
                                        {!data.account.allowWithdrawals && (
                                            <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-bold uppercase flex items-center gap-1">
                                                <ShieldAlert className="h-3 w-3" />
                                                Frozen
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <div className="text-sm">
                                    <span className="text-muted-foreground mr-2">Account No:</span>
                                    <span className="font-medium">••••{data.account.accountNumber.slice(-4)}</span>
                                </div>
                                <div className="p-4 bg-slate-100 rounded-lg">
                                    {editingAccountId === data.account.id ? (
                                        <div className="space-y-3">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Edit Balance ($):
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
                                                        $
                                                    </div>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={editBalance}
                                                        onChange={(e) => setEditBalance(e.target.value)}
                                                        className="pl-6 h-9"
                                                    />
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 h-9 px-2"
                                                    onClick={() => handleSaveBalance(data.account.id)}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-9 px-2"
                                                    onClick={() => setEditingAccountId(null)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                                Current Balance
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-2xl font-bold flex items-center text-slate-800">
                                                    <DollarSign className="h-5 w-5 text-slate-400" />
                                                    {parseFloat(data.account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => handleEditStart(data.account)}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-2 border-t mt-4 flex justify-end">
                                    <Button
                                        size="sm"
                                        variant={data.account.allowWithdrawals ? "destructive" : "outline"}
                                        onClick={() => handleToggleFreeze(data.account.id, data.account.allowWithdrawals)}
                                        disabled={actionLoading === data.account.id}
                                        className={!data.account.allowWithdrawals ? "text-green-600 border-green-200 hover:bg-green-50" : ""}
                                    >
                                        {actionLoading === data.account.id
                                            ? "Updating..."
                                            : data.account.allowWithdrawals
                                                ? "Freeze Withdrawals"
                                                : "Restore Withdrawals"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
