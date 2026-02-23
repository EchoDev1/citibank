import { auth } from "@/lib/auth";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={session?.user?.name} />
      <div className="flex">
        <Sidebar isAdmin={session?.user?.role === "admin"} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
