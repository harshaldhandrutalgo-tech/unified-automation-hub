import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { EmailStatusBadge } from "@/components/StatusBadge";
import { Mail, Search, Calendar, X, FileSpreadsheet, User, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type EmailRecipient = {
  clientName: string;
  email: string;
  fileName: string;
  rows: number;
  status: "sent" | "pending" | "failed";
  sentAt: string;
};

type EmailLogDate = {
  date: Date;
  totalEmails: number;
  sent: number;
  failed: number;
  recipients: EmailRecipient[];
};

const mockEmailLogs: EmailLogDate[] = [
  {
    date: new Date("2026-03-05"),
    totalEmails: 5,
    sent: 5,
    failed: 0,
    recipients: [
      { clientName: "Riverside County Housing", email: "reports@rch.gov", fileName: "APN_Cases_Mar05.xlsx", rows: 142, status: "sent", sentAt: "08:30 AM" },
      { clientName: "Metro Health Dept", email: "compliance@metrohd.org", fileName: "PH_Violations_Mar05.xlsx", rows: 87, status: "sent", sentAt: "08:32 AM" },
      { clientName: "Valley Inspections Inc", email: "data@valleyinsp.com", fileName: "APN_Closures_Mar05.xlsx", rows: 56, status: "sent", sentAt: "08:35 AM" },
      { clientName: "Coastal Sanitation Board", email: "reports@csb.gov", fileName: "PH_Sanitation_Mar05.xlsx", rows: 63, status: "sent", sentAt: "09:00 AM" },
      { clientName: "Summit Property Group", email: "ops@summitpg.com", fileName: "APN_Updates_Mar05.xlsx", rows: 98, status: "sent", sentAt: "09:15 AM" },
    ],
  },
  {
    date: new Date("2026-03-04"),
    totalEmails: 4,
    sent: 3,
    failed: 1,
    recipients: [
      { clientName: "Riverside County Housing", email: "reports@rch.gov", fileName: "APN_Cases_Mar04.xlsx", rows: 110, status: "sent", sentAt: "08:30 AM" },
      { clientName: "Metro Health Dept", email: "compliance@metrohd.org", fileName: "PH_Violations_Mar04.xlsx", rows: 74, status: "sent", sentAt: "08:33 AM" },
      { clientName: "Downtown Code Enforcement", email: "team@dce.gov", fileName: "APN_Enforcement_Mar04.xlsx", rows: 45, status: "failed", sentAt: "08:40 AM" },
      { clientName: "Valley Inspections Inc", email: "data@valleyinsp.com", fileName: "PH_Inspections_Mar04.xlsx", rows: 92, status: "sent", sentAt: "09:10 AM" },
    ],
  },
  {
    date: new Date("2026-03-03"),
    totalEmails: 6,
    sent: 6,
    failed: 0,
    recipients: [
      { clientName: "Riverside County Housing", email: "reports@rch.gov", fileName: "APN_Cases_Mar03.xlsx", rows: 128, status: "sent", sentAt: "08:30 AM" },
      { clientName: "Metro Health Dept", email: "compliance@metrohd.org", fileName: "PH_Violations_Mar03.xlsx", rows: 95, status: "sent", sentAt: "08:31 AM" },
      { clientName: "Valley Inspections Inc", email: "data@valleyinsp.com", fileName: "APN_Closures_Mar03.xlsx", rows: 67, status: "sent", sentAt: "08:34 AM" },
      { clientName: "Coastal Sanitation Board", email: "reports@csb.gov", fileName: "PH_Sanitation_Mar03.xlsx", rows: 53, status: "sent", sentAt: "08:50 AM" },
      { clientName: "Summit Property Group", email: "ops@summitpg.com", fileName: "APN_Updates_Mar03.xlsx", rows: 81, status: "sent", sentAt: "09:00 AM" },
      { clientName: "Downtown Code Enforcement", email: "team@dce.gov", fileName: "PH_Compliance_Mar03.xlsx", rows: 44, status: "sent", sentAt: "09:20 AM" },
    ],
  },
  {
    date: new Date("2026-03-02"),
    totalEmails: 3,
    sent: 2,
    failed: 1,
    recipients: [
      { clientName: "Riverside County Housing", email: "reports@rch.gov", fileName: "APN_Cases_Mar02.xlsx", rows: 134, status: "sent", sentAt: "08:30 AM" },
      { clientName: "Metro Health Dept", email: "compliance@metrohd.org", fileName: "PH_Violations_Mar02.xlsx", rows: 0, status: "failed", sentAt: "08:32 AM" },
      { clientName: "Summit Property Group", email: "ops@summitpg.com", fileName: "APN_Updates_Mar02.xlsx", rows: 76, status: "sent", sentAt: "09:00 AM" },
    ],
  },
  {
    date: new Date("2026-03-01"),
    totalEmails: 5,
    sent: 5,
    failed: 0,
    recipients: [
      { clientName: "Riverside County Housing", email: "reports@rch.gov", fileName: "APN_Cases_Mar01.xlsx", rows: 115, status: "sent", sentAt: "08:30 AM" },
      { clientName: "Metro Health Dept", email: "compliance@metrohd.org", fileName: "PH_Violations_Mar01.xlsx", rows: 102, status: "sent", sentAt: "08:33 AM" },
      { clientName: "Valley Inspections Inc", email: "data@valleyinsp.com", fileName: "APN_Closures_Mar01.xlsx", rows: 58, status: "sent", sentAt: "08:36 AM" },
      { clientName: "Coastal Sanitation Board", email: "reports@csb.gov", fileName: "PH_Sanitation_Mar01.xlsx", rows: 71, status: "sent", sentAt: "09:00 AM" },
      { clientName: "Downtown Code Enforcement", email: "team@dce.gov", fileName: "PH_Compliance_Mar01.xlsx", rows: 39, status: "sent", sentAt: "09:15 AM" },
    ],
  },
  {
    date: new Date("2026-02-28"),
    totalEmails: 4,
    sent: 4,
    failed: 0,
    recipients: [
      { clientName: "Riverside County Housing", email: "reports@rch.gov", fileName: "APN_Cases_Feb28.xlsx", rows: 99, status: "sent", sentAt: "08:30 AM" },
      { clientName: "Metro Health Dept", email: "compliance@metrohd.org", fileName: "PH_Violations_Feb28.xlsx", rows: 88, status: "sent", sentAt: "08:35 AM" },
      { clientName: "Summit Property Group", email: "ops@summitpg.com", fileName: "APN_Updates_Feb28.xlsx", rows: 64, status: "sent", sentAt: "09:00 AM" },
      { clientName: "Valley Inspections Inc", email: "data@valleyinsp.com", fileName: "PH_Inspections_Feb28.xlsx", rows: 47, status: "sent", sentAt: "09:10 AM" },
    ],
  },
];

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });

