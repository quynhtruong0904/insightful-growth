import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Recycle, 
  TrendingDown, 
  Package, 
  Users, 
  Target,
  ArrowDown,
  CheckCircle,
  Sparkles
} from "lucide-react";

const sustainabilityMetrics = [
  {
    title: "Overstock Reduced",
    value: "32%",
    description: "Less unsold inventory this quarter",
    icon: Package,
    trend: "improvement",
    detail: "Demand forecasting helped reduce excess stock by ₫45M worth of products",
  },
  {
    title: "Customer Retention",
    value: "78%",
    description: "Customers retained vs last quarter",
    icon: Users,
    trend: "improvement",
    detail: "RFM-based care messages reduced churn by 15%",
  },
  {
    title: "Promotion Efficiency",
    value: "89%",
    description: "Of promotions hit target goals",
    icon: Target,
    trend: "improvement",
    detail: "Smart voucher targeting reduced wasteful mass discounting",
  },
  {
    title: "Waste Prevention",
    value: "₫28M",
    description: "Value saved from potential waste",
    icon: Recycle,
    trend: "improvement",
    detail: "Better demand planning prevented 340 units from becoming unsellable",
  },
];

const circularEconomyActions = [
  {
    title: "Smarter Demand Planning",
    description: "Order only what you can sell. Our forecasts help you match supply to real demand.",
    impact: "Reduces overproduction and storage costs",
    progress: 75,
    icon: TrendingDown,
  },
  {
    title: "Targeted Promotions",
    description: "Discounts go to the right customers, not everyone. Less margin erosion, more impact.",
    impact: "Reduces unnecessary discounting by 40%",
    progress: 82,
    icon: Target,
  },
  {
    title: "Customer Lifecycle Care",
    description: "Keep existing customers longer. Retention is more sustainable than constant acquisition.",
    impact: "Lower acquisition costs, higher lifetime value",
    progress: 68,
    icon: Users,
  },
  {
    title: "Inventory Optimization",
    description: "Clear slow-moving stock before it becomes waste. Move products while they still have value.",
    impact: "Prevents ₫15-20M monthly in potential waste",
    progress: 71,
    icon: Package,
  },
];

const esgBenefits = [
  {
    category: "Environmental",
    items: [
      "Reduced overproduction means less resource consumption",
      "Lower returns and waste from better product-customer matching",
      "Efficient logistics through predictable demand patterns",
    ],
  },
  {
    category: "Social",
    items: [
      "Better customer relationships through personalized care",
      "Support for SME growth and local economic development",
      "Transparent and ethical promotion practices",
    ],
  },
  {
    category: "Governance",
    items: [
      "Data-driven decision making reduces guesswork",
      "Clear visibility into business performance metrics",
      "Sustainable growth over short-term exploitation",
    ],
  },
];

export default function Sustainability() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sustainability & ESG</h1>
            <p className="text-muted-foreground">
              Track your business impact on sustainable, responsible growth
            </p>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Your Sustainability Impact
          </CardTitle>
          <CardDescription>
            How data-driven decisions are creating positive change
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sustainabilityMetrics.map((metric) => (
              <div
                key={metric.title}
                className="p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <metric.icon className="h-5 w-5 text-success" />
                  </div>
                  <Badge variant="secondary" className="text-success bg-success/10 border-success/20">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    Improved
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{metric.title}</div>
                <p className="text-xs text-muted-foreground">{metric.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Circular Economy Progress */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Recycle className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold text-foreground">Circular Economy Actions</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Your platform helps you operate more efficiently and reduce waste at every stage
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {circularEconomyActions.map((action) => (
            <Card key={action.title} className="hover:shadow-soft transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
                    <action.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{action.title}</CardTitle>
                    <CardDescription className="mt-1">{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{action.progress}%</span>
                  </div>
                  <Progress value={action.progress} className="h-2" />
                </div>
                <div className="p-3 rounded-lg bg-success/5 border border-success/10">
                  <p className="text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-success inline mr-2" />
                    {action.impact}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ESG Framework */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">ESG Framework Benefits</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {esgBenefits.map((benefit) => (
            <Card key={benefit.category}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {benefit.category === "Environmental" && (
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  )}
                  {benefit.category === "Social" && (
                    <div className="h-3 w-3 rounded-full bg-accent" />
                  )}
                  {benefit.category === "Governance" && (
                    <div className="h-3 w-3 rounded-full bg-chart-3" />
                  )}
                  {benefit.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Philosophy Card */}
      <Card className="bg-secondary/50 border-secondary">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Sustainable Growth Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                True business success isn't just about short-term profits. It's about building 
                a resilient, efficient operation that creates value for customers, reduces waste, 
                and grows responsibly. This platform helps you make decisions that are good for 
                your business <em>and</em> good for the broader ecosystem. Every smart promotion, 
                every accurate forecast, every retained customer contributes to a more sustainable 
                way of doing business.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}