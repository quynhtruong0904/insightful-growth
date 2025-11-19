import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, ShoppingCart, ArrowUpRight, ArrowDownRight, Gift } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
  trend 
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: any;
  trend: "up" | "down";
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className={cn("flex items-center text-xs", trend === "up" ? "text-success" : "text-destructive")}>
        {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        <span className="ml-1">{change} from last week</span>
      </div>
    </CardContent>
  </Card>
);

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your business today.
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
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          change="+8.2%"
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Active Customers"
          value="892"
          change="-2.1%"
          icon={Users}
          trend="down"
        />
        <StatCard
          title="Avg Order Value"
          value="₫ 91.4K"
          change="+4.3%"
          icon={TrendingUp}
          trend="up"
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
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
              <p className="text-sm text-success-foreground">
                <strong>Insight:</strong> Sales are trending upward. Weekend performance is strong - consider running promotions on Friday evenings.
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
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
            <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground">
                <strong>Action:</strong> 20% of customers are at risk. Visit the Customers page to see reactivation strategies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Smart suggestions based on your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Gift className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Launch Weekend Flash Sale</p>
              <p className="text-sm text-muted-foreground">Your Saturday sales are 20% higher. A targeted flash sale could boost revenue further.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
            <Users className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Re-engage At-Risk Customers</p>
              <p className="text-sm text-muted-foreground">178 customers haven't purchased in 60 days. Send them a reactivation voucher.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
            <TrendingUp className="h-5 w-5 text-success mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Stock Up for Next Week</p>
              <p className="text-sm text-muted-foreground">Demand forecast shows 15% increase. Prepare inventory to avoid stockouts.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
