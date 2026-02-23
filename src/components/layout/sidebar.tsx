"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ArrowUpCircle, ArrowDownCircle, History, ShieldCheck } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Deposit Funds", href: "/dashboard/deposit", icon: ArrowUpCircle },
  { name: "Withdraw Funds", href: "/dashboard/withdraw", icon: ArrowDownCircle },
  { name: "Transactions", href: "/dashboard/transactions", icon: History },
];

export function Sidebar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#056DAE] text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-[#056DAE]"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-amber-700 hover:bg-amber-50"
            >
              <ShieldCheck className="h-5 w-5" />
              Admin Portal
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}
