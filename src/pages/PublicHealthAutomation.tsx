import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Upload, Play, HeartPulse, ExternalLink, Search, Filter } from "lucide-react";

const phData: {
  srNo: number;
  address: string;
  startDate: string;
  violationDate: string;
  pdfName: string;
  link: string;
}[] = [];

export default function PublicHealthAutomation() {
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");

  const filtered = phData.filter((row) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      row.address.toLowerCase().includes(q) ||
      row.pdfName.toLowerCase().includes(q) ||
      row.link.toLowerCase().includes(q)
    );
  });

  return (
    <Layout
      title="Public Health Automation"
      subtitle="Upload data files to run public health safety report automation"
    >
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
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Report Type</label>
                  <select className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select type…</option>
                    <option value="ph-weekly">Weekly Health Summary</option>
                    <option value="ph-monthly">Monthly Epidemiology Report</option>
                    <option value="ph-surveillance">Disease Surveillance Report</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Region / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Central Region, District 4"
                    className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
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

        {/* Public Health Data Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Public Health Safety Records</h2>
              <span className="text-xs text-muted-foreground">({filtered.length} records)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search address, PDF name…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-52 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Sr. No.</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Start Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Violation Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">PDF Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState
                        title="No records yet"
                        description="Upload a file and run automation to see public health safety records here."
                        icon={<HeartPulse className="h-6 w-6" />}
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr
                      key={row.srNo}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs text-foreground font-mono">{row.srNo}</td>
                      <td className="px-4 py-3 text-xs text-foreground min-w-[240px]">{row.address}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.startDate}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.violationDate}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.pdfName}</td>
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
