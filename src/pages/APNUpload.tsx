import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Upload, Search, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

type APNEntry = {
  id: number;
  apn: string;
  dateAdded: Date;
};

const initialAPNs: APNEntry[] = [
  { id: 1, apn: "123-456-789", dateAdded: new Date("2025-01-15") },
  { id: 2, apn: "234-567-890", dateAdded: new Date("2025-01-20") },
  { id: 3, apn: "345-678-901", dateAdded: new Date("2025-02-01") },
  { id: 4, apn: "456-789-012", dateAdded: new Date("2025-02-10") },
  { id: 5, apn: "567-890-123", dateAdded: new Date("2025-02-18") },
];

export default function APNUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [manualAPN, setManualAPN] = useState("");
  const [search, setSearch] = useState("");
  const [apnList, setApnList] = useState<APNEntry[]>(initialAPNs);
  const { toast } = useToast();

  const nextId = () => Math.max(0, ...apnList.map((a) => a.id)) + 1;

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

      // Find the APN column (case-insensitive)
      const apnKey = rows.length > 0
        ? Object.keys(rows[0]).find((k) => k.toLowerCase().trim() === "apn")
        : null;

      if (!apnKey || rows.length === 0) {
        toast({
          title: "Invalid file",
          description: "No \"APN\" column found in the uploaded file. Please ensure the first row has \"APN\" as a column header.",
          variant: "destructive",
        });
        return;
      }

      const newEntries: APNEntry[] = [];
      let startId = nextId();
      for (const row of rows) {
        const val = String(row[apnKey] ?? "").trim();
        if (val) {
          newEntries.push({ id: startId++, apn: val, dateAdded: new Date() });
        }
      }

      if (newEntries.length === 0) {
        toast({
          title: "No records found",
          description: "The APN column was found but contained no values.",
          variant: "destructive",
        });
        return;
      }

      setApnList((prev) => [...prev, ...newEntries]);
      toast({
        title: "APNs added successfully",
        description: `${newEntries.length} new APN${newEntries.length > 1 ? "s" : ""} added to the list.`,
      });
    } catch {
      toast({
        title: "Error reading file",
        description: "Could not parse the uploaded file. Please check the format.",
        variant: "destructive",
      });
    }
  };

  const handleManualAdd = () => {
    const val = manualAPN.trim();
    if (!val) return;
    setApnList((prev) => [...prev, { id: nextId(), apn: val, dateAdded: new Date() }]);
    setManualAPN("");
    toast({
      title: "APN added",
      description: `APN "${val}" has been added to the list.`,
    });
  };

  const filtered = apnList.filter(
    (a) => a.apn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Upload APN Data" subtitle="Upload file or add APNs for case processing">
      <div className="space-y-6 animate-fade-in pb-4">
        {/* Upload / Add Section */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">Add New APN</h2>
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
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload(f);
                    e.target.value = "";
                  }}
                />
              </label>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                File must have an <strong>"APN"</strong> column header in the first row
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Or Add APN Manually
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualAPN}
                  onChange={(e) => setManualAPN(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleManualAdd()}
                  placeholder="e.g. 123-456-789"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  className="h-9 shrink-0 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={handleManualAdd}
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">Enter a single APN number to add it to the list</p>
            </div>
          </div>
        </div>

        {/* APN List */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">APN List</h2>
            <span className="text-xs text-muted-foreground">{filtered.length} records</span>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by APN…"
              className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 text-xs font-medium text-muted-foreground">APN</th>
                  <th className="pb-2 text-xs font-medium text-muted-foreground">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{row.apn}</td>
                    <td className="py-2.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 shrink-0" />
                        {row.dateAdded.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-8 text-center text-xs text-muted-foreground">
                      <FileText className="h-5 w-5 mx-auto mb-1.5 opacity-40" />
                      No APNs found
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
