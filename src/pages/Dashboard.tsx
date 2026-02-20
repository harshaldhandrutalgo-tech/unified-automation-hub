import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { RunStatusBadge } from "@/components/StatusBadge";
import {
  Play,
  CheckCircle2,
  Loader2,
  XCircle,
  Activity,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Total Runs",
    value: "—",
    icon: TrendingUp,
    iconBg: "bg-primary-subtle",
    iconColor: "text-primary",
    sub: "All time",
  },
  {
    label: "Completed",
    value: "—",
    icon: CheckCircle2,
    iconBg: "bg-status-success-bg",
    iconColor: "text-status-success",
    sub: "Successfully finished",
  },
  {
    label: "Running",
    value: "—",
    icon: Loader2,
    iconBg: "bg-status-info-bg",
    iconColor: "text-status-info",
    sub: "Currently active",
  },
  {
    label: "Failed",
    value: "—",
    icon: XCircle,
    iconBg: "bg-status-danger-bg",
    iconColor: "text-status-danger",
    sub: "Needs attention",
  },
];

export default function Dashboard() {
  return (
    <Layout title="Dashboard" subtitle="Overview of all automation activity">
      <div className="space-y-6 animate-fade-in">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Recent Activity */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
              </div>
              <span className="text-xs text-muted-foreground">Last 24 hours</span>
            </div>

            <EmptyState
              title="No recent activity"
              description="Automation runs will appear here as they execute."
            />
          </div>

          {/* Quick Stats / Summary */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Automation Summary</h2>
            </div>
            <div className="divide-y divide-border">
              {[
                { label: "APN Automation", status: "pending" as const },
                { label: "PDF Extraction", status: "pending" as const },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <RunStatusBadge status={item.status} />
                </div>
              ))}
              <div className="px-5 py-4">
                <EmptyState
                  title="No summaries"
                  description="Run data will populate here."
                  className="py-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
