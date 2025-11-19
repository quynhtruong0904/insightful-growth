import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, MessageSquare, Heart, Gift, Star, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const messageTemplates = [
  {
    id: 1,
    category: "VIP Appreciation",
    icon: Heart,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    title: "Thank You for Being a Valued Customer",
    segment: "VIP Customers",
    message: `Dear [Customer Name],

We wanted to take a moment to say thank you! 🙏

You're one of our most valued customers, and we truly appreciate your continued support. Your loyalty means everything to our small business.

As a token of our gratitude, here's an exclusive 15% discount code just for you: VIP15

Valid for the next 7 days on any purchase over ₫200K.

Thank you for choosing us!

Best regards,
[Your Business Name]`,
    useCase: "Send to VIP customers quarterly or after significant purchases",
  },
  {
    id: 2,
    category: "Reactivation",
    icon: AlertCircle,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    title: "We Miss You - Come Back Offer",
    segment: "At-Risk Customers",
    message: `Hi [Customer Name],

We noticed it's been a while since your last order, and we wanted to check in! 😊

We'd love to welcome you back with a special offer: 25% off your next purchase!

Use code WELCOME_BACK at checkout (valid for 10 days, minimum ₫150K)

We've added some great new products you might love. Come take a look!

Hope to see you soon,
[Your Business Name]`,
    useCase: "Send to customers who haven't purchased in 60-90 days",
  },
  {
    id: 3,
    category: "Welcome",
    icon: Gift,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    title: "Welcome to Our Community",
    segment: "New Customers",
    message: `Hello [Customer Name],

Thank you for your recent purchase! We're thrilled to have you as a new customer. 🎉

We hope you love your order! If you have any questions or need assistance, please don't hesitate to reach out.

As a welcome gift, here's 20% off your next order: NEW20
(Valid for 14 days, minimum purchase ₫100K)

We can't wait to serve you again!

Warm regards,
[Your Business Name]`,
    useCase: "Send 2-3 days after first purchase",
  },
  {
    id: 4,
    category: "Review Request",
    icon: Star,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    title: "We'd Love Your Feedback",
    segment: "Recent Buyers",
    message: `Hi [Customer Name],

We hope you're enjoying your recent purchase! 😊

We'd really appreciate it if you could take a moment to share your experience. Your feedback helps us improve and helps other customers make informed decisions.

[Link to Review]

As a thank-you for your time, we'll send you a special discount code for your next order!

Thank you for your support,
[Your Business Name]`,
    useCase: "Send 7-10 days after successful delivery",
  },
  {
    id: 5,
    category: "Loyalty Check-in",
    icon: MessageSquare,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    title: "Just Checking In",
    segment: "Loyal Customers",
    message: `Dear [Customer Name],

Just wanted to check in and say hello! 👋

You've been with us for a while now, and we truly value your continued support. We're always working to improve and would love to hear if there's anything we can do better.

As a token of appreciation, enjoy 10% off + free shipping on your next order with code LOYAL10 (valid 5 days, min ₫180K).

Thank you for being amazing!

Best,
[Your Business Name]`,
    useCase: "Send monthly to maintain engagement with regular customers",
  },
  {
    id: 6,
    category: "Post-Purchase Care",
    icon: MessageSquare,
    color: "text-primary",
    bgColor: "bg-primary/10",
    title: "How's Everything Going?",
    segment: "All Customers",
    message: `Hi [Customer Name],

Your order was delivered [X] days ago, and we wanted to make sure everything arrived in perfect condition! 📦

Is everything okay with your purchase? If you have any concerns or questions, please let us know right away—we're here to help.

We hope you're enjoying your items!

Kind regards,
[Your Business Name]`,
    useCase: "Send 3-5 days after delivery confirmation",
  },
];

export default function CustomerCare() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `"${title}" template copied to clipboard`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Care Messages</h1>
        <p className="text-muted-foreground mt-1">
          Ready-to-use message templates for engaging with your customers at every stage
        </p>
      </div>

      {/* Quick Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Using These Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>✓ Replace [Customer Name] and [Your Business Name] with actual names</p>
          <p>✓ Adjust discount codes and amounts to match your promotions</p>
          <p>✓ Personalize the tone to match your brand voice</p>
          <p>✓ Send via Facebook Messenger, Zalo, TikTok Shop messages, or email</p>
          <p>✓ Track which messages get the best response and use them more often</p>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <div className="space-y-4">
        {messageTemplates.map((template) => (
          <Card key={template.id} className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${template.bgColor}`}>
                    <template.icon className={`h-5 w-5 ${template.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <Badge variant="outline">{template.segment}</Badge>
                      <span>•</span>
                      <span>{template.category}</span>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted border border-border">
                <pre className="text-sm whitespace-pre-wrap font-sans text-foreground">
                  {template.message}
                </pre>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">When to use:</strong> {template.useCase}
                </div>
                <Button
                  onClick={() => copyToClipboard(template.message, template.title)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Communication Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Best Practices</CardTitle>
          <CardDescription>Tips for effective customer messaging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <strong className="text-foreground">Be Personal:</strong>
            <p className="text-muted-foreground">Always use the customer's name and reference their specific purchase or situation.</p>
          </div>
          <div>
            <strong className="text-foreground">Keep It Simple:</strong>
            <p className="text-muted-foreground">Use clear, friendly language. Avoid jargon or overly formal tone.</p>
          </div>
          <div>
            <strong className="text-foreground">Add Value:</strong>
            <p className="text-muted-foreground">Every message should offer something useful—whether it's information, help, or a special offer.</p>
          </div>
          <div>
            <strong className="text-foreground">Time It Right:</strong>
            <p className="text-muted-foreground">Send messages when they're most relevant. Too early or too late reduces effectiveness.</p>
          </div>
          <div>
            <strong className="text-foreground">Don't Overwhelm:</strong>
            <p className="text-muted-foreground">Limit messages to 2-3 per month per customer unless they're actively engaging with you.</p>
          </div>
          <div>
            <strong className="text-foreground">Respond Quickly:</strong>
            <p className="text-muted-foreground">When customers reply, aim to respond within a few hours. Quick responses build trust.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
