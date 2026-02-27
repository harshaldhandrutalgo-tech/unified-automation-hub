import { Layout } from "@/components/Layout";
import { RunStatusBadge } from "@/components/StatusBadge";
import {
  TrendingUp,
  Activity,
  FileSpreadsheet,
  HeartPulse,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, LineChart, Line,
} from "recharts";

// ── Combined data from both modules ──
const apnData = [
  { dateStart: "14-03-2012", caseType: "Property Management Training Program", caseItem: "Site Visit/Initial Inspection", property: "1948 S RIMPAU BLVD", zip: "90016" },
  { dateStart: "21-06-2005", caseType: "Hearing", caseItem: "Site Visit/Initial Inspection", property: "976 W 46TH ST", zip: "90037" },
  { dateStart: "21-06-2005", caseType: "Out Reach Case", caseItem: "Site Visit/Initial Inspection", property: "976 W 46TH ST", zip: "90037" },
  { dateStart: "21-01-2026", caseType: "Complaint", caseItem: "Complaint Received", property: "10910 S AVALON BLVD", zip: "90061" },
  { dateStart: "27-02-2007", caseType: "Hearing", caseItem: "Site Visit/Initial Inspection", property: "195 W 41ST PL", zip: "90037" },
  { dateStart: "08-08-2006", caseType: "Substandard", caseItem: "Site Visit/Initial Inspection", property: "928 W 83RD ST", zip: "90044" },
];

const phData = [
  { startDate: "15-04-2023", violationDate: "22-04-2023", address: "1423 W MLK JR BLVD", zip: "90062", type: "Violation Report" },
  { startDate: "08-07-2022", violationDate: "15-07-2022", address: "3200 S CENTRAL AVE", zip: "90011", type: "Health Inspection" },
  { startDate: "11-01-2024", violationDate: "18-01-2024", address: "5600 S FIGUEROA ST", zip: "90037", type: "Sanitation Order" },
  { startDate: "03-09-2023", violationDate: "10-09-2023", address: "742 E 48TH ST", zip: "90011", type: "Compliance Notice" },
  { startDate: "20-11-2023", violationDate: "28-11-2023", address: "8901 S BROADWAY", zip: "90003", type: "Abatement Order" },
  { startDate: "14-03-2024", violationDate: "21-03-2024", address: "2150 W JEFFERSON BLVD", zip: "90018", type: "Pest Control" },
  { startDate: "02-06-2023", violationDate: "09-06-2023", address: "4455 S VERMONT AVE", zip: "90037", type: "Water Quality" },
];

// ── Derived chart data ──
const apnCaseTypeData = (() => {
  const c: Record<string, number> = {};
  apnData.forEach((d) => { c[d.caseType] = (c[d.caseType] || 0) + 1; });
  return Object.entries(c).map(([name, value]) => ({
    name: name.length > 16 ? name.slice(0, 16) + "…" : name, fullName: name, value,
  }));
})();

const phViolationTypeData = (() => {
  const c: Record<string, number> = {};
  phData.forEach((d) => { c[d.type] = (c[d.type] || 0) + 1; });
  return Object.entries(c).map(([name, value]) => ({ name, value }));
})();

const combinedTimeline = (() => {
  const years: Record<string, { apn: number; ph: number }> = {};
  apnData.forEach((d) => {
    const y = d.dateStart.split("-")[2];
    if (!years[y]) years[y] = { apn: 0, ph: 0 };
    years[y].apn++;
  });
  phData.forEach((d) => {
    const y = d.startDate.split("-")[2];
    if (!years[y]) years[y] = { apn: 0, ph: 0 };
    years[y].ph++;
  });
  return Object.entries(years).sort((a, b) => a[0].localeCompare(b[0])).map(([year, v]) => ({ year, ...v }));
})();

const zipDistribution = (() => {
  const zips: Record<string, { apn: number; ph: number }> = {};
  apnData.forEach((d) => {
    if (!zips[d.zip]) zips[d.zip] = { apn: 0, ph: 0 };
    zips[d.zip].apn++;
  });
  phData.forEach((d) => {
    if (!zips[d.zip]) zips[d.zip] = { apn: 0, ph: 0 };
    zips[d.zip].ph++;
  });
  return Object.entries(zips).map(([zip, v]) => ({ zip, ...v, total: v.apn + v.ph })).sort((a, b) => b.total - a.total);
})();

const PIE_COLORS = [
  "hsl(221, 83%, 53%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)", "hsl(199, 89%, 48%)", "hsl(270, 60%, 55%)",
];

const PH_COLORS = [
  "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)",
  "hsl(199, 89%, 48%)", "hsl(221, 83%, 53%)", "hsl(270, 60%, 55%)", "hsl(330, 70%, 50%)",
];

const stats = [
  { label: "Total Records", value: "13", change: "+3 this week", changeUp: true, icon: TrendingUp, iconBg: "bg-primary-subtle", iconColor: "text-primary" },
  { label: "APN Cases", value: "6", change: "1 new complaint", changeUp: true, icon: FileSpreadsheet, iconBg: "bg-status-info-bg", iconColor: "text-status-info" },
  { label: "PH Violations", value: "7", change: "2 pending review", changeUp: false, icon: HeartPulse, iconBg: "bg-status-warning-bg", iconColor: "text-status-warning" },
  { label: "Open Cases", value: "9", change: "4 unresolved", changeUp: false, icon: Clock, iconBg: "bg-status-danger-bg", iconColor: "text-status-danger" },
];

