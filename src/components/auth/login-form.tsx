"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden w-full max-w-[400px]">
      <div className="p-6 pb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-xs rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <div className="space-y-1 w-1/2">
              <Label htmlFor="email" className="text-[12px] font-bold text-slate-800">User ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="User ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 border-slate-300 focus-visible:ring-1 focus-visible:ring-blue-600 rounded-lg text-[15px] italic text-slate-600 shadow-sm transition-all"
              />
            </div>

            <div className="space-y-1 w-1/2">
              <Label htmlFor="password" className="text-[12px] font-bold text-slate-800">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 border-slate-300 focus-visible:ring-1 focus-visible:ring-blue-600 rounded-lg text-[15px] italic text-slate-600 shadow-sm transition-all pr-10"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 pb-2">
            <input type="checkbox" id="remember" className="h-5 w-5 rounded-[4px] border-2 border-slate-400 text-blue-600 focus:ring-blue-600 cursor-pointer" />
            <Label htmlFor="remember" className="text-[14px] text-slate-600 font-medium cursor-pointer">Remember User ID</Label>
          </div>

          <Button type="submit" className="w-full bg-[#005f9e] hover:bg-[#004b80] h-12 rounded-lg font-bold text-[16px] tracking-wide transition-colors" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign On"}
          </Button>

          <div className="flex items-center justify-between text-[13px] text-[#005f9e] font-medium pt-3 pb-2">
            <div>
              <Link href="/register" className="hover:underline">Register</Link>
              <span className="mx-1.5 text-slate-800">/</span>
              <Link href="#" className="hover:underline">Activate</Link>
            </div>
            <div>
              <span className="text-slate-600 font-normal">Forgot </span>
              <Link href="#" className="hover:underline">User ID</Link>
              <span className="text-slate-600 font-normal"> or </span>
              <Link href="#" className="hover:underline">Password</Link>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-slate-100 p-4 border-t border-slate-200">
        <button type="button" className="w-full flex items-center justify-center gap-2 text-[#005f9e] hover:text-[#004b80] font-bold text-[15px] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h4v4H4z" /><path d="M4 16h4v4H4z" /><path d="M16 4h4v4h-4z" /><path d="M16 16h4v4h-4z" /><path d="M12 4v16" /><path d="M4 12h16" /></svg>
          Passwordless Sign On
        </button>
      </div>
    </div>
  );
}
