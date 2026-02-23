import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPendingTransactions, getAllUsersAccounts } from "@/actions/admin-actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
    const [transactionsRes, usersRes] = await Promise.all([
        getPendingTransactions(),
        getAllUsersAccounts(),
    ]);

    const pendingTxs = transactionsRes.success && transactionsRes.data ? transactionsRes.data : [];
    const usersWithAccounts = usersRes.success && usersRes.data ? usersRes.data : [];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Overview</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{pendingTxs.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Awaiting admin approval
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usersWithAccounts.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Across all users
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Recent Pending Transactions</h3>
                    <Link href="/admin/transactions">
                        <Button variant="outline" size="sm">View All</Button>
                    </Link>
                </div>

                {pendingTxs.length === 0 ? (
                    <p className="text-muted-foreground bg-white p-6 rounded-lg border text-center">
                        No pending transactions at this time.
                    </p>
                ) : (
                    <div className="bg-white rounded-lg border overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pendingTxs.slice(0, 5).map((row: any) => (
                                    <tr key={row.transaction.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{row.user.fullName}</div>
                                            <div className="text-sm text-gray-500">{row.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 capitalize">
                                                {row.transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                            {formatCurrency(row.transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(row.transaction.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
