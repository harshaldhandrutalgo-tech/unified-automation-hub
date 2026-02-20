import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { RunStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ScrollText, Search, Filter, SlidersHorizontal } from "lucide-react";

const automationTypes = ["All Types", "APN Automation", "PDF Extraction"];
const statusTypes = ["All Statuses", "Completed", "Running", "Failed", "Pending"];

export default function Logs() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  return (
    <Layout title="Tracking & Logs" subtitle="Monitor all automation runs and system events">
      <div className="space-y-5 animate-fade-in">
        {/* Filters */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
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

            {/* Type filter */}
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

            {/* Status filter */}
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

            <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
              <Filter className="h-3.5 w-3.5" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ScrollText className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Execution Logs</h2>
            </div>
            <span className="text-xs text-muted-foreground">0 entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Run ID</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Automation Type</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Start Time</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">End Time</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      title="No logs found"
                      description="Execution logs will appear here once automations are run."
                      icon={<ScrollText className="h-6 w-6" />}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
