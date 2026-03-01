import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Upload } from "lucide-react";

export default function PHUpload() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Layout title="Upload Address Data" subtitle="Upload CSV/Excel files for public health address processing">
      <div className="space-y-6 animate-fade-in pb-4">
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
      </div>
    </Layout>
  );
}
