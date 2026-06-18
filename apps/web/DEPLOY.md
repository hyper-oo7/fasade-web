# Deploying Fasade Landing Page

Everything runs on **GitHub**, **Supabase**, and **Vercel** — no Cursor services required.

---

## What you need to provide

Send these when ready:

| Item | Example |
|------|---------|
| **Supabase project URL** | `https://abcdefgh.supabase.co` |
| **Supabase anon key** | From Supabase → Settings → API |
| **GitHub repo URL** | `https://github.com/yourname/fasade` (new or existing) |
| **Custom domain** | `https://fasade.com` or `https://www.fasade.com` |

---

## Step 1 — Supabase database

1. Open [supabase.com](https://supabase.com) → your project (or create one).
2. Go to **SQL Editor** and run the migration file:
   ```
   supabase/migrations/004_landing_waitlist.sql
   ```
   Or from your terminal (linked project):
   ```bash
   cd C:\Users\RAMAN\Projects\fasade
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```
3. Confirm tables exist: **Table Editor** → `waitlist`, `survey_responses`.
4. Copy **Project URL** and **anon public key** from **Settings → API**.

---

## Step 2 — Local environment

```bash
cd apps/web
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Test locally:

```bash
npm install
npm run dev
```

Submit the waitlist form and check **Supabase → Table Editor → waitlist**.

---

## Step 3 — Push to GitHub

Your mobile app already lives at `https://github.com/hyper-oo7/fasade`. Options:

### Option A — Monorepo (recommended)

Push the full repo (`apps/web`, `apps/mobile`, `supabase`) to one GitHub repo:

```bash
cd C:\Users\RAMAN\Projects\fasade

# Remove nested git inside mobile so the monorepo tracks everything
Remove-Item -Recurse -Force apps\mobile\.git

git add .
git commit -m "Add Fasade landing page with Supabase integration"
git remote add origin https://github.com/YOUR_USERNAME/fasade.git
git branch -M main
git push -u origin main
```

### Option B — Web-only repo

Push only the landing page:

```bash
cd C:\Users\RAMAN\Projects\fasade\apps\web
git init
git add .
git commit -m "Fasade landing page"
git remote add origin https://github.com/YOUR_USERNAME/fasade-web.git
git push -u origin main
```

---

## Step 4 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**.
2. Import your GitHub repository.
3. Configure:

   | Setting | Monorepo | Web-only |
   |---------|----------|----------|
   | **Root Directory** | `apps/web` | `.` |
   | **Framework** | Vite | Vite |
   | **Build Command** | `npm run build` | `npm run build` |
   | **Output Directory** | `dist` | `dist` |

4. Add **Environment Variables** (Production + Preview):

   ```
   VITE_SUPABASE_URL = https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJ...
   ```

5. Click **Deploy**.

Your site will be live at `https://your-project.vercel.app`.

---

## Step 5 — Custom domain

1. Vercel project → **Settings → Domains**.
2. Add your domain (e.g. `fasade.com` and `www.fasade.com`).
3. At your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), add the DNS records Vercel shows:

   **Root domain (`fasade.com`):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **WWW subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. Wait for DNS propagation (usually 5–30 minutes). Vercel will issue SSL automatically.

Send your domain when ready and we can verify DNS settings.

---

## Viewing submissions

- **Waitlist emails:** Supabase → Table Editor → `waitlist`
- **Survey responses:** Supabase → Table Editor → `survey_responses`

Export anytime: select table → **Export as CSV**.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Forms submit but no data in Supabase | Check Vercel env vars; redeploy after adding them |
| `permission denied` on insert | Re-run migration `004_landing_waitlist.sql` |
| Duplicate email on waitlist | Expected — unique constraint returns success silently |
| Build fails on Vercel | Set Root Directory to `apps/web` for monorepo |

---

## Files reference

```
apps/web/
  .env.example          Local env template
  vercel.json           SPA routing for Vercel
  src/lib/supabase.ts   Supabase client
  src/lib/api.ts        Form submission logic
supabase/migrations/
  004_landing_waitlist.sql   Database schema + RLS
```
