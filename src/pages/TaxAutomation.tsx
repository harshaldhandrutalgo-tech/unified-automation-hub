import { useState } from "react";
import { Layout } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { Landmark, ExternalLink, Search, Filter } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from "recharts";

const taxData = [
  { dateStart: "03/15/2024", parcelId: "P-20240315-001", ownerName: "John Williams", address: "1520 W PICO BLVD, LOS ANGELES CA 90015", taxType: "Property Tax", amountDue: "$4,250.00", status: "Delinquent", link: "TX-90124" },
  { dateStart: "06/01/2023", parcelId: "P-20230601-002", ownerName: "Maria Garcia", address: "3400 S BROADWAY, LOS ANGELES CA 90007", taxType: "Assessment", amountDue: "$1,820.00", status: "Paid", link: "TX-78452" },
  { dateStart: "09/12/2023", parcelId: "P-20230912-003", ownerName: "Robert Chen", address: "7800 SUNSET BLVD, LOS ANGELES CA 90046", taxType: "Property Tax", amountDue: "$6,100.00", status: "Pending", link: "TX-83291" },
  { dateStart: "01/20/2024", parcelId: "P-20240120-004", ownerName: "Sarah Johnson", address: "450 N FIGUEROA ST, LOS ANGELES CA 90012", taxType: "Supplemental", amountDue: "$2,340.00", status: "Delinquent", link: "TX-87654" },
  { dateStart: "11/05/2023", parcelId: "P-20231105-005", ownerName: "David Kim", address: "2100 E CESAR CHAVEZ AVE, LOS ANGELES CA 90033", taxType: "Property Tax", amountDue: "$3,780.00", status: "Paid", link: "TX-81023" },
  { dateStart: "02/28/2024", parcelId: "P-20240228-006", ownerName: "Lisa Thompson", address: "9200 WILSHIRE BLVD, BEVERLY HILLS CA 90212", taxType: "Assessment", amountDue: "$8,920.00", status: "Pending", link: "TX-89102" },
  { dateStart: "07/14/2023", parcelId: "P-20230714-007", ownerName: "James Brown", address: "1800 N HIGHLAND AVE, LOS ANGELES CA 90028", taxType: "Supplemental", amountDue: "$1,450.00", status: "Paid", link: "TX-79830" },
];

const taxTypeChartData = (() => {
  const counts: Record<string, number> = {};
  taxData.forEach((d) => { counts[d.taxType] = (counts[d.taxType] || 0) + 1; });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
})();

const statusChartData = (() => {
  const counts: Record<string, number> = {};
  taxData.forEach((d) => { counts[d.status] = (counts[d.status] || 0) + 1; });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
})();

const timelineData = (() => {
  const monthCounts: Record<string, number> = {};
  taxData.forEach((d) => {
    const parts = d.dateStart.split("/");
    const key = `${parts[0]}/${parts[2]}`;
    monthCounts[key] = (monthCounts[key] || 0) + 1;
  });
  return Object.entries(monthCounts).sort().map(([month, records]) => ({ month, records }));
})();

const amountByType = (() => {
  const totals: Record<string, number> = {};
  taxData.forEach((d) => {
    const amount = parseFloat(d.amountDue.replace(/[$,]/g, ""));
    totals[d.taxType] = (totals[d.taxType] || 0) + amount;
  });
  return Object.entries(totals).map(([name, total]) => ({ name, total: Math.round(total) }));
})();

const PIE_COLORS = [
  "hsl(270, 60%, 55%)", "hsl(38, 92%, 50%)", "hsl(142, 71%, 45%)",
  "hsl(0, 84%, 60%)", "hsl(199, 89%, 48%)", "hsl(221, 83%, 53%)",
];

const STATUS_COLORS: Record<string, string> = {
  Paid: "hsl(142, 71%, 45%)",
  Pending: "hsl(38, 92%, 50%)",
  Delinquent: "hsl(0, 84%, 60%)",
};

export default function TaxAutomation() {
  const [search, setSearch] = useState("");
  const [taxTypeFilter, setTaxTypeFilter] = useState("");

  const taxTypes = [...new Set(taxData.map((d) => d.taxType))];

  const filtered = taxData.filter((row) => {
    const matchesSearch =
      !search ||
      row.address.toLowerCase().includes(search.toLowerCase()) ||
      row.parcelId.toLowerCase().includes(search.toLowerCase()) ||
      row.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchesType = !taxTypeFilter || row.taxType === taxTypeFilter;
    return matchesSearch && matchesType;
  });

  const totalDue = taxData.reduce((s, d) => s + parseFloat(d.amountDue.replace(/[$,]/g, "")), 0);

  return (
    <Layout title="Tax Automation" subtitle="Manage and track property tax records and assessments">
      <div className="space-y-6 animate-fade-in pb-2">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Total Records</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{taxData.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Total Amount Due</p>
            <p className="mt-1 text-2xl font-bold text-foreground">${totalDue.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Delinquent</p>
            <p className="mt-1 text-2xl font-bold text-[hsl(var(--status-danger))]">{taxData.filter(d => d.status === "Delinquent").length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Paid</p>
            <p className="mt-1 text-2xl font-bold text-[hsl(var(--status-success))]">{taxData.filter(d => d.status === "Paid").length}</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 min-h-0">
          {/* Tax Type Distribution */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-4">Tax Type Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={taxTypeChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {taxTypeChartData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)" }} />
                <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Records Over Time */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-4">Records Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="taxGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(270, 60%, 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(270, 60%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)" }} />
                <Area type="monotone" dataKey="records" stroke="hsl(270, 60%, 55%)" fill="url(#taxGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Amount by Type */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5 overflow-hidden">
            <h3 className="text-sm font-semibold text-foreground mb-4">Amount by Tax Type</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={amountByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215, 16%, 52%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)" }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Total"]} />
                <Bar dataKey="total" fill="hsl(270, 60%, 55%)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tax Data Table */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Tax Records</h2>
              <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-[11px] font-semibold text-primary">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search parcel, owner, address…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-56 rounded-md border border-border bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={taxTypeFilter}
                  onChange={(e) => setTaxTypeFilter(e.target.value)}
                  className="h-8 rounded-md border border-border bg-background pl-7 pr-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                >
                  <option value="">All Tax Types</option>
                  {taxTypes.map((t) => (
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Parcel ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Tax Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Amount Due</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground whitespace-nowrap">Status</th>
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
                        icon={<Landmark className="h-6 w-6" />}
                      />
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.dateStart}</td>
                      <td className="px-4 py-3 text-xs text-foreground font-mono whitespace-nowrap">{row.parcelId}</td>
                      <td className="px-4 py-3 text-xs text-foreground whitespace-nowrap">{row.ownerName}</td>
                      <td className="px-4 py-3 text-xs text-foreground min-w-[240px]">{row.address}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">{row.taxType}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground font-medium whitespace-nowrap">{row.amountDue}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          row.status === "Paid" ? "bg-[hsl(var(--status-success-bg))] text-[hsl(var(--status-success))]" :
                          row.status === "Delinquent" ? "bg-[hsl(var(--status-danger-bg))] text-[hsl(var(--status-danger))]" :
                          "bg-[hsl(var(--status-warning-bg))] text-[hsl(var(--status-warning))]"
                        }`}>{row.status}</span>
                      </td>
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