const recentActivity = [
  { id: 1, action: "New complaint received", detail: "10910 S AVALON BLVD — APN 6071003029", time: "2 hours ago", type: "apn" as const },
  { id: 2, action: "Violation report uploaded", detail: "1423 W MLK JR BLVD — pest_control_2150.pdf", time: "5 hours ago", type: "ph" as const },
  { id: 3, action: "Hearing case updated", detail: "976 W 46TH ST — Case #13306", time: "1 day ago", type: "apn" as const },
  { id: 4, action: "Abatement order issued", detail: "8901 S BROADWAY — AO-73219", time: "2 days ago", type: "ph" as const },
  { id: 5, action: "Site visit completed", detail: "195 W 41ST PL — Case #115293", time: "3 days ago", type: "apn" as const },
  { id: 6, action: "Water quality check flagged", detail: "4455 S VERMONT AVE — WQ-19384", time: "4 days ago", type: "ph" as const },
];

const automationSummary = [
  { label: "APN Automation", status: "completed" as const, records: 6, lastRun: "Today, 10:32 AM", icon: FileSpreadsheet, iconBg: "bg-status-info-bg", iconColor: "text-status-info" },
  { label: "Public Health", status: "completed" as const, records: 7, lastRun: "Today, 09:15 AM", icon: HeartPulse, iconBg: "bg-status-warning-bg", iconColor: "text-status-warning" },
];

const tooltipStyle = { fontSize: 12, borderRadius: 8, border: "1px solid hsl(214, 20%, 88%)", background: "hsl(0, 0%, 100%)" };

export default function Dashboard() {
  return (
    <Layout title="Dashboard" subtitle="Overview of all automation activity">
      <div className="space-y-6 animate-fade-in">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    {stat.changeUp ? <ArrowUpRight className="h-3 w-3 text-status-success" /> : <ArrowDownRight className="h-3 w-3 text-status-warning" />}
                    <p className="text-[11px] text-muted-foreground">{stat.change}</p>
                  </div>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1: Combined Timeline + Distributions */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Combined Timeline */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Cases & Violations Over Time</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full" style={{ background: "hsl(221, 83%, 53%)" }} /><span className="text-[10px] text-muted-foreground">APN</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full" style={{ background: "hsl(142, 71%, 45%)" }} /><span className="text-[10px] text-muted-foreground">PH</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={combinedTimeline}>
                <defs>
                  <linearGradient id="gradApn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="apn" name="APN Cases" stroke="hsl(221, 83%, 53%)" fill="url(#gradApn)" strokeWidth={2} />
                <Area type="monotone" dataKey="ph" name="PH Violations" stroke="hsl(142, 71%, 45%)" fill="url(#gradPh)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Distribution */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Geographic Distribution by ZIP</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={zipDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="zip" tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(215, 16%, 52%)" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="apn" name="APN Cases" fill="hsl(221, 83%, 53%)" stackId="a" radius={[0, 0, 0, 0]} barSize={28} />
                <Bar dataKey="ph" name="PH Violations" fill="hsl(142, 71%, 45%)" stackId="a" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2: Pie Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* APN Case Type Pie */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="h-4 w-4 text-status-info" />
              <h3 className="text-sm font-semibold text-foreground">APN Case Type Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={apnCaseTypeData} cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={3} dataKey="value">
                  {apnCaseTypeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number, _: string, entry: any) => [v, entry.payload.fullName]} contentStyle={tooltipStyle} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* PH Violation Type Pie */}
          <div className="rounded-xl border border-border bg-card shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="h-4 w-4 text-status-warning" />
              <h3 className="text-sm font-semibold text-foreground">Public Health Violation Types</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={phViolationTypeData} cx="50%" cy="50%" innerRadius={48} outerRadius={78} paddingAngle={3} dataKey="value">
                  {phViolationTypeData.map((_, i) => <Cell key={i} fill={PH_COLORS[i % PH_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row: Activity + Automation Summary */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Recent Activity */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
              </div>
              <span className="text-[11px] text-muted-foreground">Last 7 days</span>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors">
                  <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${item.type === "apn" ? "bg-status-info-bg" : "bg-status-warning-bg"}`}>
                    {item.type === "apn" ? <FileSpreadsheet className="h-3.5 w-3.5 text-status-info" /> : <HeartPulse className="h-3.5 w-3.5 text-status-warning" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{item.action}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Automation Summary */}
            <div className="rounded-xl border border-border bg-card shadow-card">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold text-foreground">Automation Status</h2>
              </div>
              <div className="divide-y divide-border">
                {automationSummary.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 px-5 py-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconBg}`}>
                      <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <RunStatusBadge status={item.status} />
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{item.records} records</span>
                        <span>·</span>
                        <span>{item.lastRun}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Affected Areas */}
            <div className="rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <AlertTriangle className="h-4 w-4 text-status-warning" />
                <h2 className="text-sm font-semibold text-foreground">Top Affected Areas</h2>
              </div>
              <div className="px-5 py-4 space-y-3">
                {zipDistribution.slice(0, 5).map((z) => (
                  <div key={z.zip}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground font-mono">{z.zip}</span>
                      <span className="text-xs font-semibold text-foreground">{z.total} cases</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(z.total / zipDistribution[0].total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link to="/apn-automation" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-info-bg">
              <FileSpreadsheet className="h-5 w-5 text-status-info" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">APN Automation</p>
              <p className="text-xs text-muted-foreground mt-0.5">6 case records · View all</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link to="/public-health-automation" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-status-warning-bg">
              <HeartPulse className="h-5 w-5 text-status-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Public Health Safety</p>
              <p className="text-xs text-muted-foreground mt-0.5">7 violation records · View all</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