export default function EmailLogs() {
  const [search, setSearch] = useState("");
  const [selectedLog, setSelectedLog] = useState<EmailLogDate | null>(null);

  const filtered = mockEmailLogs.filter((log) => {
    if (search === "") return true;
    const q = search.toLowerCase();
    return (
      fmtDate(log.date).toLowerCase().includes(q) ||
      log.recipients.some(
        (r) =>
          r.clientName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.fileName.toLowerCase().includes(q)
      )
    );
  });

  return (
    <Layout title="Email Logs" subtitle="Track report files shared with clients via email">
      <div className="space-y-5 animate-fade-in">
        {/* Search */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by date, client, or file name…"
              className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Date rows */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Email Distribution Log</h2>
            </div>
            <span className="text-xs text-muted-foreground">{filtered.length} dates</span>
          </div>

          <div className="divide-y divide-border">
            {filtered.length > 0 ? (
              filtered.map((log) => (
                <button
                  key={log.date.toISOString()}
                  onClick={() => setSelectedLog(log)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                    <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{fmtDate(log.date)}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.totalEmails} email{log.totalEmails !== 1 ? "s" : ""} sent to clients
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {log.sent > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-status-success-bg px-2 py-0.5 text-[10px] font-medium text-status-success">
                        {log.sent} sent
                      </span>
                    )}
                    {log.failed > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-status-danger-bg px-2 py-0.5 text-[10px] font-medium text-status-danger">
                        {log.failed} failed
                      </span>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <EmptyState
                title="No email logs found"
                description="No logs match your current search."
                icon={<Mail className="h-6 w-6" />}
              />
            )}
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Report — {selectedLog && fmtDate(selectedLog.date)}
            </DialogTitle>
            <DialogDescription>
              Detailed list of clients who received report files on this date.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto -mx-6 px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Client</th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">File Sent</th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Rows</th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Time</th>
                  <th className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedLog?.recipients.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-3 py-3">
                      <p className="text-xs font-medium text-foreground">{r.clientName}</p>
                      <p className="text-[10px] text-muted-foreground">{r.email}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-foreground">
                        <FileSpreadsheet className="h-3 w-3 text-muted-foreground" />
                        {r.fileName}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs font-medium text-foreground">
                      {r.rows > 0 ? r.rows : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {r.sentAt}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <EmailStatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
