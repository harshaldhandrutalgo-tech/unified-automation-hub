import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { RunStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ScrollText, Search, Filter, SlidersHorizontal } from "lucide-react";

const automationTypes = ["All Types", "APN Automation", "Public Health"];
const statusTypes = ["All Statuses", "Completed", "Running", "Failed", "Pending"];

type LogEntry = {
  id: string;
  type: "APN Automation" | "Public Health";
  status: "Completed" | "Running" | "Failed" | "Pending";
  startTime: Date;
  endTime: Date | null;
  message: string;
  records: number;
};

const mockLogs: LogEntry[] = [
  { id: "RUN-0047", type: "APN Automation", status: "Completed", startTime: new Date("2026-03-02T08:15:00"), endTime: new Date("2026-03-02T08:22:34"), message: "Scraped 142 APN records from county assessor portal", records: 142 },
  { id: "RUN-0046", type: "Public Health", status: "Completed", startTime: new Date("2026-03-02T07:00:00"), endTime: new Date("2026-03-02T07:11:18"), message: "Scraped 87 violation reports from health dept database", records: 87 },
  { id: "RUN-0045", type: "APN Automation", status: "Running", startTime: new Date("2026-03-02T06:30:00"), endTime: null, message: "Scraping property case data for 56 APNs in progress…", records: 32 },
  { id: "RUN-0044", type: "Public Health", status: "Failed", startTime: new Date("2026-03-01T22:00:00"), endTime: new Date("2026-03-01T22:03:12"), message: "Connection timeout on sanitation records endpoint", records: 0 },
  { id: "RUN-0043", type: "APN Automation", status: "Completed", startTime: new Date("2026-03-01T18:00:00"), endTime: new Date("2026-03-01T18:09:45"), message: "Scraped 98 APN case items; 12 new closures detected", records: 98 },
  { id: "RUN-0042", type: "Public Health", status: "Completed", startTime: new Date("2026-03-01T14:30:00"), endTime: new Date("2026-03-01T14:38:22"), message: "Scraped 63 health inspection records across 5 districts", records: 63 },
  { id: "RUN-0041", type: "APN Automation", status: "Failed", startTime: new Date("2026-03-01T10:00:00"), endTime: new Date("2026-03-01T10:01:05"), message: "Authentication failed — county portal credentials expired", records: 0 },
  { id: "RUN-0040", type: "Public Health", status: "Completed", startTime: new Date("2026-03-01T06:00:00"), endTime: new Date("2026-03-01T06:14:50"), message: "Scraped 115 compliance notices and abatement orders", records: 115 },
  { id: "RUN-0039", type: "APN Automation", status: "Completed", startTime: new Date("2026-02-28T20:00:00"), endTime: new Date("2026-02-28T20:08:33"), message: "Scraped 76 property records; 3 new cases opened", records: 76 },
  { id: "RUN-0038", type: "Public Health", status: "Pending", startTime: new Date("2026-02-28T18:00:00"), endTime: null, message: "Queued — waiting for scheduled scraping window", records: 0 },
  { id: "RUN-0037", type: "APN Automation", status: "Completed", startTime: new Date("2026-02-28T12:00:00"), endTime: new Date("2026-02-28T12:06:20"), message: "Scraped 54 APN records; all cases up to date", records: 54 },
  { id: "RUN-0036", type: "Public Health", status: "Completed", startTime: new Date("2026-02-28T08:00:00"), endTime: new Date("2026-02-28T08:19:10"), message: "Scraped 134 water quality and pest control reports", records: 134 },
];

const fmt = (d: Date) => d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

export default function Logs() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filtered = mockLogs.filter((log) => {
    const matchesSearch = search === "" || log.id.toLowerCase().includes(search.toLowerCase()) || log.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All Types" || log.type === typeFilter;
    const matchesStatus = statusFilter === "All Statuses" || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Layout title="Scraping Logs" subtitle="Monitor all scraping automation runs and system events">
      <div className="space-y-5 animate-fade-in">
        {/* Filters */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Run ID or message…"
                className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {automationTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {statusTypes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Execution Logs</h2>
            </div>
            <span className="text-xs text-muted-foreground">{filtered.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Run ID</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Start Time</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">End Time</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Records</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-foreground">{log.id}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        log.type === "APN Automation" ? "bg-primary/10 text-primary" : "bg-accent/50 text-accent-foreground"
                      }`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <RunStatusBadge status={log.status.toLowerCase() as "completed" | "running" | "failed" | "pending"} />
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{fmt(log.startTime)}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{log.endTime ? fmt(log.endTime) : "—"}</td>
                    <td className="px-5 py-3 text-xs text-foreground font-medium">{log.records > 0 ? log.records : "—"}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground max-w-[280px] truncate">{log.message}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState
                        title="No logs found"
                        description="No logs match your current filters."
                        icon={<ScrollText className="h-6 w-6" />}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
