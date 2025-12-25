import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AIInsight {
  type: 'trend' | 'alert' | 'opportunity';
  title: string;
  description: string;
  confidence: 'high' | 'medium' | 'low';
  action: string;
}

export interface DashboardInsights {
  summary: string;
  insights: AIInsight[];
  sustainability_note: string;
}

export interface ForecastInsights {
  forecast_summary: string;
  confidence_score: number;
  trend_direction: 'rising' | 'stable' | 'declining';
  key_factors: string[];
  recommendation: string;
  overstock_risk: 'low' | 'medium' | 'high';
  sustainability_impact: string;
}

export interface CustomerInsights {
  segment_summary: string;
  momentum_score: number;
  churn_risk_level: 'low' | 'medium' | 'high';
  top_opportunity: {
    segment: string;
    action: string;
    expected_impact: string;
  };
  engagement_suggestions: Array<{
    segment: string;
    message: string;
  }>;
}

export interface PromotionInsights {
  suggested_promotion: {
    type: string;
    target_segment: string;
    discount_range: string;
    optimal_timing: string;
    confidence: 'high' | 'medium' | 'low';
  };
  expected_impact: {
    conversion_uplift: string;
    inventory_impact: string;
    waste_reduction: string;
  };
  reasoning: string;
}

type InsightType = 'dashboard_insights' | 'forecast_analysis' | 'customer_intelligence' | 'promotion_suggestion';

export function useAIInsights<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchInsights = useCallback(async (type: InsightType, context: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: result, error: fnError } = await supabase.functions.invoke('ai-insights', {
        body: { type, context }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      setData(result as T);
      return result as T;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch AI insights';
      setError(message);
      
      if (message.includes('Rate limits') || message.includes('busy')) {
        toast({
          title: "AI is busy",
          description: "The system is processing other requests. Please try again shortly.",
          variant: "destructive",
        });
      } else if (message.includes('credits')) {
        toast({
          title: "AI credits needed",
          description: "Please add credits to continue using AI features.",
          variant: "destructive",
        });
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return { data, isLoading, error, fetchInsights };
}