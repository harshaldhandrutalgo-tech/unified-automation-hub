import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { RunStatusBadge, EmailStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Upload, Play, HeartPulse, Download } from "lucide-react";

export default function PublicHealthAutomation() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Layout
      title="Public Health Automation"
      subtitle="Upload data files to run public health report automation"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Upload Panel */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">New Automation Run</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* File Upload */}
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

            {/* Run options */}
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

        {/* Previous Runs Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Previous Runs</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Run ID</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Uploaded File</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Report Type</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Generated Report</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Email Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <EmptyState
                      title="No runs yet"
                      description="Upload a file and run automation to see results here."
                      icon={<HeartPulse className="h-6 w-6" />}
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
