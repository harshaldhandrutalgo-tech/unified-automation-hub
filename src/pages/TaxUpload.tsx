import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Upload, Search, Calendar, FileText, Landmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

type TaxEntry = {
  id: number;
  parcelId: string;
  dateAdded: Date;
};

const initialEntries: TaxEntry[] = [
  { id: 1, parcelId: "P-2024-001234", dateAdded: new Date("2025-01-10") },
  { id: 2, parcelId: "P-2024-005678", dateAdded: new Date("2025-01-22") },
  { id: 3, parcelId: "P-2024-009012", dateAdded: new Date("2025-02-05") },
  { id: 4, parcelId: "P-2024-003456", dateAdded: new Date("2025-02-14") },
  { id: 5, parcelId: "P-2024-007890", dateAdded: new Date("2025-02-25") },
];

export default function TaxUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [manualParcel, setManualParcel] = useState("");
  const [search, setSearch] = useState("");
  const [entryList, setEntryList] = useState<TaxEntry[]>(initialEntries);
  const { toast } = useToast();

  const nextId = () => Math.max(0, ...entryList.map((a) => a.id)) + 1;

  const handleFileUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

      const parcelKey = rows.length > 0
        ? Object.keys(rows[0]).find((k) => k.toLowerCase().trim() === "parcel id" || k.toLowerCase().trim() === "parcelid" || k.toLowerCase().trim() === "parcel")
        : null;

      if (!parcelKey || rows.length === 0) {
        toast({
          title: "Invalid file",
          description: "No \"Parcel ID\" column found. Please ensure the first row has \"Parcel ID\" or \"Parcel\" as a column header.",
          variant: "destructive",
        });
        return;
      }

      const newEntries: TaxEntry[] = [];
      let startId = nextId();
      for (const row of rows) {
        const val = String(row[parcelKey] ?? "").trim();
        if (val) {
          newEntries.push({ id: startId++, parcelId: val, dateAdded: new Date() });
        }
      }

      if (newEntries.length === 0) {
        toast({
          title: "No records found",
          description: "The Parcel ID column was found but contained no values.",
          variant: "destructive",
        });
        return;
      }

      setEntryList((prev) => [...prev, ...newEntries]);
      toast({
        title: "Parcel IDs added successfully",
        description: `${newEntries.length} new parcel${newEntries.length > 1 ? "s" : ""} added to the list.`,
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
    const val = manualParcel.trim();
    if (!val) return;
    setEntryList((prev) => [...prev, { id: nextId(), parcelId: val, dateAdded: new Date() }]);
    setManualParcel("");
    toast({
      title: "Parcel ID added",
      description: `Parcel "${val}" has been added to the list.`,
    });
  };

  const filtered = entryList.filter(
    (a) => a.parcelId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Upload Tax Data" subtitle="Upload file or add parcel IDs for tax record processing">
      <div className="space-y-6 animate-fade-in pb-4">
        {/* Upload / Add Section */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">Add New Parcel ID</h2>
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
                File must have a <strong>"Parcel ID"</strong> or <strong>"Parcel"</strong> column header in the first row
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Or Add Parcel ID Manually
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualParcel}
                  onChange={(e) => setManualParcel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleManualAdd()}
                  placeholder="e.g. P-2024-001234"
                  className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  className="h-9 shrink-0 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={handleManualAdd}
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">Enter a parcel ID to add it to the tax tracking list</p>
            </div>
          </div>
        </div>

        {/* Parcel List */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Landmark className="h-4 w-4 text-muted-foreground" />
              Parcel ID List
            </h2>
            <span className="text-xs text-muted-foreground">{filtered.length} records</span>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by parcel ID…"
              className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-4 text-xs font-medium text-muted-foreground">Parcel ID</th>
                  <th className="pb-2 text-xs font-medium text-muted-foreground">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs text-foreground">{row.parcelId}</td>
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
                      No parcel IDs found
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
