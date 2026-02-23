import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Citibank Online - Banking, Credit Cards & Loans",
  description: "Welcome to Citibank Online Banking. Manage your accounts, pay bills, transfer money and access credit cards and loans securely.",
  keywords: "Citibank, online banking, credit cards, savings accounts, checking accounts, loans",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
