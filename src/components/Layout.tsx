import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, ChevronDown } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  role?: "admin" | "user";
};

export function Layout({ children, title, subtitle, role = "admin" }: LayoutProps) {
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

            {/* Role + User */}
            <div className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-1.5 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {role === "admin" ? "A" : "U"}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-foreground leading-tight">
                  {role === "admin" ? "Admin User" : "Standard User"}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight capitalize">
                  {role} access
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
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
