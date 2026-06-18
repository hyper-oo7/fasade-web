-- Follows (followers can see rituals & interact)
create table public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create index idx_follows_following on public.follows(following_id);
create index idx_follows_follower on public.follows(follower_id);

-- Monthly EP tracking: cumulative within calendar month, reset on 1st
alter table public.profiles
  add column if not exists ep_month text,
  add column if not exists last_daily_ep_date date;

create table public.ep_daily_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  log_date date not null default (current_date),
  ritual_score integer not null default 0,
  streak_days integer not null default 0,
  elevate_count integer not null default 0,
  points_added integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, log_date)
);

-- Helper: is follower of post author
create or replace function public.is_follower_of(viewer uuid, author uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select viewer = author
    or exists (
      select 1 from public.follows f
      where f.follower_id = viewer and f.following_id = author
    );
$$;

-- Follower / following counts on profiles
create or replace function public.follower_count(uid uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer from public.follows where following_id = uid;
$$;

create or replace function public.following_count(uid uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer from public.follows where follower_id = uid;
$$;

-- Drop old permissive post policies
drop policy if exists "Posts readable by verified members" on public.posts;
drop policy if exists "Elevates readable" on public.elevates;
drop policy if exists "Verified users elevate" on public.elevates;
drop policy if exists "Remarks readable" on public.remarks;
drop policy if exists "Verified users remark" on public.remarks;

-- Posts: own posts + posts from people you follow
create policy "Posts visible to self and followers"
  on public.posts for select
  using (
    public.is_verified_member(auth.uid())
    and public.is_follower_of(auth.uid(), user_id)
  );

create policy "Verified users create posts"
  on public.posts for insert
  with check (auth.uid() = user_id and public.is_verified_member(auth.uid()));

-- Elevates: only followers of post author
create policy "Elevates readable by verified"
  on public.elevates for select
  using (public.is_verified_member(auth.uid()));

create policy "Followers can elevate"
  on public.elevates for insert
  with check (
    auth.uid() = user_id
    and public.is_verified_member(auth.uid())
    and exists (
      select 1 from public.posts p
      where p.id = post_id
        and public.is_follower_of(auth.uid(), p.user_id)
        and p.user_id <> auth.uid()
    )
  );

create policy "Users remove own elevate"
  on public.elevates for delete
  using (auth.uid() = user_id);

-- Remarks: only followers
create policy "Remarks readable by verified"
  on public.remarks for select
  using (public.is_verified_member(auth.uid()));

create policy "Followers can remark"
  on public.remarks for insert
  with check (
    auth.uid() = user_id
    and public.is_verified_member(auth.uid())
    and exists (
      select 1 from public.posts p
      where p.id = post_id
        and public.is_follower_of(auth.uid(), p.user_id)
        and p.user_id <> auth.uid()
    )
  );

-- Follows RLS
alter table public.follows enable row level security;

create policy "Follows readable by verified"
  on public.follows for select
  using (public.is_verified_member(auth.uid()));

create policy "Users can follow"
  on public.follows for insert
  with check (
    auth.uid() = follower_id
    and public.is_verified_member(auth.uid())
  );

create policy "Users can unfollow"
  on public.follows for delete
  using (auth.uid() = follower_id);

-- EP daily log
alter table public.ep_daily_log enable row level security;

create policy "Own ep log readable"
  on public.ep_daily_log for select
  using (auth.uid() = user_id);

-- Leaderboard uses monthly elevation_points (reset via edge function)
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
  public.follower_count(p.id) as follower_count,
  public.following_count(p.id) as following_count,
  rank() over (order by p.elevation_points desc) as rank
from public.profiles p
left join public.circles c on c.id = p.circle_id
left join public.streaks s on s.user_id = p.id
where p.women_only_verified_at is not null and p.is_banned = false;
