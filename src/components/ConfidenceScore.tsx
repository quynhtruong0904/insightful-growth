import { cn } from '@/lib/utils';
import { Gauge } from 'lucide-react';

interface ConfidenceScoreProps {
  score: number; // 0-100 or 0-1
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function ConfidenceScore({
  score,
  label = 'Confidence',
  size = 'md',
  showLabel = true,
  className,
}: ConfidenceScoreProps) {
  // Normalize to 0-100
  const normalizedScore = score > 1 ? score : score * 100;
  
  const getLevel = () => {
    if (normalizedScore >= 75) return 'high';
    if (normalizedScore >= 50) return 'medium';
    return 'low';
  };

  const level = getLevel();
  
  const colors = {
    high: {
      track: 'bg-success/20',
      fill: 'bg-success',
      text: 'text-success',
      glow: 'shadow-[0_0_10px_-2px] shadow-success/30',
    },
    medium: {
      track: 'bg-warning/20',
      fill: 'bg-warning',
      text: 'text-warning',
      glow: 'shadow-[0_0_10px_-2px] shadow-warning/30',
    },
    low: {
      track: 'bg-muted',
      fill: 'bg-muted-foreground',
      text: 'text-muted-foreground',
      glow: '',
    },
  };

  const sizes = {
    sm: { height: 'h-1', width: 'w-16', text: 'text-xs' },
    md: { height: 'h-1.5', width: 'w-24', text: 'text-sm' },
    lg: { height: 'h-2', width: 'w-32', text: 'text-base' },
  };

  const currentSize = sizes[size];
  const currentColor = colors[level];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabel && (
        <div className="flex items-center gap-1">
          <Gauge className={cn("h-3 w-3", currentColor.text)} />
          <span className={cn("font-medium", currentSize.text, currentColor.text)}>
            {label}:
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <div className={cn(
          "rounded-full overflow-hidden",
          currentSize.height,
          currentSize.width,
          currentColor.track
        )}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              currentColor.fill,
              currentColor.glow
            )}
            style={{ width: `${normalizedScore}%` }}
          />
        </div>
        
        <span className={cn("font-semibold tabular-nums", currentSize.text, currentColor.text)}>
          {Math.round(normalizedScore)}%
        </span>
      </div>
    </div>
  );
}