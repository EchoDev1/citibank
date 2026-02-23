import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CreditCard } from "lucide-react";

interface AccountCardProps {
  accountNumber: string;
  accountType: string;
  balance: string;
  currency: string;
}

export function AccountCard({ accountNumber, accountType, balance, currency }: AccountCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {accountType} Account
        </CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(balance, currency)}</div>
        <p className="text-xs text-muted-foreground mt-1">Account: ****{accountNumber.slice(-4)}</p>
      </CardContent>
    </Card>
  );
}
