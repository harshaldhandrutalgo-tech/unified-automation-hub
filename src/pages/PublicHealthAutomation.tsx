import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Upload, HeartPulse, ExternalLink, Search } from "lucide-react";

const phData = [
  { srNo: 1, address: "1423 W MARTIN LUTHER KING JR BLVD, LOS ANGELES CA 90062", startDate: "15-04-2023", violationDate: "22-04-2023", pdfName: "violation_report_1423.pdf", link: "VR-40231" },
  { srNo: 2, address: "3200 S CENTRAL AVE, LOS ANGELES CA 90011", startDate: "08-07-2022", violationDate: "15-07-2022", pdfName: "health_inspection_3200.pdf", link: "HI-30452" },
  { srNo: 3, address: "5600 S FIGUEROA ST, LOS ANGELES CA 90037", startDate: "11-01-2024", violationDate: "18-01-2024", pdfName: "sanitation_order_5600.pdf", link: "SO-51098" },
  { srNo: 4, address: "742 E 48TH ST, LOS ANGELES CA 90011", startDate: "03-09-2023", violationDate: "10-09-2023", pdfName: "compliance_notice_742.pdf", link: "CN-62847" },
  { srNo: 5, address: "8901 S BROADWAY, LOS ANGELES CA 90003", startDate: "20-11-2023", violationDate: "28-11-2023", pdfName: "abatement_order_8901.pdf", link: "AO-73219" },
  { srNo: 6, address: "2150 W JEFFERSON BLVD, LOS ANGELES CA 90018", startDate: "14-03-2024", violationDate: "21-03-2024", pdfName: "pest_control_2150.pdf", link: "PC-84502" },
  { srNo: 7, address: "4455 S VERMONT AVE, LOS ANGELES CA 90037", startDate: "02-06-2023", violationDate: "09-06-2023", pdfName: "water_quality_4455.pdf", link: "WQ-19384" },
];

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
      subtitle="Manage and track public health safety violation records"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Upload Panel */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">Upload New Data</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Report Type</label>
              <select className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select type…</option>
                <option value="ph-weekly">Weekly Health Summary</option>
                <option value="ph-monthly">Monthly Epidemiology Report</option>
                <option value="ph-surveillance">Disease Surveillance Report</option>
              </select>
              <label className="mt-3 mb-1.5 block text-xs font-medium text-foreground">Region / District</label>
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
        </div>

        {/* Public Health Data Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Public Health Safety Records</h2>
              <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-[11px] font-semibold text-primary">{filtered.length}</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search address, PDF name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-56 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
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
                        title="No matching records"
                        description="Try adjusting your search criteria."
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
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{row.srNo}</td>
                      <td className="px-4 py-3 text-xs text-foreground min-w-[260px]">{row.address}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.startDate}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.violationDate}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap font-mono">{row.pdfName}</td>
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
