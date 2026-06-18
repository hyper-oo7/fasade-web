export const SCORING = {
  streakMultiplier: 20,
  elevateMultiplier: 10,
} as const;

export type SkinFactors = {
  clarity: number;
  symmetry: number;
  hydration: number;
  tone: number;
  texture: number;
};

/** Daily EP increment: ritual score + streak×20 + elevates×10 */
export function computeDailyEp(
  ritualScore: number,
  streakDays: number,
  elevateCount: number,
): number {
  return (
    ritualScore +
    streakDays * SCORING.streakMultiplier +
    elevateCount * SCORING.elevateMultiplier
  );
}

/** Sum daily logs for current month total */
export function computeMonthlyEp(dailyPoints: number[]): number {
  return dailyPoints.reduce((a, b) => a + b, 0);
}

export function currentMonthKey(d = new Date()): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function consistencyPercent(streakDays: number): number {
  return Math.min(100, Math.round((streakDays / 30) * 100));
}
