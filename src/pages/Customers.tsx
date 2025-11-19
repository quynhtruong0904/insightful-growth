import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Heart, AlertTriangle, Sparkles, XCircle } from "lucide-react";

const segments = [
  {
    id: "vip",
    name: "VIP Customers",
    icon: Crown,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    borderColor: "border-chart-1/20",
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
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/20",
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
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/20",
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
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20",
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
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    borderColor: "border-chart-5/20",
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Segments</h1>
        <p className="text-muted-foreground mt-1">
          Understand your customers through RFM analysis (Recency, Frequency, Monetary value)
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground mt-1">Active in last 6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₫ 109.4M</div>
            <p className="text-xs text-muted-foreground mt-1">From all segments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Customer Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₫ 122.6K</div>
            <p className="text-xs text-muted-foreground mt-1">Per customer lifetime</p>
          </CardContent>
        </Card>
      </div>

      {/* Segment Cards */}
      <div className="space-y-4">
        {segments.map((segment) => (
          <Card key={segment.id} className={`border-2 ${segment.borderColor}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${segment.bgColor}`}>
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
                <h4 className="text-sm font-semibold mb-2">Key Characteristics:</h4>
                <ul className="space-y-1">
                  {segment.characteristics.map((char, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${segment.bgColor}`} />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-3 rounded-lg ${segment.bgColor} border ${segment.borderColor}`}>
                <h4 className="text-sm font-semibold mb-1">What to do:</h4>
                <p className="text-sm text-foreground">{segment.recommendation}</p>
              </div>
              <Button className="w-full md:w-auto">{segment.action}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-foreground mb-2">Understanding RFM Analysis</h3>
          <p className="text-sm text-muted-foreground">
            RFM stands for Recency (when they last bought), Frequency (how often they buy), and Monetary (how much they spend). 
            This simple framework helps you identify your most valuable customers, spot those at risk of leaving, and decide who needs attention. 
            Use these insights to target the right message to the right customer at the right time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
