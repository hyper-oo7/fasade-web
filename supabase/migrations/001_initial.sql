-- Fasade initial schema
create extension if not exists "uuid-ossp";

-- Circles (groups)
create table public.circles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  title text default 'Ritualist',
  women_only_verified_at timestamptz,
  age_confirmed_at timestamptz,
  circle_id uuid references public.circles(id) on delete set null,
  elevation_points integer not null default 0,
  push_token text,
  ritual_reminder_hour integer default 9,
  is_admin boolean not null default false,
  is_banned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Streaks
create table public.streaks (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  current_days integer not null default 0,
  last_ritual_date date
);

-- Rituals (one per user per day)
create table public.rituals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  photo_path text not null,
  mode text not null default 'skin' check (mode in ('skin', 'profile', 'detail')),
  overall_score integer check (overall_score >= 0 and overall_score <= 100),
  factors jsonb,
  insights jsonb,
  recommendations text[],
  ritual_date date not null default (current_date),
  created_at timestamptz not null default now(),
  unique (user_id, ritual_date)
);

-- Arena posts
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  ritual_id uuid references public.rituals(id) on delete set null,
  caption text,
  ritual_type_label text,
  elevate_count integer not null default 0,
  remark_count integer not null default 0,
  image_url text,
  created_at timestamptz not null default now()
);

create table public.elevates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);

create table public.remarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

-- Atelier curated content
create table public.atelier_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  author_name text not null,
  image_url text,
  tags text[] default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Badges
create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  label text not null,
  icon text not null
);

create table public.user_badges (
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

-- Reports (moderation)
create table public.reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reported_user_id uuid references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  reason text,
  created_at timestamptz not null default now()
);

-- Helper: verified women-only member
create or replace function public.is_verified_member(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = uid
      and p.women_only_verified_at is not null
      and p.is_banned = false
  );
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  insert into public.streaks (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Elevate count trigger
create or replace function public.on_elevate_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts set elevate_count = elevate_count + 1 where id = new.post_id;
  return new;
end;
$$;

create trigger elevate_insert after insert on public.elevates
  for each row execute function public.on_elevate_insert();

create or replace function public.on_elevate_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts set elevate_count = greatest(0, elevate_count - 1) where id = old.post_id;
  return old;
end;
$$;

create trigger elevate_delete after delete on public.elevates
  for each row execute function public.on_elevate_delete();

-- Remark count trigger
create or replace function public.on_remark_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts set remark_count = remark_count + 1 where id = new.post_id;
  return new;
end;
$$;

create trigger remark_insert after insert on public.remarks
  for each row execute function public.on_remark_insert();

-- RLS
alter table public.profiles enable row level security;
alter table public.circles enable row level security;
alter table public.streaks enable row level security;
alter table public.rituals enable row level security;
alter table public.posts enable row level security;
alter table public.elevates enable row level security;
alter table public.remarks enable row level security;
alter table public.atelier_items enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.reports enable row level security;

-- Profiles policies
create policy "Public profiles readable by verified members"
  on public.profiles for select
  using (public.is_verified_member(auth.uid()) or id = auth.uid());

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Circles
create policy "Circles readable by verified members"
  on public.circles for select
  using (public.is_verified_member(auth.uid()));

create policy "Verified users create circles"
  on public.circles for insert
  with check (public.is_verified_member(auth.uid()));

-- Streaks
create policy "Own streak readable"
  on public.streaks for select
  using (auth.uid() = user_id and public.is_verified_member(auth.uid()));

create policy "Own streak updatable via service"
  on public.streaks for update
  using (auth.uid() = user_id);

-- Rituals
create policy "Own rituals readable"
  on public.rituals for select
  using (auth.uid() = user_id or public.is_verified_member(auth.uid()));

create policy "Verified users insert own rituals"
  on public.rituals for insert
  with check (auth.uid() = user_id and public.is_verified_member(auth.uid()));

create policy "Own rituals updatable"
  on public.rituals for update
  using (auth.uid() = user_id);

-- Posts (Arena)
create policy "Posts readable by verified members"
  on public.posts for select
  using (public.is_verified_member(auth.uid()));

create policy "Verified users create posts"
  on public.posts for insert
  with check (auth.uid() = user_id and public.is_verified_member(auth.uid()));

-- Elevates
create policy "Elevates readable"
  on public.elevates for select
  using (public.is_verified_member(auth.uid()));

create policy "Verified users elevate"
  on public.elevates for insert
  with check (auth.uid() = user_id and public.is_verified_member(auth.uid()));

create policy "Users remove own elevate"
  on public.elevates for delete
  using (auth.uid() = user_id);

-- Remarks
create policy "Remarks readable"
  on public.remarks for select
  using (public.is_verified_member(auth.uid()));

create policy "Verified users remark"
  on public.remarks for insert
  with check (auth.uid() = user_id and public.is_verified_member(auth.uid()));

-- Atelier (public read for verified)
create policy "Atelier readable"
  on public.atelier_items for select
  using (public.is_verified_member(auth.uid()) or auth.uid() is not null);

-- Badges
create policy "Badges readable"
  on public.badges for select
  using (true);

create policy "User badges readable"
  on public.user_badges for select
  using (public.is_verified_member(auth.uid()) or user_id = auth.uid());

-- Reports
create policy "Users create reports"
  on public.reports for insert
  with check (auth.uid() = reporter_id and public.is_verified_member(auth.uid()));

-- Storage bucket (run via dashboard or supabase config)
-- ritual-photos: private

-- Leaderboard view
create or replace view public.leaderboard_individual as
select
  p.id,
  p.display_name,
  p.avatar_url,
  p.title,
  p.elevation_points,
  c.name as circle_name,
  coalesce(s.current_days, 0) as streak_days,
  least(100, round(coalesce(s.current_days, 0)::numeric / 30 * 100))::integer as consistency_pct,
  rank() over (order by p.elevation_points desc) as rank
from public.profiles p
left join public.circles c on c.id = p.circle_id
left join public.streaks s on s.user_id = p.id
where p.women_only_verified_at is not null and p.is_banned = false;

create or replace view public.leaderboard_circles as
select
  c.id,
  c.name,
  sum(p.elevation_points)::integer as total_ep,
  count(p.id)::integer as member_count,
  rank() over (order by sum(p.elevation_points) desc) as rank
from public.circles c
join public.profiles p on p.circle_id = c.id
where p.women_only_verified_at is not null and p.is_banned = false
group by c.id, c.name;
