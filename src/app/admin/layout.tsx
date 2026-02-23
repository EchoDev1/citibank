import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, ShieldCheck, ListOrdered, CalendarClock, Users } from "lucide-react";
import { CitibankLogoText } from "@/components/layout/citibank-logo";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    // Check for admin role
    if (session.user.role !== "admin") {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <Link href="/admin">
                        <CitibankLogoText className="h-8" />
                    </Link>
                </div>

                <div className="p-4 space-y-4">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Management
                    </div>
                    <nav className="space-y-1">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ShieldCheck className="h-5 w-5" />
                            Overview
                        </Link>
                        <Link
                            href="/admin/accounts"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <Users className="h-5 w-5" />
                            Accounts Manager
                        </Link>
                        <Link
                            href="/admin/transactions"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ListOrdered className="h-5 w-5" />
                            Pending Withdrawals
                        </Link>
                        <Link
                            href="/admin/history"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <CalendarClock className="h-5 w-5" />
                            Custom History
                        </Link>
                    </nav>
                </div>

                <div className="absolute bottom-0 w-64 p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                            <span className="font-semibold text-sm">
                                {session.user.name?.charAt(0) || "A"}
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{session.user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
                        </div>
                    </div>

                    <form
                        action={async () => {
                            "use server";
                            const { signOut } = await import("@/lib/auth");
                            await signOut();
                        }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Log out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="h-16 flex items-center px-8 border-b bg-white">
                    <h1 className="text-xl font-semibold">Admin Portal</h1>
                </div>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
