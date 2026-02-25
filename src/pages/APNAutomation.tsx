import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Upload, Play, FileSpreadsheet, ExternalLink, Search, Filter } from "lucide-react";

const apnData = [
  { dateStart: "14-03-2012", property: "1948 S RIMPAU BLVD, LOS ANGELES CA 90016", apn: "5061017010", caseType: "Property Management Training Program", caseNum: "377847", dateClose: "", caseItem: "Site Visit/Initial Inspection", link: "377847" },
  { dateStart: "21-06-2005", property: "976 W 46TH ST, LOS ANGELES CA 90037", apn: "5018009012", caseType: "Hearing", caseNum: "13306", dateClose: "", caseItem: "Site Visit/Initial Inspection", link: "13306" },
  { dateStart: "21-06-2005", property: "976 W 46TH ST, LOS ANGELES CA 90037", apn: "5018009012", caseType: "Out Reach Case", caseNum: "13306", dateClose: "", caseItem: "Site Visit/Initial Inspection", link: "13306" },
  { dateStart: "21-01-2026", property: "10910 S AVALON BLVD, LOS ANGELES CA 90061", apn: "6071003029", caseType: "Complaint", caseNum: "972598", dateClose: "", caseItem: "Complaint Received", link: "972598" },
  { dateStart: "27-02-2007", property: "195 W 41ST PL, LOS ANGELES CA 90037", apn: "5111021025", caseType: "Hearing", caseNum: "115293", dateClose: "", caseItem: "Site Visit/Initial Inspection", link: "115293" },
  { dateStart: "08-08-2006", property: "928 W 83RD ST, LOS ANGELES CA 90044", apn: "6032009007", caseType: "Substandard", caseNum: "89023", dateClose: "", caseItem: "Site Visit/Initial Inspection", link: "89023" },
];

export default function APNAutomation() {
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [caseTypeFilter, setCaseTypeFilter] = useState("");

  const caseTypes = [...new Set(apnData.map((d) => d.caseType))];

  const filtered = apnData.filter((row) => {
    const matchesSearch =
      !search ||
      row.property.toLowerCase().includes(search.toLowerCase()) ||
      row.apn.includes(search) ||
      row.caseNum.includes(search);
    const matchesType = !caseTypeFilter || row.caseType === caseTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <Layout title="APN Automation" subtitle="Upload CSV/Excel files to run APN report automation">
      <div className="space-y-6 animate-fade-in">
        {/* Upload Panel */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">New Automation Run</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Upload File <span className="text-muted-foreground font-normal">(CSV or Excel)</span>
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background py-8 px-4 text-center transition-colors hover:border-primary/50 hover:bg-primary-subtle/30">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file ? file.name : "Click to upload"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : ".csv, .xls, .xlsx supported"}
                  </p>
                </div>
                <input
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Automation Type</label>
                  <select className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select type…</option>
                    <option value="apn-standard">APN Standard Report</option>
                    <option value="apn-detailed">APN Detailed Report</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Email Notification</label>
                  <input
                    type="email"
                    placeholder="Notify email (optional)"
                    className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <Button
                className="mt-4 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9"
                disabled={!file}
              >
                <Play className="h-3.5 w-3.5" />
                Run Automation
              </Button>
            </div>
          </div>
        </div>

        {/* APN Data Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">APN Case Records</h2>
              <span className="text-xs text-muted-foreground">({filtered.length} records)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search property, APN, case…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-52 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={caseTypeFilter}
                  onChange={(e) => setCaseTypeFilter(e.target.value)}
                  className="h-8 rounded-md border border-border bg-background pl-7 pr-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                >
                  <option value="">All Case Types</option>
                  {caseTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Date Start</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Property</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">APN</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Case Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Case</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Date Close</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Case Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <EmptyState
                        title="No matching records"
                        description="Try adjusting your search or filter criteria."
                        icon={<FileSpreadsheet className="h-6 w-6" />}
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.dateStart}</td>
                      <td className="px-4 py-3 text-xs text-foreground min-w-[240px]">{row.property}</td>
                      <td className="px-4 py-3 text-xs text-foreground font-mono whitespace-nowrap">{row.apn}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                          {row.caseType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground font-mono whitespace-nowrap">{row.caseNum}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{row.dateClose || "—"}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.caseItem}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                          {row.link}
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
