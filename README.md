# Fasade

Women-exclusive skincare ritual app built with **Expo (React Native)** and **Supabase**.

## Features

- Daily face photo ritual with AI scorecard (5 factors: Clarity, Symmetry, Hydration, Tone, Texture)
- Personalized product guidance and insights
- **Arena** social feed with Elevate (likes) and Remarks (comments)
- **Ranks** leaderboard (Elevation Points = ritual scores + streak + elevates)
- **Vanity** profile, metrics, vanity grid, badges
- **Atelier** curated ritual content
- Women-only onboarding gate with community attestation

## Project structure

```
fasade/
  apps/mobile/     Expo app
  apps/web/        Landing page (React + Vite)
  supabase/        Migrations, edge functions, seed
```

## Landing page (Waitlist)

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:5173 to preview the Fasade waitlist landing page.

Survey responses and waitlist emails are saved to **Supabase** when env vars are set. See `apps/web/DEPLOY.md` for full deployment steps (GitHub, Vercel, custom domain).


## Quick start (Demo mode)

No backend required for UI exploration:

```bash
cd apps/mobile
npm install
npx expo start
```

On the login screen, tap **Continue in Demo Mode**.

## Production setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Install [Supabase CLI](https://supabase.com/docs/guides/cli)
3. From repo root:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
psql $DATABASE_URL -f supabase/seed.sql
supabase functions deploy analyze-ritual
supabase functions deploy recalculate-ep
```

4. Set secrets:

```bash
supabase secrets set OPENAI_API_KEY=sk-...
```

5. Create storage bucket `ritual-photos` (or run migration `002_storage.sql`)

### 2. Mobile env

Copy `apps/mobile/.env.example` to `apps/mobile/.env`:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
EXPO_PUBLIC_EAS_PROJECT_ID=your-eas-id
```

### 3. Run app

```bash
cd apps/mobile
npx expo start
```

## EAS Build

```bash
cd apps/mobile
npm install -g eas-cli
eas build:configure
eas build --platform ios
eas build --platform android
```

## Elevation Points formula

Daily increment (added each ritual day until month end):

```
daily_EP = ritual_score + (streak_days × 20) + (elevate_count × 10)
monthly_EP = sum of daily_EP for current calendar month
```

Leaderboard resets on the 1st of each month. Deploy cron edge functions:

- `daily-leaderboard` — refresh daily EP (schedule: daily)
- `monthly-ep-reset` — zero EP on new month (schedule: `0 0 1 * *`)

Set `CRON_SECRET` in Supabase and pass `Authorization: Bearer $CRON_SECRET`.

## Social: Following

Only **followers** see a user's Arena rituals and can Elevate or Remark. Tap **Following** on Vanity to manage who you follow.

## Legal

Cosmetic guidance only — not medical advice. Review women-only community policies before App Store submission.
