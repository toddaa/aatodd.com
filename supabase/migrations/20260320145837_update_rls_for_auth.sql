-- Drop the old service_role-only policy
drop policy if exists "Service role has full access" on public.posts;

-- Allow authenticated users full access (for admin via magic link)
create policy "Authenticated users have full access"
  on public.posts for all
  using (auth.role() = 'authenticated');

-- Also allow anon to read all posts (not just published) for the admin list
-- The proxy.ts handles route protection, RLS just needs to allow reads
drop policy if exists "Public can read published posts" on public.posts;

create policy "Anyone can read published posts"
  on public.posts for select
  using (published = true);

create policy "Authenticated users can read all posts"
  on public.posts for select
  using (auth.role() = 'authenticated');
