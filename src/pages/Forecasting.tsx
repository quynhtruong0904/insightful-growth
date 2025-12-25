import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, AlertCircle, CheckCircle, BarChart3 } from "lucide-react";

const forecastData = [
  { date: "Mon 1", actual: 12500, forecast: null },
  { date: "Tue 2", actual: 15200, forecast: null },
  { date: "Wed 3", actual: 13800, forecast: null },
  { date: "Thu 4", actual: 16900, forecast: null },
  { date: "Fri 5", actual: 19200, forecast: null },
  { date: "Sat 6", actual: 21500, forecast: null },
  { date: "Sun 7", actual: 18300, forecast: null },
  { date: "Mon 8", actual: null, forecast: 19800 },
  { date: "Tue 9", actual: null, forecast: 20500 },
  { date: "Wed 10", actual: null, forecast: 21200 },
  { date: "Thu 11", actual: null, forecast: 22100 },
  { date: "Fri 12", actual: null, forecast: 23800 },
  { date: "Sat 13", actual: null, forecast: 25200 },
  { date: "Sun 14", actual: null, forecast: 22400 },
];

const weeklyData = [
  { day: "Monday", avgSales: 14200, trend: "stable" },
  { day: "Tuesday", avgSales: 15800, trend: "up" },
  { day: "Wednesday", avgSales: 14500, trend: "stable" },
  { day: "Thursday", avgSales: 17200, trend: "up" },
  { day: "Friday", avgSales: 19500, trend: "up" },
  { day: "Saturday", avgSales: 22100, trend: "up" },
  { day: "Sunday", avgSales: 18900, trend: "stable" },
];

export default function Forecasting() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Demand Forecasting</h1>
            <p className="text-muted-foreground">
              Predict future sales to plan inventory, staffing, and promotions effectively
            </p>
          </div>
        </div>
      </div>

      {/* Forecast Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-success/30 bg-success/5 hover:shadow-soft transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <CardTitle className="text-sm font-medium">Next Week Outlook</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Rising</div>
            <p className="text-xs text-muted-foreground mt-1">15% increase expected</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-soft transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₫ 155.0M</div>
            <p className="text-xs text-muted-foreground mt-1">Next 7 days total</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-soft transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Peak Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Saturday</div>
            <p className="text-xs text-muted-foreground mt-1">Expected ₫ 25.2M</p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Sales Forecast</CardTitle>
          <CardDescription>Historical data vs predicted performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={forecastData}>
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
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2.5}
                name="Actual Sales"
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="hsl(var(--success))" 
                strokeWidth={2.5}
                strokeDasharray="5 5"
                name="Forecast"
                dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 4 }}
              />
              <ReferenceLine x="Sun 7" stroke="hsl(var(--border))" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card className="bg-success/5 border-success/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <CardTitle>What This Means for Your Business</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-2 text-foreground">📈 Demand is Growing</h4>
              <p className="text-sm text-muted-foreground">
                Our analysis shows a clear upward trend. Sales are expected to increase by approximately 15% over the next week.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-2 text-foreground">📦 Stock Preparation</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Action needed:</strong> Increase inventory for top-selling items. Ensure at least 20% more stock than usual.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-2 text-foreground">🎯 Promotion Strategy</h4>
              <p className="text-sm text-muted-foreground">
                This is a good time to run promotions. Launch targeted campaigns on Thursday-Friday to maximize weekend sales.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold mb-2 text-foreground">⚡ Weekend Peak</h4>
              <p className="text-sm text-muted-foreground">
                Saturday is your strongest day. Prepare your team and consider flash sales during peak hours (6-9 PM).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Pattern Analysis</CardTitle>
          <CardDescription>Understanding your typical weekly rhythm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-medium min-w-[100px] text-foreground">{day.day}</span>
                  <Badge variant={day.trend === "up" ? "default" : "secondary"}>
                    {day.trend === "up" ? "Strong" : "Steady"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Avg: ₫ {day.avgSales.toLocaleString()}</span>
                  {day.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
            <p className="text-sm text-foreground">
              <strong className="text-accent">Pattern Insight:</strong> Your business shows strong weekend performance with Thursday-Saturday being peak days. Plan inventory arrivals for Wednesday.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Caution Note */}
      <Card className="bg-muted/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <CardTitle>About Forecasting</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            These forecasts are based on historical patterns, seasonality, and trends. They provide guidance for planning but are not guarantees. 
            External factors like holidays, competitor actions, or market changes can affect actual results. Use forecasts as a helpful tool, 
            but stay flexible and monitor real-time performance closely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}