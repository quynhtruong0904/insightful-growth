import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Gift, 
  MessageSquare, 
  Upload,
  Leaf,
  BarChart3,
  Brain,
  Settings
} from "lucide-react";
import AIInsightPanel from "./AIInsightPanel";
import AIStatusIndicator from "./AIStatusIndicator";

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
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

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
                <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">AI-Powered</p>
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

          {/* AI Assistant Toggle */}
          <div className="p-3 border-t border-sidebar-border">
            <Button
              onClick={() => setIsAIPanelOpen(true)}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isAIPanelOpen && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <div className="relative">
                <Brain className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-ai animate-pulse" />
              </div>
              <span>AI Assistant</span>
            </Button>
          </div>

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
      <div className={cn(
        "pl-64 transition-all duration-300",
        isAIPanelOpen && "pr-96"
      )}>
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between h-14 px-8">
            <div />
            <div className="flex items-center gap-4">
              <AIStatusIndicator status="active" />
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
              >
                <Brain className="h-4 w-4" />
                {isAIPanelOpen ? 'Hide AI' : 'Show AI'}
              </Button>
            </div>
          </div>
        </div>
        
        <main className="p-8 max-w-7xl">{children}</main>
      </div>

      {/* AI Insight Panel */}
      <AIInsightPanel isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
    </div>
  );
}