import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { applyDailyEp, ensureMonthReset } from "../_shared/ep-monthly.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/** Cron: refresh daily EP logs for users who completed ritual today */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const cronSecret = Deno.env.get("CRON_SECRET");
  const auth = req.headers.get("Authorization");
  if (cronSecret && auth !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  const today = new Date().toISOString().slice(0, 10);

  const { data: rituals } = await admin
    .from("rituals")
    .select("user_id, overall_score")
    .eq("ritual_date", today)
    .not("overall_score", "is", null);

  let updated = 0;
  for (const r of rituals ?? []) {
    await ensureMonthReset(admin, r.user_id);
    const { data: streak } = await admin
      .from("streaks")
      .select("current_days")
      .eq("user_id", r.user_id)
      .single();

    await applyDailyEp(
      admin,
      r.user_id,
      r.overall_score as number,
      streak?.current_days ?? 0,
    );
    updated++;
  }

  return new Response(
    JSON.stringify({
      updated,
      date: today,
      message: "Daily leaderboard EP refresh complete",
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
