import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Zap, Target, Calendar, Percent, Clock } from "lucide-react";

const voucherSuggestions = [
  {
    id: 1,
    title: "VIP Appreciation Voucher",
    discount: "15%",
    segment: "VIP Customers",
    segmentColor: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    duration: "7 days",
    minSpend: "₫ 200K",
    reasoning: "Your VIP customers spend the most. Show appreciation with an exclusive discount to maintain their loyalty and encourage repeat purchases.",
    expectedImpact: "High - VIPs respond well to recognition and typically convert at 65%+ rates.",
    timing: "Send Thursday morning for weekend shopping",
  },
  {
    id: 2,
    title: "Reactivation Win-Back Offer",
    discount: "25%",
    segment: "At-Risk Customers",
    segmentColor: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    duration: "10 days",
    minSpend: "₫ 150K",
    reasoning: "These customers haven't bought recently. A strong incentive can bring them back before they're lost completely. Act now to recover this revenue.",
    expectedImpact: "Medium - Typically 20-30% reactivation rate with compelling offers.",
    timing: "Send immediately, follow up after 5 days if unused",
  },
  {
    id: 3,
    title: "Welcome First-Order Discount",
    discount: "20%",
    segment: "New Customers",
    segmentColor: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    duration: "14 days",
    minSpend: "₫ 100K",
    reasoning: "First impressions matter. New customers are evaluating you. A welcome offer encourages a second purchase and builds loyalty early.",
    expectedImpact: "Medium-High - About 40% of new customers will use a welcome voucher.",
    timing: "Send 3 days after first purchase",
  },
  {
    id: 4,
    title: "Loyalty Reward Bundle",
    discount: "10% + Free Shipping",
    segment: "Loyal Customers",
    segmentColor: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    duration: "5 days",
    minSpend: "₫ 180K",
    reasoning: "Loyal customers are your bread and butter. Regular rewards keep them engaged and prevent competitors from stealing them away.",
    expectedImpact: "High - Loyal customers convert at 55%+ with bundled incentives.",
    timing: "Send Monday evening for midweek boost",
  },
];

const flashSaleRecommendations = [
  {
    id: 1,
    title: "Weekend Flash Sale",
    recommended: true,
    timing: "Saturday 6-9 PM",
    discount: "30-40%",
    products: "Best-sellers & high-margin items",
    reasoning: "Demand forecast shows strong weekend performance. A flash sale during peak hours can drive significant volume without hurting margins too much.",
    preparation: [
      "Ensure stock of top 10 products",
      "Prepare social media posts",
      "Alert your fulfillment team",
      "Set up countdown timer",
    ],
  },
  {
    id: 2,
    title: "Thursday Evening Flash",
    recommended: true,
    timing: "Thursday 7-10 PM",
    discount: "25-35%",
    products: "Mid-range items to clear inventory",
    reasoning: "Thursday marks the start of high-demand period. An evening flash sale creates urgency and sets the tone for weekend shopping.",
    preparation: [
      "Choose products with good stock levels",
      "Create mobile-friendly promotions",
      "Plan limited quantities to create scarcity",
    ],
  },
  {
    id: 3,
    title: "Midweek Surprise Flash",
    recommended: false,
    timing: "Wednesday 12-2 PM",
    discount: "20-30%",
    products: "Slow-moving inventory",
    reasoning: "Not recommended currently. Midweek demand is moderate. Better to save aggressive discounts for peak days when customer engagement is naturally higher.",
    preparation: [
      "Consider only if you need to clear specific items urgently",
    ],
  },
];

export default function Promotions() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Promotions & Offers</h1>
        <p className="text-muted-foreground mt-1">
          Smart suggestions for vouchers, discounts, and flash sales based on your data
        </p>
      </div>

      {/* Voucher Suggestions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Voucher Recommendations</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {voucherSuggestions.map((voucher) => (
            <Card key={voucher.id} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{voucher.title}</CardTitle>
                    <Badge className={`mt-2 border ${voucher.segmentColor}`} variant="outline">
                      {voucher.segment}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{voucher.discount}</div>
                    <p className="text-xs text-muted-foreground">Off</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {voucher.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Min {voucher.minSpend}
                  </div>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <h4 className="text-sm font-semibold mb-1">Why this works:</h4>
                  <p className="text-sm text-muted-foreground">{voucher.reasoning}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Expected Impact:</p>
                  <p className="text-muted-foreground">{voucher.expectedImpact}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{voucher.timing}</span>
                </div>
                <Button className="w-full">Create This Voucher</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Flash Sale Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Flash Sale Planner</h2>
        </div>
        <div className="space-y-4">
          {flashSaleRecommendations.map((sale) => (
            <Card 
              key={sale.id} 
              className={`border-2 ${
                sale.recommended 
                  ? "border-accent/30 bg-accent/5" 
                  : "border-muted"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{sale.title}</CardTitle>
                      {sale.recommended && (
                        <Badge className="bg-accent text-accent-foreground">Recommended</Badge>
                      )}
                      {!sale.recommended && (
                        <Badge variant="secondary">Not Recommended</Badge>
                      )}
                    </div>
                    <CardDescription className="mt-1">
                      {sale.timing} • {sale.discount} discount
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Target Products:</h4>
                  <p className="text-sm text-muted-foreground">{sale.products}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  sale.recommended 
                    ? "bg-accent/10 border border-accent/20" 
                    : "bg-muted"
                }`}>
                  <h4 className="text-sm font-semibold mb-1">Analysis:</h4>
                  <p className="text-sm text-foreground">{sale.reasoning}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Preparation Checklist:</h4>
                  <ul className="space-y-1">
                    {sale.preparation.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          sale.recommended ? "bg-accent" : "bg-muted-foreground"
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {sale.recommended && (
                  <Button className="w-full md:w-auto">Schedule This Flash Sale</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            <CardTitle>Promotion Best Practices</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Don't Over-Discount:</strong> Running promotions too frequently trains customers to wait for deals. Use them strategically for specific goals.
          </div>
          <div>
            <strong className="text-foreground">Create Urgency:</strong> Limited-time offers and countdown timers increase conversion rates significantly.
          </div>
          <div>
            <strong className="text-foreground">Segment Your Offers:</strong> Different customer groups respond to different incentives. Personalized promotions perform 2-3x better.
          </div>
          <div>
            <strong className="text-foreground">Test and Learn:</strong> Try different discount levels, durations, and timing. Track what works and refine your strategy over time.
          </div>
          <div>
            <strong className="text-foreground">Combine with Communication:</strong> A good promotion without proper messaging won't succeed. Always pair offers with clear customer outreach.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
