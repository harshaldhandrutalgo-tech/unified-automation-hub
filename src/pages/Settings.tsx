import { Layout } from "@/components/Layout";
import { Settings as SettingsIcon, User, Bell, Shield, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    icon: User,
    label: "Profile",
    description: "Manage your name, email, and account details",
  },
  {
    icon: Bell,
    label: "Notifications",
    description: "Configure email alerts and automation notifications",
  },
  {
    icon: Shield,
    label: "Security",
    description: "Password, 2FA, and access management",
  },
  {
    icon: Globe,
    label: "Integrations",
    description: "Connect external services and API endpoints",
  },
];

export default function Settings() {
  return (
    <Layout title="Settings" subtitle="Manage your account and platform preferences">
      <div className="max-w-2xl space-y-5 animate-fade-in">
        {/* Profile section stub */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">Account Profile</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@company.com</p>
              <span className="mt-1 inline-flex items-center rounded-full bg-primary-subtle px-2 py-0.5 text-[10px] font-semibold text-primary">
                Administrator
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">Full Name</label>
              <input
                type="text"
                placeholder="Enter name…"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">Email Address</label>
              <input
                type="email"
                placeholder="Enter email…"
                className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
            <Button variant="outline" className="h-8 text-xs">
              Cancel
            </Button>
          </div>
        </div>

        {/* Settings nav cards */}
        <div className="rounded-xl border border-border bg-card shadow-card divide-y divide-border">
          {sections.map((sec) => (
            <button
              key={sec.label}
              className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-muted/40 transition-colors group"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary-subtle transition-colors">
                <sec.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{sec.label}</p>
                <p className="text-xs text-muted-foreground">{sec.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
