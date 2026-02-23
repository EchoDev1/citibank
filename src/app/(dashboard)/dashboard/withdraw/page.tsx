"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { requestWithdrawal, getUserAccounts } from "@/actions/transaction-actions";
import type { Account } from "@/db/schema";
import { BuildingIcon, ArrowRightLeft, ShieldAlert } from "lucide-react";

export default function WithdrawPage() {
    const router = useRouter();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [destinationBank, setDestinationBank] = useState("");
    const [destinationAccountName, setDestinationAccountName] = useState("");
    const [destinationAccountNumber, setDestinationAccountNumber] = useState("");

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

        const fullDescription = destinationBank
            ? `Wire Transfer to ${destinationBank} - ${destinationAccountName}. Notes: ${description}`
            : description;

        try {
            const result = await requestWithdrawal({
                accountId: selectedAccountId,
                amount,
                description: fullDescription,
            });

            if (result.success) {
                setSuccess(result.message || "Contact bank to approve withdrawals.");
                setAmount("");
                setDescription("");
                setDestinationBank("");
                setDestinationAccountName("");
                setDestinationAccountNumber("");

                setTimeout(() => {
                    router.refresh();
                }, 3000);
            } else {
                setError(result.error || "Withdrawal failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-4">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-light text-[#056DAE] tracking-tight">Move Money</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Transfer funds to an external bank account instantly.</p>
                </div>
                <div className="hidden md:flex h-12 w-12 bg-blue-50 rounded-full items-center justify-center text-[#056DAE]">
                    <ArrowRightLeft size={24} />
                </div>
            </div>

            <Card className="border-t-4 border-t-[#056DAE] shadow-lg">
                <CardHeader className="bg-slate-50/50 border-b pb-6">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <BuildingIcon className="h-5 w-5 text-[#056DAE]" />
                        Wire Transfer / External Withdrawal
                    </CardTitle>
                    <CardDescription>
                        Complete the form below to initiate an outbound transfer. Large transactions may require additional verification.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start text-sm">
                                <ShieldAlert className="h-5 w-5 mr-2 shrink-0" />
                                <div>
                                    <p className="font-bold">Transaction Error</p>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="bg-blue-50 border-l-4 border-[#056DAE] text-blue-900 p-4 rounded-md flex items-start text-sm">
                                <ShieldAlert className="h-5 w-5 mr-2 shrink-0 text-[#056DAE]" />
                                <div>
                                    <p className="font-bold">Transfer Pending</p>
                                    <p>{success}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">From Account</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="account">Select Origin Account</Label>
                                            <select
                                                id="account"
                                                value={selectedAccountId}
                                                onChange={(e) => setSelectedAccountId(e.target.value)}
                                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#056DAE] cursor-pointer"
                                                disabled={isLoading || accounts.length === 0}
                                                required
                                            >
                                                {accounts.map((account) => (
                                                    <option key={account.id} value={account.id}>
                                                        Citi {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} ••••{account.accountNumber.slice(-4)} - ${parseFloat(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="amount">Transfer Amount ($)</Label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                                    $
                                                </div>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.01"
                                                    placeholder="0.00"
                                                    className="pl-8 h-12 text-lg font-medium"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">To Destination</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="destBank">Receiving Bank Name</Label>
                                            <Input
                                                id="destBank"
                                                type="text"
                                                placeholder="e.g. Chase Bank, Bank of America"
                                                value={destinationBank}
                                                onChange={(e) => setDestinationBank(e.target.value)}
                                                className="h-10"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="destName">Account Holder Name</Label>
                                            <Input
                                                id="destName"
                                                type="text"
                                                placeholder="Name on receiving account"
                                                value={destinationAccountName}
                                                onChange={(e) => setDestinationAccountName(e.target.value)}
                                                className="h-10"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="destAccount">Account or IBAN Number</Label>
                                            <Input
                                                id="destAccount"
                                                type="text"
                                                placeholder="Routing / Account No."
                                                value={destinationAccountNumber}
                                                onChange={(e) => setDestinationAccountNumber(e.target.value)}
                                                className="h-10"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label htmlFor="description">Message to Receiver (Optional)</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Payment reference, invoice number, etc."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 h-12 text-base font-semibold bg-[#056DAE] hover:bg-[#045A92]"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing Request..." : "Submit Transfer"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 text-base"
                                onClick={() => router.push("/dashboard")}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t justify-center text-xs text-muted-foreground p-4">
                    Secure 256-bit Encrypted Transfer • Processed by Citibank Global Network
                </CardFooter>
            </Card>
        </div>
    );
}
