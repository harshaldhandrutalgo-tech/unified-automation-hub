import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { HeartPulse, ExternalLink, Search } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";

const phData = [
  { srNo: 1, address: "1423 W MARTIN LUTHER KING JR BLVD, LOS ANGELES CA 90062", startDate: "15-04-2023", violationDate: "22-04-2023", pdfName: "violation_report_1423.pdf", link: "VR-40231" },
  { srNo: 2, address: "3200 S CENTRAL AVE, LOS ANGELES CA 90011", startDate: "08-07-2022", violationDate: "15-07-2022", pdfName: "health_inspection_3200.pdf", link: "HI-30452" },
  { srNo: 3, address: "5600 S FIGUEROA ST, LOS ANGELES CA 90037", startDate: "11-01-2024", violationDate: "18-01-2024", pdfName: "sanitation_order_5600.pdf", link: "SO-51098" },
  { srNo: 4, address: "742 E 48TH ST, LOS ANGELES CA 90011", startDate: "03-09-2023", violationDate: "10-09-2023", pdfName: "compliance_notice_742.pdf", link: "CN-62847" },
  { srNo: 5, address: "8901 S BROADWAY, LOS ANGELES CA 90003", startDate: "20-11-2023", violationDate: "28-11-2023", pdfName: "abatement_order_8901.pdf", link: "AO-73219" },
  { srNo: 6, address: "2150 W JEFFERSON BLVD, LOS ANGELES CA 90018", startDate: "14-03-2024", violationDate: "21-03-2024", pdfName: "pest_control_2150.pdf", link: "PC-84502" },
  { srNo: 7, address: "4455 S VERMONT AVE, LOS ANGELES CA 90037", startDate: "02-06-2023", violationDate: "09-06-2023", pdfName: "water_quality_4455.pdf", link: "WQ-19384" },
];

// Chart data
const violationsByYear = (() => {
  const counts: Record<string, number> = {};
  phData.forEach((d) => {
    const year = d.violationDate.split("-")[2];
    counts[year] = (counts[year] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])).map(([year, violations]) => ({ year, violations }));
})();

const violationTypeData = (() => {
  const types: Record<string, number> = {};
  phData.forEach((d) => {
    const prefix = d.pdfName.replace(/_\d+\.pdf$/, "").replace(/_/g, " ");
    const label = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    types[label] = (types[label] || 0) + 1;
  });
  return Object.entries(types).map(([name, value]) => ({ name: name.length > 16 ? name.slice(0, 16) + "…" : name, fullName: name, value }));
})();

const responseTimeData = phData.map((d) => {
  const start = new Date(d.startDate.split("-").reverse().join("-"));
  const violation = new Date(d.violationDate.split("-").reverse().join("-"));
  const days = Math.round((violation.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return { address: d.address.split(",")[0].slice(-12), days, srNo: d.srNo };
});

const areaDistribution = (() => {
  const areas: Record<string, number> = {};
  phData.forEach((d) => {
    const zip = d.address.match(/\d{5}$/)?.[0] || "Unknown";
    areas[zip] = (areas[zip] || 0) + 1;
  });
  return Object.entries(areas).map(([zip, count]) => ({ zip, count }));
})();

const PH_COLORS = [
  "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)",
  "hsl(199, 89%, 48%)", "hsl(221, 83%, 53%)", "hsl(270, 60%, 55%)", "hsl(330, 70%, 50%)",
];

export default function PublicHealthAutomation() {
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

  const avgResponseDays = Math.round(responseTimeData.reduce((s, d) => s + d.days, 0) / responseTimeData.length);

  return (
    <Layout
      title="Public Health Automation"
      subtitle="Manage and track public health safety violation records"
    >
      <div className="space-y-6 animate-fade-in pb-4">
        {/* Address List Section - for PH users */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Tracked Addresses</h2>
              <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-[11px] font-semibold text-primary">{phData.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {phData.map((row) => (
              <div key={row.srNo} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 hover:shadow-card transition-shadow">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary text-xs font-bold">
                  {row.srNo}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate">{row.address.split(",")[0]}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{row.address.split(",").slice(1).join(",").trim()}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">Start: {row.startDate}</span>
                    <span className="text-[10px] text-status-danger">Violation: {row.violationDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Total Violations</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{phData.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Violation Types</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{violationTypeData.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Avg Response Time</p>
            <p className="mt-1 text-2xl font-bold text-primary">{avgResponseDays} days</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Areas Affected</p>
            <p className="mt-1 text-2xl font-bold text-status-warning">{areaDistribution.length}</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 min-h-0">
          {/* Violation Type Distribution */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-4">Violation Type Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={violationTypeData} cx="50%" cy="38%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                  {violationTypeData.map((_, i) => (
                    <Cell key={i} fill={PH_COLORS[i % PH_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, _: string, entry: any) => [value, entry.payload.fullName]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)" }} />
                <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Violations Timeline */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-4">Violations by Year</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={violationsByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)" }} />
                <Bar dataKey="violations" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-4">Response Time (Days)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="srNo" tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} label={{ value: "Record #", position: "insideBottom", offset: -5, fontSize: 10, fill: "hsl(215, 16%, 52%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)" }} />
                <Line type="monotone" dataKey="days" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ fill: "hsl(38, 92%, 50%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
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
