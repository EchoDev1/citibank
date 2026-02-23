import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency: string = "USD"): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
}

export function formatDate(date: any): string {
  if (!date) return "N/A";

  let d: Date;

  if (date instanceof Date) {
    d = date;
  } else if (typeof date === "number") {
    d = new Date(date > 20000000000 ? date : date * 1000);
  } else if (typeof date === "string") {
    if (date.trim().toLowerCase() === "invalid date") return "Invalid Date";
    if (date.includes(" AM") || date.includes(" PM") || date === "N/A") return date;

    if (!isNaN(Number(date)) && date.trim() !== "") {
      const ms = Number(date);
      d = new Date(ms > 20000000000 ? ms : ms * 1000);
    } else {
      let strDate = date;
      if (strDate.includes(" ") && !strDate.includes("T")) {
        strDate = strDate.replace(" ", "T") + "Z";
      }
      d = new Date(strDate);
    }
  } else {
    return "Invalid Date";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch (e) {
    return "Invalid Date";
  }
}

export function generateAccountNumber(): string {
  // Generate a 10-digit account number
  const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, "0");
  return randomDigits;
}
