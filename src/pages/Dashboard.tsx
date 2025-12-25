import { useState, useEffect } from 'react';
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
  Brain,
  Sparkles
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import AIInsightCard from '@/components/AIInsightCard';
import ConfidenceScore from '@/components/ConfidenceScore';
import AIStatusIndicator from '@/components/AIStatusIndicator';

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
  aiInsight
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: React.ElementType;
  trend: "up" | "down";
  aiInsight?: string;
}) => (
  <Card className="hover:shadow-soft transition-all group">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
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
      {aiInsight && (
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-xs text-ai flex items-center gap-1">
            <Brain className="h-3 w-3" />
            {aiInsight}
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with AI Status */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights for data-driven decisions
          </p>
        </div>
        <AIStatusIndicator 
          isAnalyzing={isAnalyzing} 
          message={isAnalyzing ? "Analyzing patterns..." : "Monitoring active"} 
        />
      </div>

      {/* AI Summary Card */}
      <Card className="border-ai/20 bg-gradient-to-br from-ai/5 via-transparent to-primary/5 shadow-ai-subtle">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl bg-ai/10 shrink-0",
              isAnalyzing && "animate-pulse-glow"
            )}>
              <Brain className="h-6 w-6 text-ai" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">AI Analysis Summary</h3>
                <ConfidenceScore score={87} size="sm" showLabel={false} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on recent patterns, your business shows <strong className="text-foreground">strong weekend performance</strong> with 
                sales trending upward. The system recommends focusing on <strong className="text-ai">at-risk customer reactivation</strong> this 
                week to maximize retention before the upcoming demand peak.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid with AI Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₫ 117.4M"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
          aiInsight="Strong weekend contribution"
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          change="+8.2%"
          icon={ShoppingCart}
          trend="up"
          aiInsight="Volume matches forecast"
        />
        <StatCard
          title="Active Customers"
          value="892"
          change="-2.1%"
          icon={Users}
          trend="down"
          aiInsight="Retention action needed"
        />
        <StatCard
          title="Avg Order Value"
          value="₫ 91.4K"
          change="+4.3%"
          icon={TrendingUp}
          trend="up"
          aiInsight="Cross-sell effective"
        />
      </div>

      {/* AI-Powered Insights Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-ai" />
          <h2 className="text-lg font-semibold text-foreground">AI-Detected Insights</h2>
          <Badge variant="secondary" className="text-xs">Auto-updated</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <AIInsightCard
            type="opportunity"
            title="Weekend Flash Sale Opportunity"
            description="Saturday sales are 20% above average. AI suggests a targeted flash sale could boost revenue by an additional 15%."
            confidence="high"
            action="Plan Flash Sale"
            isNew
          />
          <AIInsightCard
            type="alert"
            title="At-Risk Customer Segment Growing"
            description="178 customers haven't purchased in 60+ days. Sending reactivation offers now has 73% predicted success rate."
            confidence="high"
            action="Send Reactivation Offer"
          />
          <AIInsightCard
            type="trend"
            title="Demand Increasing Next Week"
            description="Forecast shows 15% demand increase. System confidence is high based on historical patterns."
            confidence="high"
            action="Prepare Inventory"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Last 7 days with AI overlay</CardDescription>
              </div>
              <ConfidenceScore score={92} label="Forecast" size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>AI-analyzed distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={segmentData} cx="50%" cy="50%" outerRadius={95} dataKey="value" stroke="hsl(var(--card))" strokeWidth={2}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
                <Badge variant="secondary" className="text-xs">AI Monitored</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-driven decisions reduced potential overstock waste by <strong className="text-foreground">32%</strong> this month, 
                saving an estimated <strong className="text-primary">₫28M</strong> in inventory costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}