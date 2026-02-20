import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { RunStatusBadge, EmailStatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { FileText, Play, Download } from "lucide-react";

export default function PDFExtraction() {
  return (
    <Layout title="PDF Extraction" subtitle="Extract structured data from PDF documents automatically">
      <div className="space-y-6 animate-fade-in">
        {/* Action Panel */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-1">Start New Extraction</h2>
          <p className="text-xs text-muted-foreground mb-5">
            Trigger the automated PDF extraction pipeline. Processed files will be available for download.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-foreground">Source Folder / Path</label>
              <input
                type="text"
                placeholder="Enter source path or folder URL…"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Notify Email</label>
              <input
                type="email"
                placeholder="Email (optional)"
                className="h-9 w-full sm:w-52 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-end">
              <Button className="h-9 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
                <Play className="h-3.5 w-3.5" />
                Start Extraction
              </Button>
            </div>
          </div>
        </div>

        {/* Extraction Runs Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Extraction Runs</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Run ID</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Files Extracted</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Download</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Email Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      title="No extractions yet"
                      description="Start an extraction to see results here."
                      icon={<FileText className="h-6 w-6" />}
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
