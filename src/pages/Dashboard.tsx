import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight, 
  Gift,
  Leaf,
  Package,
  Target
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const salesData = [
  { date: "Mon", sales: 12500 },
  { date: "Tue", sales: 15200 },
  { date: "Wed", sales: 13800 },
  { date: "Thu", sales: 16900 },
  { date: "Fri", sales: 19200 },
  { date: "Sat", sales: 21500 },
  { date: "Sun", sales: 18300 },
];

const segmentData = [
  { name: "VIP", value: 15, color: "hsl(var(--chart-1))" },
  { name: "Loyal", value: 35, color: "hsl(var(--chart-2))" },
  { name: "At Risk", value: 20, color: "hsl(var(--chart-3))" },
  { name: "New", value: 18, color: "hsl(var(--chart-4))" },
  { name: "Lost", value: 12, color: "hsl(var(--chart-5))" },
];

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend,
  subtitle
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: React.ElementType;
  trend: "up" | "down";
  subtitle?: string;
}) => (
  <Card className="hover:shadow-soft transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="flex items-center gap-2 mt-1">
        <div className={cn(
          "flex items-center text-xs font-medium",
          trend === "up" ? "text-success" : "text-destructive"
        )}>
          {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          <span>{change}</span>
        </div>
        <span className="text-xs text-muted-foreground">from last week</span>
      </div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
      )}
    </CardContent>
  </Card>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your business at a glance. Make data-driven decisions with confidence.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₫ 117.4M"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
          subtitle="Strong weekend performance"
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          change="+8.2%"
          icon={ShoppingCart}
          trend="up"
          subtitle="347 new orders this week"
        />
        <StatCard
          title="Active Customers"
          value="892"
          change="-2.1%"
          icon={Users}
          trend="down"
          subtitle="Focus on retention needed"
        />
        <StatCard
          title="Avg Order Value"
          value="₫ 91.4K"
          change="+4.3%"
          icon={TrendingUp}
          trend="up"
          subtitle="Cross-selling working well"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.1)"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm text-foreground">
                <strong className="text-success">Insight:</strong> Sales trending upward. Weekend performance is strong — consider running promotions on Friday evenings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution by RFM analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={95}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-warning/5 rounded-lg border border-warning/20">
              <p className="text-sm text-foreground">
                <strong className="text-warning">Action:</strong> 20% of customers are at risk. Visit Customers page to see reactivation strategies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Smart suggestions based on your data — what to do next</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/15 hover:border-primary/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Launch Weekend Flash Sale</p>
              <p className="text-sm text-muted-foreground mt-0.5">Your Saturday sales are 20% higher. A targeted flash sale could boost revenue further.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/15 hover:border-accent/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">Re-engage At-Risk Customers</p>
              <p className="text-sm text-muted-foreground mt-0.5">178 customers haven't purchased in 60 days. Send them a reactivation voucher.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-success/5 border border-success/15 hover:border-success/30 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 shrink-0">
              <Package className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">Stock Up for Next Week</p>
              <p className="text-sm text-muted-foreground mt-0.5">Demand forecast shows 15% increase. Prepare inventory to avoid stockouts.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Teaser */}
      <Card className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">Sustainability Impact</h3>
                <Badge variant="secondary" className="text-xs">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your data-driven decisions reduced potential overstock waste by <strong className="text-foreground">32%</strong> this month. 
                Visit the Sustainability page to see your full ESG impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}