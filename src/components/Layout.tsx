import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, ChevronDown, Check } from "lucide-react";
import { useRole, AppRole, ROLE_LABELS, ROLE_INITIALS } from "@/context/RoleContext";
import { useState, useRef, useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

const ROLE_OPTIONS: { value: AppRole; label: string; description: string }[] = [
  { value: "admin", label: "Admin", description: "Full access to all features" },
  { value: "user-apn", label: "APN User", description: "APN Automation only" },
  { value: "user-ph", label: "PH User", description: "Public Health Automation only" },
];

const ROLE_BADGE_STYLE: Record<AppRole, string> = {
  admin: "bg-primary text-primary-foreground",
  "user-apn": "bg-status-info text-white",
  "user-ph": "bg-status-success text-white",
};

export function Layout({ children, title, subtitle }: LayoutProps) {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 flex-shrink-0">
          <div>
            <h1 className="text-base font-semibold text-foreground leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-8 w-52 rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
              />
            </div>

            {/* Notifications */}
            <button className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-1.5 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${ROLE_BADGE_STYLE[role]}`}>
                  {ROLE_INITIALS[role]}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-medium text-foreground leading-tight">
                    {ROLE_LABELS[role]}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {role === "admin" ? "Full access" : role === "user-apn" ? "APN only" : "PH only"}
                  </p>
                </div>
                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute right-0 top-full mt-1.5 w-56 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Switch Role (Demo)</p>
                  </div>
                  {ROLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setRole(opt.value); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left group"
                    >
                      <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${ROLE_BADGE_STYLE[opt.value]}`}>
                        {ROLE_INITIALS[opt.value]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{opt.label}</p>
                        <p className="text-[10px] text-muted-foreground">{opt.description}</p>
                      </div>
                      {role === opt.value && <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
