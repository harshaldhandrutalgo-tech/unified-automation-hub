import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Upload, Search, MapPin, Calendar, FileText } from "lucide-react";

const mockAddresses = [
  { id: 1, address: "1234 Oak Street, Sacramento, CA 95814", dateAdded: new Date("2025-01-12") },
  { id: 2, address: "5678 Pine Avenue, Sacramento, CA 95816", dateAdded: new Date("2025-01-18") },
  { id: 3, address: "9012 Elm Boulevard, Sacramento, CA 95818", dateAdded: new Date("2025-02-03") },
  { id: 4, address: "3456 Maple Drive, Sacramento, CA 95820", dateAdded: new Date("2025-02-11") },
  { id: 5, address: "7890 Cedar Lane, Sacramento, CA 95822", dateAdded: new Date("2025-02-20") },
];

export default function PHUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [manualAddress, setManualAddress] = useState("");
  const [search, setSearch] = useState("");

  const filtered = mockAddresses.filter(
    (a) => a.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Upload Address Data" subtitle="Upload file or add addresses for public health processing">
      <div className="space-y-6 animate-fade-in pb-4">
        {/* Upload / Add Section */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">Add New Address</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Upload File <span className="text-muted-foreground font-normal">(CSV or Excel)</span>
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background py-6 px-4 text-center transition-colors hover:border-primary/50 hover:bg-primary-subtle/30">
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
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Or Add Address Manually
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="e.g. 1234 Oak Street, Sacramento, CA"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  className="h-9 shrink-0 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={() => setManualAddress("")}
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">Enter a full address to add it to the monitoring list</p>
            </div>
          </div>
        </div>

        {/* Address List */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Address List</h2>
            <span className="text-xs text-muted-foreground">{filtered.length} records</span>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by address…"
              className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 text-xs font-medium text-muted-foreground">Address</th>
                  <th className="pb-2 pr-4 text-xs font-medium text-muted-foreground">Region</th>
                  <th className="pb-2 text-xs font-medium text-muted-foreground">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 text-xs text-foreground flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                      {row.address}
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-muted-foreground">{row.region}</td>
                    <td className="py-2.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 shrink-0" />
                        {row.dateAdded.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-xs text-muted-foreground">
                      <FileText className="h-5 w-5 mx-auto mb-1.5 opacity-40" />
                      No addresses found
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
