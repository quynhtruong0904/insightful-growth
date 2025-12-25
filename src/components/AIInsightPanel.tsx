import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight, 
  X, 
  RefreshCw,
  Zap,
  Target,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIInsights, DashboardInsights, AIInsight } from '@/hooks/useAIInsights';

interface AIInsightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockBusinessData = {
  totalRevenue: 117400000,
  weeklyChange: 12.5,
  totalOrders: 1284,
  activeCustomers: 892,
  atRiskCustomers: 178,
  topSellingDay: 'Saturday',
  demandTrend: 'rising',
  inventoryHealth: 'good',
};

const InsightIcon = ({ type }: { type: AIInsight['type'] }) => {
  switch (type) {
    case 'trend':
      return <TrendingUp className="h-4 w-4" />;
    case 'alert':
      return <AlertTriangle className="h-4 w-4" />;
    case 'opportunity':
      return <Sparkles className="h-4 w-4" />;
    default:
      return <Zap className="h-4 w-4" />;
  }
};

const ConfidenceBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
  const styles = {
    high: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-muted text-muted-foreground border-border',
  };

  return (
    <Badge variant="outline" className={cn('text-[10px] uppercase', styles[level])}>
      {level} confidence
    </Badge>
  );
};

export default function AIInsightPanel({ isOpen, onClose }: AIInsightPanelProps) {
  const { data, isLoading, error, fetchInsights } = useAIInsights<DashboardInsights>();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadInsights = async () => {
    await fetchInsights('dashboard_insights', mockBusinessData);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    if (isOpen && !data && !isLoading) {
      loadInsights();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 z-50 h-full w-96 bg-card border-l border-border shadow-xl animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-ai/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-ai/10",
            isLoading && "animate-pulse-glow"
          )}>
            <Brain className="h-5 w-5 text-ai" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">AI Insights</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Analyzing your data...' : 'Real-time intelligence'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col h-[calc(100%-80px)] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {/* AI Status */}
          <div className={cn(
            "p-3 rounded-xl border transition-all duration-300",
            isLoading 
              ? "bg-ai/5 border-ai/20 shadow-ai-subtle" 
              : "bg-success/5 border-success/20"
          )}>
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                isLoading ? "bg-ai animate-pulse" : "bg-success"
              )} />
              <span className="text-xs font-medium text-foreground">
                {isLoading ? 'AI is analyzing recent data...' : 'System actively monitoring'}
              </span>
            </div>
            {lastUpdated && !isLoading && (
              <p className="text-[10px] text-muted-foreground mt-1 ml-4">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Summary */}
          {data?.summary && (
            <Card className="border-ai/20 bg-gradient-to-br from-ai/5 to-transparent">
              <CardContent className="pt-4">
                <p className="text-sm text-foreground leading-relaxed">
                  {data.summary}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Insights List */}
          {data?.insights && data.insights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Key Insights
              </h3>
              {data.insights.map((insight, idx) => (
                <Card 
                  key={idx} 
                  className={cn(
                    "border transition-all hover:shadow-soft cursor-pointer",
                    insight.type === 'alert' && "border-warning/30",
                    insight.type === 'opportunity' && "border-success/30",
                    insight.type === 'trend' && "border-ai/30"
                  )}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg",
                          insight.type === 'alert' && "bg-warning/10 text-warning",
                          insight.type === 'opportunity' && "bg-success/10 text-success",
                          insight.type === 'trend' && "bg-ai/10 text-ai"
                        )}>
                          <InsightIcon type={insight.type} />
                        </div>
                        <span className="font-medium text-sm text-foreground">{insight.title}</span>
                      </div>
                      <ConfidenceBadge level={insight.confidence} />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium pt-1">
                      <Target className="h-3 w-3" />
                      <span>{insight.action}</span>
                      <ChevronRight className="h-3 w-3 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Sustainability Note */}
          {data?.sustainability_note && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Leaf className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-foreground mb-1">ESG Impact</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {data.sustainability_note}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && !data && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-muted/30 animate-pulse">
                  <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                  <div className="h-3 bg-muted rounded w-full mb-1" />
                  <div className="h-3 bg-muted rounded w-4/5" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4">
                <p className="text-sm text-destructive">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={loadInsights}
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={loadInsights}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            {isLoading ? 'Analyzing...' : 'Refresh Insights'}
          </Button>
        </div>
      </div>
    </div>
  );
}