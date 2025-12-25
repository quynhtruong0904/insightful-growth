import { Badge } from '@/components/ui/badge';
import { Brain, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIStatusIndicatorProps {
  isAnalyzing?: boolean;
  status?: 'active' | 'idle' | 'error';
  message?: string;
  className?: string;
}

export default function AIStatusIndicator({ 
  isAnalyzing = false, 
  status = 'active',
  message,
  className 
}: AIStatusIndicatorProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300",
      status === 'active' && "bg-ai/5 border-ai/20",
      status === 'idle' && "bg-muted border-border",
      status === 'error' && "bg-destructive/5 border-destructive/20",
      isAnalyzing && "shadow-ai-subtle animate-pulse-glow",
      className
    )}>
      <div className="relative">
        {isAnalyzing ? (
          <Loader2 className="h-3.5 w-3.5 text-ai animate-spin" />
        ) : (
          <Brain className={cn(
            "h-3.5 w-3.5",
            status === 'active' && "text-ai",
            status === 'idle' && "text-muted-foreground",
            status === 'error' && "text-destructive"
          )} />
        )}
        {status === 'active' && !isAnalyzing && (
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success animate-pulse" />
        )}
      </div>
      <span className={cn(
        "text-xs font-medium",
        status === 'active' && "text-ai",
        status === 'idle' && "text-muted-foreground",
        status === 'error' && "text-destructive"
      )}>
        {message || (isAnalyzing ? 'AI analyzing...' : status === 'active' ? 'AI Active' : 'AI Standby')}
      </span>
    </div>
  );
}