import { getPendingTransactions, approveTransaction, rejectTransaction } from "@/actions/admin-actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function PendingTransactionsPage() {
    const transactionsRes = await getPendingTransactions();
    const pendingTxs = transactionsRes.success && transactionsRes.data ? transactionsRes.data : [];

    async function handleApprove(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        const customDate = formData.get("customDate") as string;
        await approveTransaction(id, customDate || undefined);
        revalidatePath("/admin/transactions");
    }

    async function handleReject(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await rejectTransaction(id);
        revalidatePath("/admin/transactions");
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Pending Withdrawals</h2>

            {pendingTxs.length === 0 ? (
                <div className="bg-white p-8 rounded-lg border text-center">
                    <p className="text-muted-foreground">All caught up! No pending transactions require approval.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendingTxs.map((row: any) => (
                                <tr key={row.transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(row.transaction.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{row.user.fullName}</div>
                                        <div className="text-sm text-gray-500">{row.user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>{row.account.accountType}</div>
                                        <div className="text-xs">****{row.account.accountNumber.slice(-4)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">
                                        <span className="text-amber-600">
                                            {formatCurrency(row.transaction.amount)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center justify-center gap-2">
                                            <form action={handleApprove} className="flex gap-2 items-center">
                                                <input type="hidden" name="id" value={row.transaction.id} />
                                                <input
                                                    type="date"
                                                    name="customDate"
                                                    className="border rounded text-xs px-2 py-1 max-w-[120px]"
                                                    title="Optional: Set a custom backdate for approval"
                                                />
                                                <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                                            </form>
                                            <form action={handleReject}>
                                                <input type="hidden" name="id" value={row.transaction.id} />
                                                <Button type="submit" size="sm" variant="destructive">Reject</Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
