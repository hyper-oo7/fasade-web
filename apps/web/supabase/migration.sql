-- Run this in Supabase SQL Editor (or via supabase db push from monorepo root)
-- File also lives at: ../../supabase/migrations/004_landing_waitlist.sql

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'waitlist-section'
    check (source in ('hero', 'waitlist-section', 'footer')),
  created_at timestamptz not null default now(),
  unique (email)
);

create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  age_group text not null,
  beauty_concern text not null,
  selfie_frequency text not null,
  tracks_skincare text not null,
  would_upload_daily text not null,
  would_pay_monthly text not null,
  comments text not null default '',
  created_at timestamptz not null default now()
);

create index survey_responses_created_at_idx on public.survey_responses (created_at desc);
create index waitlist_created_at_idx on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;
alter table public.survey_responses enable row level security;

create policy "Anyone can join waitlist"
  on public.waitlist for insert to anon, authenticated with check (true);

create policy "Anyone can submit survey"
  on public.survey_responses for insert to anon, authenticated with check (true);

create policy "Service role reads waitlist"
  on public.waitlist for select to service_role using (true);

create policy "Service role reads surveys"
  on public.survey_responses for select to service_role using (true);
