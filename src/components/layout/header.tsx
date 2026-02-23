"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { CitibankLogoText } from "./citibank-logo";

interface HeaderProps {
  userName?: string | null;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="bg-[#056DAE] border-b-4 border-[#D41F3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard">
              <CitibankLogoText className="h-9" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <User className="h-4 w-4" />
              <span>{userName || "User"}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-white text-[#056DAE] border-white hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
