import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "dashboard_insights":
        systemPrompt = `You are an AI business analyst for a Vietnamese SME e-commerce analytics platform. Generate concise, actionable insights based on the business data provided. 
        
Your responses should be:
- Written in clear, simple business language
- Focused on actionable recommendations
- Confident but not alarmist
- ESG and sustainability aware

Always structure your response as valid JSON with this exact format:
{
  "summary": "One sentence summary of the current state",
  "insights": [
    {"type": "trend", "title": "Short title", "description": "2-3 sentence insight", "confidence": "high|medium|low", "action": "Specific action to take"},
    {"type": "alert", "title": "Short title", "description": "2-3 sentence insight", "confidence": "high|medium|low", "action": "Specific action to take"},
    {"type": "opportunity", "title": "Short title", "description": "2-3 sentence insight", "confidence": "high|medium|low", "action": "Specific action to take"}
  ],
  "sustainability_note": "Brief ESG-related observation"
}`;
        userPrompt = `Analyze this business data and provide insights: ${JSON.stringify(context)}`;
        break;

      case "forecast_analysis":
        systemPrompt = `You are an AI demand forecasting specialist. Analyze sales patterns and provide forecast insights.
        
Respond with valid JSON:
{
  "forecast_summary": "Brief forecast summary",
  "confidence_score": 0.0-1.0,
  "trend_direction": "rising|stable|declining",
  "key_factors": ["factor1", "factor2"],
  "recommendation": "What to do based on this forecast",
  "overstock_risk": "low|medium|high",
  "sustainability_impact": "Brief ESG note"
}`;
        userPrompt = `Analyze this forecast data: ${JSON.stringify(context)}`;
        break;

      case "customer_intelligence":
        systemPrompt = `You are an AI customer behavior analyst. Provide insights on customer segments and behavior patterns.
        
Respond with valid JSON:
{
  "segment_summary": "Overall customer health summary",
  "momentum_score": 0-100,
  "churn_risk_level": "low|medium|high",
  "top_opportunity": {"segment": "name", "action": "recommended action", "expected_impact": "description"},
  "engagement_suggestions": [{"segment": "name", "message": "suggested action"}]
}`;
        userPrompt = `Analyze this customer data: ${JSON.stringify(context)}`;
        break;

      case "promotion_suggestion":
        systemPrompt = `You are an AI promotion strategist for SME e-commerce. Suggest optimal promotion strategies.
        
Respond with valid JSON:
{
  "suggested_promotion": {
    "type": "voucher|flash_sale|loyalty_reward",
    "target_segment": "segment name",
    "discount_range": "X-Y%",
    "optimal_timing": "when to run",
    "confidence": "high|medium|low"
  },
  "expected_impact": {
    "conversion_uplift": "X%",
    "inventory_impact": "description",
    "waste_reduction": "description"
  },
  "reasoning": "Why this promotion makes sense"
}`;
        userPrompt = `Suggest promotions based on: ${JSON.stringify(context)}`;
        break;

      default:
        systemPrompt = "You are a helpful AI assistant for SME business analytics.";
        userPrompt = context?.message || "Provide general business advice.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "AI service is busy. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service unavailable");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Try to parse as JSON, otherwise return as text
    let parsedContent;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
      parsedContent = JSON.parse(jsonMatch[1] || content);
    } catch {
      parsedContent = { raw: content };
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI insights error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});