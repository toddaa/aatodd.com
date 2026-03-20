create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  content text not null default '',
  date timestamptz not null default now(),
  author text not null default 'Aaron Todd',
  featured_image text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.posts enable row level security;

-- Allow public read access to published posts
create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

-- Allow service role full access (for admin/API usage)
create policy "Service role has full access"
  on public.posts for all
  using (auth.role() = 'service_role');
