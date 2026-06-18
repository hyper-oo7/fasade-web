import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import {
  computeDailyEp,
  computeMonthlyEp,
  currentMonthKey,
} from "./scoring.ts";

export async function ensureMonthReset(
  admin: SupabaseClient,
  userId: string,
) {
  const month = currentMonthKey();
  const { data: profile } = await admin
    .from("profiles")
    .select("ep_month")
    .eq("id", userId)
    .single();

  if (profile?.ep_month !== month) {
    await admin
      .from("profiles")
      .update({
        ep_month: month,
        elevation_points: 0,
        last_daily_ep_date: null,
      })
      .eq("id", userId);
  }
}

export async function applyDailyEp(
  admin: SupabaseClient,
  userId: string,
  ritualScore: number,
  streakDays: number,
) {
  const month = currentMonthKey();
  await ensureMonthReset(admin, userId);

  const { data: posts } = await admin
    .from("posts")
    .select("elevate_count")
    .eq("user_id", userId);

  const elevateTotal = (posts ?? []).reduce(
    (sum, p) => sum + (p.elevate_count ?? 0),
    0,
  );

  const today = new Date().toISOString().slice(0, 10);
  const points = computeDailyEp(ritualScore, streakDays, elevateTotal);

  await admin.from("ep_daily_log").upsert(
    {
      user_id: userId,
      log_date: today,
      ritual_score: ritualScore,
      streak_days: streakDays,
      elevate_count: elevateTotal,
      points_added: points,
    },
    { onConflict: "user_id,log_date" },
  );

  const startOfMonth = `${month}-01`;
  const { data: logs } = await admin
    .from("ep_daily_log")
    .select("points_added")
    .eq("user_id", userId)
    .gte("log_date", startOfMonth);

  const monthlyEp = computeMonthlyEp(
    (logs ?? []).map((l) => l.points_added as number),
  );

  await admin
    .from("profiles")
    .update({
      elevation_points: monthlyEp,
      ep_month: month,
      last_daily_ep_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  return { ep: monthlyEp, dailyPoints: points, elevateTotal };
}

/** Re-sum month EP after elevate (updates today's log if ritual exists) */
export async function refreshMonthlyEpFromLatest(
  admin: SupabaseClient,
  userId: string,
) {
  await ensureMonthReset(admin, userId);

  const today = new Date().toISOString().slice(0, 10);
  const { data: ritual } = await admin
    .from("rituals")
    .select("overall_score")
    .eq("user_id", userId)
    .eq("ritual_date", today)
    .maybeSingle();

  const { data: streak } = await admin
    .from("streaks")
    .select("current_days")
    .eq("user_id", userId)
    .single();

  const score = ritual?.overall_score ?? 0;
  const streakDays = streak?.current_days ?? 0;

  if (ritual?.overall_score != null) {
    return applyDailyEp(admin, userId, score, streakDays);
  }

  const month = currentMonthKey();
  const startOfMonth = `${month}-01`;
  const { data: logs } = await admin
    .from("ep_daily_log")
    .select("points_added")
    .eq("user_id", userId)
    .gte("log_date", startOfMonth);

  const monthlyEp = computeMonthlyEp(
    (logs ?? []).map((l) => l.points_added as number),
  );

  await admin
    .from("profiles")
    .update({ elevation_points: monthlyEp, ep_month: month })
    .eq("id", userId);

  return { ep: monthlyEp, dailyPoints: 0, elevateTotal: 0 };
}
