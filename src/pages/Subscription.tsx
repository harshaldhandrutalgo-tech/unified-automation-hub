import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/context/RoleContext";
import { CreditCard, Check, Zap, Shield, Clock, Receipt } from "lucide-react";

const plans = [
  {
    id: "standard",
    name: "Standard",
    price: "$299",
    period: "/month",
    features: ["Up to 500 records/month", "Email notifications", "Basic reporting", "Standard support"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$499",
    period: "/month",
    features: ["Unlimited records", "Priority automation", "Advanced analytics", "Dedicated support", "API access"],
    popular: true,
  },
];

const paymentHistory = [
  { id: "INV-1024", date: "03/01/2026", amount: "$299.00", method: "Visa •••• 4242", status: "Paid" },
  { id: "INV-1018", date: "02/01/2026", amount: "$299.00", method: "Visa •••• 4242", status: "Paid" },
  { id: "INV-1011", date: "01/01/2026", amount: "$299.00", method: "Visa •••• 4242", status: "Paid" },
  { id: "INV-1003", date: "12/01/2025", amount: "$299.00", method: "Visa •••• 4242", status: "Paid" },
];

export default function Subscription() {
  const { role } = useRole();
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("standard");
  const [payOpen, setPayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const moduleLabel = role === "user-apn" ? "APN" : role === "user-ph" ? "Public Health" : "Tax";

  function handleUpgrade(planId: string) {
    setSelectedPlan(planId);
    setPayOpen(true);
  }

  function handlePay() {
    if (!cardNumber || !expiry || !cvc) {
      toast({ title: "Missing Info", description: "Please fill in all card details.", variant: "destructive" });
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCurrentPlan(selectedPlan);
      setPayOpen(false);
      setCardNumber("");
      setExpiry("");
      setCvc("");
      toast({ title: "Payment Successful!", description: `You are now subscribed to the ${plans.find(p => p.id === selectedPlan)?.name} plan.` });
    }, 2000);
  }

  return (
    <Layout title="Subscription & Billing" subtitle={`Manage your ${moduleLabel} subscription and payment details`}>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Current plan */}
        <Card className="shadow-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Plan</p>
                  <p className="text-lg font-bold text-foreground">
                    {moduleLabel} {plans.find(p => p.id === currentPlan)?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[hsl(var(--status-success-bg))] text-[hsl(var(--status-success))] border-0 text-[10px] font-semibold">Active</Badge>
                    <span className="text-xs text-muted-foreground">Next billing: 04/01/2026</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{plans.find(p => p.id === currentPlan)?.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Available Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlan;
              return (
                <Card key={plan.id} className={`shadow-card relative ${plan.popular ? "border-primary ring-1 ring-primary/20" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge className="bg-primary text-primary-foreground text-[10px] font-semibold">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <p className="text-base font-bold text-foreground">{moduleLabel} {plan.name}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span></p>
                    </div>
                    <ul className="space-y-2 mb-5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-[hsl(var(--status-success))] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {isCurrent ? (
                      <Button disabled className="w-full" variant="outline" size="sm">Current Plan</Button>
                    ) : (
                      <Button className="w-full" size="sm" onClick={() => handleUpgrade(plan.id)}>
                        {plan.id === "pro" ? "Upgrade" : "Downgrade"} to {plan.name}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment Method */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2"><CreditCard className="h-4 w-4 text-muted-foreground" /> Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/40 border border-border">
              <div className="flex h-10 w-14 items-center justify-center rounded-md bg-background border border-border">
                <span className="text-xs font-bold text-primary">VISA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2028</p>
              </div>
              <Badge className="bg-[hsl(var(--status-success-bg))] text-[hsl(var(--status-success))] border-0 text-[10px]">Default</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2"><Receipt className="h-4 w-4 text-muted-foreground" /> Payment History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Invoice</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Method</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="text-sm font-mono text-muted-foreground">{inv.id}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.method}</TableCell>
                    <TableCell>
                      <Badge className="bg-[hsl(var(--status-success-bg))] text-[hsl(var(--status-success))] border-0 text-[10px] font-semibold">{inv.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={payOpen} onOpenChange={setPayOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Payment
              </DialogTitle>
              <DialogDescription>
                Subscribe to {moduleLabel} {plans.find(p => p.id === selectedPlan)?.name} — {plans.find(p => p.id === selectedPlan)?.price}/month
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-subtle">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px] cursor-pointer border-primary text-primary">Card</Badge>
                  <Badge variant="outline" className="text-[10px] cursor-pointer text-muted-foreground">PayPal</Badge>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Card Number</label>
                <Input
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Expiry</label>
                  <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength={5} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">CVC</label>
                  <Input placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} maxLength={4} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Demo mode — no real charges will be made</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPayOpen(false)} size="sm">Cancel</Button>
              <Button onClick={handlePay} disabled={processing} size="sm">
                {processing ? (
                  <span className="flex items-center gap-2"><Clock className="h-3 w-3 animate-spin" /> Processing…</span>
                ) : (
                  `Pay ${plans.find(p => p.id === selectedPlan)?.price}`
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
