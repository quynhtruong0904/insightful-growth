import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Gift, 
  MessageSquare, 
  Upload,
  Leaf,
  BarChart3
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Forecasting", href: "/forecasting", icon: TrendingUp },
  { name: "Promotions", href: "/promotions", icon: Gift },
  { name: "Customer Care", href: "/customer-care", icon: MessageSquare },
  { name: "Sustainability", href: "/sustainability", icon: Leaf },
  { name: "Data Import", href: "/data-import", icon: Upload },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-sidebar-border px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary/20">
                <BarChart3 className="h-5 w-5 text-sidebar-primary" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-sidebar-foreground">SME Analytics</h1>
                <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">Sustainable Growth</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 scrollbar-thin overflow-y-auto">
            <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Main Menu
            </p>
            {navigation.slice(0, 5).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}

            <div className="py-4">
              <div className="border-t border-sidebar-border" />
            </div>

            <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Insights & Data
            </p>
            {navigation.slice(5).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/50">
              <Leaf className="h-4 w-4 text-sidebar-primary" />
              <div>
                <p className="text-xs font-medium text-sidebar-foreground">ESG Focused</p>
                <p className="text-[10px] text-sidebar-foreground/60">Sustainable SME Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}