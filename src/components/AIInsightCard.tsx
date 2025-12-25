import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIInsightCardProps {
  type: 'trend' | 'alert' | 'opportunity' | 'prediction';
  title: string;
  description: string;
  confidence?: 'high' | 'medium' | 'low';
  action?: string;
  isNew?: boolean;
  onClick?: () => void;
  className?: string;
}

const iconMap = {
  trend: TrendingUp,
  alert: AlertTriangle,
  opportunity: Sparkles,
  prediction: Zap,
};

const styleMap = {
  trend: {
    bg: 'bg-ai/5',
    border: 'border-ai/20 hover:border-ai/40',
    icon: 'bg-ai/10 text-ai',
    glow: 'hover:shadow-ai-subtle',
  },
  alert: {
    bg: 'bg-warning/5',
    border: 'border-warning/20 hover:border-warning/40',
    icon: 'bg-warning/10 text-warning',
    glow: '',
  },
  opportunity: {
    bg: 'bg-success/5',
    border: 'border-success/20 hover:border-success/40',
    icon: 'bg-success/10 text-success',
    glow: '',
  },
  prediction: {
    bg: 'bg-accent/5',
    border: 'border-accent/20 hover:border-accent/40',
    icon: 'bg-accent/10 text-accent',
    glow: '',
  },
};

const confidenceStyles = {
  high: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-muted text-muted-foreground border-border',
};

export default function AIInsightCard({
  type,
  title,
  description,
  confidence,
  action,
  isNew = false,
  onClick,
  className,
}: AIInsightCardProps) {
  const Icon = iconMap[type];
  const styles = styleMap[type];

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        styles.bg,
        styles.border,
        styles.glow,
        className
      )}
      onClick={onClick}
    >
      {isNew && (
        <div className="absolute top-0 right-0">
          <div className="bg-ai text-ai-foreground text-[10px] font-medium px-2 py-0.5 rounded-bl-lg">
            New
          </div>
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl shrink-0",
            styles.icon
          )}>
            <Icon className="h-4 w-4" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm text-foreground truncate">{title}</h4>
              {confidence && (
                <Badge 
                  variant="outline" 
                  className={cn("text-[10px] shrink-0", confidenceStyles[confidence])}
                >
                  {confidence}
                </Badge>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
            
            {action && (
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-primary">
                <span>{action}</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}