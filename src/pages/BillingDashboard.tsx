import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    label: "Monthly Revenue",
    value: "$12,480",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
  },
  {
    label: "Active Subscribers",
    value: "34",
    change: "+3",
    up: true,
    icon: Users,
  },
  {
    label: "Avg. Revenue / User",
    value: "$367",
    change: "+8.2%",
    up: true,
    icon: TrendingUp,
  },
  {
    label: "Failed Payments",
    value: "2",
    change: "-1",
    up: false,
    icon: CreditCard,
  },
];

const subscribers = [
  { name: "Acme Corp", email: "billing@acme.com", plan: "APN Pro", amount: "$499/mo", status: "Active", nextBilling: "04/15/2026" },
  { name: "City Health Dept", email: "admin@cityhealth.gov", plan: "PH Standard", amount: "$299/mo", status: "Active", nextBilling: "04/01/2026" },
  { name: "Metro Planning", email: "finance@metro.org", plan: "APN Standard", amount: "$299/mo", status: "Active", nextBilling: "04/10/2026" },
  { name: "Rural Health Inc", email: "pay@ruralhealth.com", plan: "PH Pro", amount: "$499/mo", status: "Past Due", nextBilling: "03/20/2026" },
  { name: "StateWide Assessors", email: "acct@swa.com", plan: "APN Pro", amount: "$499/mo", status: "Active", nextBilling: "05/01/2026" },
  { name: "County Services", email: "bill@county.gov", plan: "PH Standard", amount: "$299/mo", status: "Cancelled", nextBilling: "—" },
];

const recentTransactions = [
  { id: "TXN-4821", user: "Acme Corp", amount: "$499.00", date: "03/14/2026", method: "Visa •••• 4242", status: "Succeeded" },
  { id: "TXN-4820", user: "City Health Dept", amount: "$299.00", date: "03/12/2026", method: "Mastercard •••• 8888", status: "Succeeded" },
  { id: "TXN-4819", user: "Rural Health Inc", amount: "$499.00", date: "03/10/2026", method: "Visa •••• 1234", status: "Failed" },
  { id: "TXN-4818", user: "Metro Planning", amount: "$299.00", date: "03/08/2026", method: "PayPal", status: "Succeeded" },
  { id: "TXN-4817", user: "StateWide Assessors", amount: "$499.00", date: "03/05/2026", method: "Amex •••• 0005", status: "Succeeded" },
];

function statusBadge(status: string) {
  if (status === "Active" || status === "Succeeded")
    return <Badge className="bg-[hsl(var(--status-success-bg))] text-[hsl(var(--status-success))] border-0 text-[10px] font-semibold">{status}</Badge>;
  if (status === "Past Due" || status === "Failed")
    return <Badge className="bg-[hsl(var(--status-danger-bg))] text-[hsl(var(--status-danger))] border-0 text-[10px] font-semibold">{status}</Badge>;
  return <Badge className="bg-[hsl(var(--status-neutral-bg))] text-[hsl(var(--status-neutral))] border-0 text-[10px] font-semibold">{status}</Badge>;
}

export default function BillingDashboard() {
  return (
    <Layout title="Billing Dashboard" subtitle="Revenue overview and subscriber management">
      <div className="space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-subtle">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-[hsl(var(--status-success))]" : "text-[hsl(var(--status-danger))]"}`}>
                    {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribers */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Subscribers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Plan</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Next Billing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((sub) => (
                  <TableRow key={sub.email}>
                    <TableCell>
                      <p className="text-sm font-medium text-foreground">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">{sub.email}</p>
                    </TableCell>
                    <TableCell className="text-sm">{sub.plan}</TableCell>
                    <TableCell className="text-sm font-medium">{sub.amount}</TableCell>
                    <TableCell>{statusBadge(sub.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{sub.nextBilling}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Transaction ID</TableHead>
                  <TableHead className="text-xs">User</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Method</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-sm font-mono text-muted-foreground">{tx.id}</TableCell>
                    <TableCell className="text-sm">{tx.user}</TableCell>
                    <TableCell className="text-sm font-medium">{tx.amount}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.method}</TableCell>
                    <TableCell>{statusBadge(tx.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
