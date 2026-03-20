-- Run this in the Supabase SQL Editor to create the posts table

CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  author TEXT NOT NULL DEFAULT 'Aaron Todd',
  featured_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_posts_published_date ON public.posts(published, date DESC);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users full access"
  ON public.posts FOR ALL
  USING (auth.role() = 'authenticated');
