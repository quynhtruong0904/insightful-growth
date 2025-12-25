import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Heart, AlertTriangle, Sparkles, XCircle, Users, TrendingUp } from "lucide-react";

const segments = [
  {
    id: "vip",
    name: "VIP Customers",
    icon: Crown,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    count: 134,
    revenue: "₫ 45.2M",
    description: "Your most valuable customers who buy frequently and spend generously.",
    characteristics: [
      "Purchase in the last 15 days",
      "Order 8+ times per month",
      "High average order value",
    ],
    recommendation: "Show appreciation with exclusive perks, early access to new products, and personalized thank-you messages.",
    action: "Send Thank You Message",
  },
  {
    id: "loyal",
    name: "Loyal Customers",
    icon: Heart,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    count: 312,
    revenue: "₫ 38.7M",
    description: "Consistent buyers who regularly return and contribute steady revenue.",
    characteristics: [
      "Purchase every 20-30 days",
      "Order 4-7 times per month",
      "Stable purchase patterns",
    ],
    recommendation: "Keep them engaged with loyalty rewards, occasional surprise discounts, and new product announcements.",
    action: "Create Loyalty Reward",
  },
  {
    id: "at-risk",
    name: "At-Risk Customers",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    count: 178,
    revenue: "₫ 12.4M",
    description: "Previously active customers showing signs of disengagement.",
    characteristics: [
      "Last purchase 45-90 days ago",
      "Declining order frequency",
      "May switch to competitors",
    ],
    recommendation: "Act quickly with reactivation campaigns, special comeback offers, and personalized outreach.",
    action: "Send Reactivation Offer",
  },
  {
    id: "new",
    name: "New Customers",
    icon: Sparkles,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    count: 161,
    revenue: "₫ 8.9M",
    description: "Recent first-time buyers with potential to become loyal customers.",
    characteristics: [
      "First purchase in last 30 days",
      "1-2 orders only",
      "Still evaluating your business",
    ],
    recommendation: "Make a great impression with welcome offers, excellent service, and follow-up care messages.",
    action: "Send Welcome Package",
  },
  {
    id: "lost",
    name: "Lost Customers",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    count: 107,
    revenue: "₫ 4.2M",
    description: "Customers who haven't returned in a long time and may have churned.",
    characteristics: [
      "No purchase in 90+ days",
      "Previously regular buyers",
      "Likely found alternatives",
    ],
    recommendation: "Win them back with strong incentives, new product highlights, or a genuine 'we miss you' message.",
    action: "Send Win-Back Campaign",
  },
];

export default function Customers() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Segments</h1>
            <p className="text-muted-foreground">
              Understand your customers through RFM analysis (Recency, Frequency, Monetary)
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-soft transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">892</div>
            <p className="text-xs text-muted-foreground mt-1">Active in last 6 months</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-soft transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₫ 109.4M</div>
            <p className="text-xs text-muted-foreground mt-1">From all segments</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-soft transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Customer Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₫ 122.6K</div>
            <p className="text-xs text-muted-foreground mt-1">Per customer lifetime</p>
          </CardContent>
        </Card>
      </div>

      {/* Segment Cards */}
      <div className="space-y-4">
        {segments.map((segment) => (
          <Card key={segment.id} className={`border-2 ${segment.borderColor} hover:shadow-soft transition-shadow`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${segment.bgColor}`}>
                    <segment.icon className={`h-6 w-6 ${segment.color}`} />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {segment.name}
                      <Badge variant="secondary">{segment.count} customers</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">{segment.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{segment.revenue}</div>
                  <p className="text-xs text-muted-foreground">Total revenue</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-foreground">Key Characteristics:</h4>
                <ul className="space-y-1.5">
                  {segment.characteristics.map((char, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${segment.bgColor.replace('/10', '')}`} />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-4 rounded-xl ${segment.bgColor} border ${segment.borderColor}`}>
                <h4 className="text-sm font-semibold mb-1 text-foreground">What to do:</h4>
                <p className="text-sm text-foreground/80">{segment.recommendation}</p>
              </div>
              <Button className="w-full md:w-auto">{segment.action}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Understanding RFM Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                RFM stands for Recency (when they last bought), Frequency (how often they buy), and Monetary (how much they spend). 
                This simple framework helps you identify your most valuable customers, spot those at risk of leaving, and decide who needs attention. 
                Use these insights to target the right message to the right customer at the right time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}