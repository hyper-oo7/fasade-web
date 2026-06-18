import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { applyDailyEp } from "../_shared/ep-monthly.ts";
import { consistencyPercent, type SkinFactors } from "../_shared/scoring.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type AnalysisResult = {
  overall_score: number;
  factors: SkinFactors;
  recommendations: string[];
  insights: {
    action_required: { title: string; body: string };
    optimization: { title: string; body: string; badge?: string };
  };
};

function mockAnalysis(): AnalysisResult {
  return {
    overall_score: 88,
    factors: {
      clarity: 18,
      symmetry: 19,
      hydration: 14,
      tone: 17,
      texture: 20,
    },
    recommendations: [
      "Apply a hyaluronic serum to sub-orbital zones morning and night.",
      "Increase overnight serum density by 15% for localized dehydration.",
      "Continue SPF 30+ daily to preserve tone clarity.",
    ],
    insights: {
      action_required: {
        title: "Localized Dehydration",
        body:
          "Sub-orbital moisture levels detected below threshold. Increase overnight serum density by 15%.",
      },
      optimization: {
        title: "Recovery Optimization",
        body:
          "Your collagen synthesis has peaked. Continue current Ritual Discipline to lock in the 95th percentile texture ranking.",
        badge: "ELITE STATUS ACHIEVED",
      },
    },
  };
}

async function analyzeWithOpenAI(
  imageBase64: string,
  mimeType: string,
): Promise<AnalysisResult> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return mockAnalysis();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a cosmetic skincare advisor for Fasade, a women-only ritual app. 
Analyze the face photo for cosmetic guidance only — NOT medical diagnosis.
Return JSON only with this exact shape:
{
  "overall_score": number 0-100,
  "factors": { "clarity": 0-20, "symmetry": 0-20, "hydration": 0-20, "tone": 0-20, "texture": 0-20 },
  "recommendations": ["string"],
  "insights": {
    "action_required": { "title": "string", "body": "string" },
    "optimization": { "title": "string", "body": "string", "badge": "optional string" }
  }
}
If no face is visible, set overall_score to 0 and recommendations to ["Please capture a clear front-facing face in soft natural light."].`,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${imageBase64}`,
              },
            },
            {
              type: "text",
              text: "Analyze this daily face ritual photo.",
            },
          ],
        },
      ],
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    console.error("OpenAI error", await response.text());
    return mockAnalysis();
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  return JSON.parse(content) as AnalysisResult;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
    } = await userClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: profile } = await admin
      .from("profiles")
      .select("women_only_verified_at, is_banned")
      .eq("id", user.id)
      .single();

    if (!profile?.women_only_verified_at || profile.is_banned) {
      return new Response(JSON.stringify({ error: "Not verified" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { ritual_id, photo_path, mode = "skin" } = body;

    const today = new Date().toISOString().slice(0, 10);

    const { data: existing } = await admin
      .from("rituals")
      .select("id")
      .eq("user_id", user.id)
      .eq("ritual_date", today)
      .maybeSingle();

    if (existing && existing.id !== ritual_id) {
      return new Response(
        JSON.stringify({ error: "One ritual per day allowed" }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const path = photo_path as string;
    const { data: fileData, error: downloadError } = await admin.storage
      .from("ritual-photos")
      .download(path);

    if (downloadError || !fileData) {
      return new Response(JSON.stringify({ error: "Photo not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const buffer = await fileData.arrayBuffer();
    const base64 = btoa(
      String.fromCharCode(...new Uint8Array(buffer)),
    );
    const mimeType = path.endsWith(".png") ? "image/png" : "image/jpeg";

    const analysis = await analyzeWithOpenAI(base64, mimeType);

    const ritualPayload = {
      user_id: user.id,
      photo_path: path,
      mode,
      overall_score: analysis.overall_score,
      factors: analysis.factors,
      insights: analysis.insights,
      recommendations: analysis.recommendations,
      ritual_date: today,
    };

    let ritualId = ritual_id as string | undefined;
    if (ritualId) {
      await admin.from("rituals").update(ritualPayload).eq("id", ritualId);
    } else {
      const { data: inserted, error: insertErr } = await admin
        .from("rituals")
        .insert(ritualPayload)
        .select("id")
        .single();
      if (insertErr) throw insertErr;
      ritualId = inserted.id;
    }

    const { data: streakRow } = await admin
      .from("streaks")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    let newStreak = 1;
    if (streakRow?.last_ritual_date === yesterdayStr) {
      newStreak = (streakRow.current_days ?? 0) + 1;
    } else if (streakRow?.last_ritual_date === today) {
      newStreak = streakRow.current_days ?? 1;
    }

    await admin
      .from("streaks")
      .update({ current_days: newStreak, last_ritual_date: today })
      .eq("user_id", user.id);

    const { ep } = await applyDailyEp(
      admin,
      user.id,
      analysis.overall_score,
      newStreak,
    );
    const consistency = consistencyPercent(newStreak);

    return new Response(
      JSON.stringify({
        ritual_id: ritualId,
        ...analysis,
        streak_days: newStreak,
        elevation_points: ep,
        consistency_pct: consistency,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
