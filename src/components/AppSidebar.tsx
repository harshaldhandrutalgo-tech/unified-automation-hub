import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileSpreadsheet,
  ScrollText,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
  HeartPulse,
  Upload,
  CreditCard,
  Receipt,
  Landmark,
} from "lucide-react";
import { useRole, AppRole } from "@/context/RoleContext";

const ALL_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin"] as AppRole[] },
  { label: "APN Automation", href: "/apn-automation", icon: FileSpreadsheet, roles: ["admin", "user-apn"] as AppRole[] },
  { label: "Upload APN", href: "/apn-upload", icon: Upload, roles: ["admin", "user-apn"] as AppRole[] },
  { label: "Public Health", href: "/public-health-automation", icon: HeartPulse, roles: ["admin", "user-ph"] as AppRole[] },
  { label: "Upload Address", href: "/ph-upload", icon: Upload, roles: ["admin", "user-ph"] as AppRole[] },
  { label: "Tax Automation", href: "/tax-automation", icon: Landmark, roles: ["admin", "user-tax"] as AppRole[] },
  { label: "Upload Tax", href: "/tax-upload", icon: Upload, roles: ["admin", "user-tax"] as AppRole[] },
  { label: "Scraping Logs", href: "/logs", icon: ScrollText, roles: ["admin"] as AppRole[] },
  { label: "Email Logs", href: "/email-logs", icon: ScrollText, roles: ["admin"] as AppRole[] },
  { label: "Billing", href: "/billing", icon: CreditCard, roles: ["admin"] as AppRole[] },
  { label: "Subscription", href: "/subscription", icon: Receipt, roles: ["user-apn", "user-ph", "user-tax"] as AppRole[] },
  { label: "Settings", href: "/settings", icon: Settings, roles: ["admin", "user-apn", "user-ph", "user-tax"] as AppRole[] },
];

const ROLE_SECTION_LABEL: Record<AppRole, string> = {
  admin: "Main Menu",
  "user-apn": "APN Automation",
  "user-ph": "Public Health",
  "user-tax": "Tax Details",
};

export function AppSidebar() {
  const location = useLocation();
  const { role } = useRole();

  const navItems = ALL_NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside className="flex h-screen w-60 flex-shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
          <img src="/logo.png" alt="UniAutomate Logo" className="h-8 w-8 object-contain" />
        </div>
        <div>
          <p className="text-sm font-semibold text-sidebar-accent-foreground leading-tight">UniAutomate</p>
          <p className="text-[10px] text-sidebar-muted leading-tight">Automation Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
          {ROLE_SECTION_LABEL[role]}
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 flex-shrink-0", active ? "text-primary" : "text-sidebar-muted group-hover:text-sidebar-foreground")} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="h-3.5 w-3.5 text-primary opacity-60" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground transition-all duration-150 group"
        >
          <LogOut className="h-4 w-4 text-sidebar-muted group-hover:text-status-danger" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
