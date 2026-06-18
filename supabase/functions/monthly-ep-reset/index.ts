import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { currentMonthKey } from "../_shared/scoring.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/** Cron: reset all users EP on new calendar month */
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

  const month = currentMonthKey();

  const { data: profiles } = await admin
    .from("profiles")
    .select("id, ep_month")
    .neq("ep_month", month);

  let reset = 0;
  for (const p of profiles ?? []) {
    await admin
      .from("profiles")
      .update({
        elevation_points: 0,
        ep_month: month,
        last_daily_ep_date: null,
      })
      .eq("id", p.id);
    reset++;
  }

  return new Response(
    JSON.stringify({ reset, month, message: "Monthly EP reset complete" }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
