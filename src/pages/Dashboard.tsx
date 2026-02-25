import { Layout } from "@/components/Layout";
import { RunStatusBadge } from "@/components/StatusBadge";
import {
  CheckCircle2,
  Loader2,
  XCircle,
  TrendingUp,
  Activity,
  FileSpreadsheet,
  HeartPulse,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    label: "Total Records",
    value: "13",
    change: "+3 this week",
    changeUp: true,
    icon: TrendingUp,
    iconBg: "bg-primary-subtle",
    iconColor: "text-primary",
  },
  {
    label: "APN Cases",
    value: "6",
    change: "1 new complaint",
    changeUp: true,
    icon: FileSpreadsheet,
    iconBg: "bg-status-info-bg",
    iconColor: "text-status-info",
  },
  {
    label: "PH Violations",
    value: "7",
    change: "2 pending review",
    changeUp: false,
    icon: HeartPulse,
    iconBg: "bg-status-warning-bg",
    iconColor: "text-status-warning",
  },
  {
    label: "Open Cases",
    value: "9",
    change: "4 unresolved",
    changeUp: false,
    icon: Clock,
    iconBg: "bg-status-danger-bg",
    iconColor: "text-status-danger",
  },
];

const recentActivity = [
  { id: 1, action: "New complaint received", detail: "10910 S AVALON BLVD — APN 6071003029", time: "2 hours ago", type: "apn" as const },
  { id: 2, action: "Violation report uploaded", detail: "1423 W MLK JR BLVD — pest_control_2150.pdf", time: "5 hours ago", type: "ph" as const },
  { id: 3, action: "Hearing case updated", detail: "976 W 46TH ST — Case #13306", time: "1 day ago", type: "apn" as const },
  { id: 4, action: "Abatement order issued", detail: "8901 S BROADWAY — AO-73219", time: "2 days ago", type: "ph" as const },
  { id: 5, action: "Site visit completed", detail: "195 W 41ST PL — Case #115293", time: "3 days ago", type: "apn" as const },
];

const automationSummary = [
  { label: "APN Automation", status: "completed" as const, records: 6, lastRun: "Today, 10:32 AM" },
  { label: "Public Health", status: "completed" as const, records: 7, lastRun: "Today, 09:15 AM" },
];

const caseTypeBreakdown = [
  { type: "Hearing", count: 2, color: "bg-primary" },
  { type: "Complaint", count: 1, color: "bg-status-warning" },
  { type: "Substandard", count: 1, color: "bg-status-danger" },
  { type: "Out Reach Case", count: 1, color: "bg-status-info" },
  { type: "Property Mgmt Training", count: 1, color: "bg-status-success" },
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
              className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    {stat.changeUp ? (
                      <ArrowUpRight className="h-3 w-3 text-status-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-status-warning" />
                    )}
                    <p className="text-[11px] text-muted-foreground">{stat.change}</p>
                  </div>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Recent Activity */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
              </div>
              <span className="text-[11px] text-muted-foreground">Last 7 days</span>
            </div>

            <div className="divide-y divide-border">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors">
                  <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${item.type === "apn" ? "bg-status-info-bg" : "bg-status-warning-bg"}`}>
                    {item.type === "apn" ? (
                      <FileSpreadsheet className="h-3.5 w-3.5 text-status-info" />
                    ) : (
                      <HeartPulse className="h-3.5 w-3.5 text-status-warning" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{item.action}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Automation Summary */}
            <div className="rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold text-foreground">Automation Summary</h2>
              </div>
              <div className="divide-y divide-border">
                {automationSummary.map((item) => (
                  <div key={item.label} className="px-5 py-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <RunStatusBadge status={item.status} />
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{item.records} records</span>
                      <span>·</span>
                      <span>{item.lastRun}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Type Breakdown */}
            <div className="rounded-xl border border-border bg-card shadow-card">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold text-foreground">APN Case Types</h2>
              </div>
              <div className="px-5 py-4 space-y-3">
                {caseTypeBreakdown.map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground">{item.type}</span>
                      <span className="text-xs font-semibold text-foreground">{item.count}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className={`h-1.5 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/apn-automation"
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-info-bg">
              <FileSpreadsheet className="h-5 w-5 text-status-info" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">APN Automation</p>
              <p className="text-xs text-muted-foreground mt-0.5">6 case records · View all</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link
            to="/public-health-automation"
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-warning-bg">
              <HeartPulse className="h-5 w-5 text-status-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Public Health Safety</p>
              <p className="text-xs text-muted-foreground mt-0.5">7 violation records · View all</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
