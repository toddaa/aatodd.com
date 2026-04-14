# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

This project runs **Next.js 16 + React 19.2 + Tailwind v4**. These are recent major releases with breaking changes from earlier versions. If an API doesn't match what you expect, check `node_modules/next/dist/docs/` or the package's own docs: don't rely on memorized APIs.

## Commands

- `npm run dev`: start dev server (http://localhost:3000)
- `npm run build`: production build
- `npm run start`: run the built app
- `npm run lint`: ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

There is no test runner configured.

### Database / Supabase

Schema lives in `supabase/migrations/` as timestamped SQL files. This is the source of truth: `scripts/schema.sql` is a legacy bootstrap artifact. Use the Supabase CLI locally (`supabase db push`, `supabase migration new <name>`). The directory contains `supabase/config.toml` for local dev.

`scripts/migrate-posts.ts` is a one-shot content-import script, not part of the build pipeline.

## Architecture

### Routing middleware is `src/proxy.ts`, not `middleware.ts`

Next.js 16 renamed middleware to `proxy.ts`. It runs on `/admin(.*)` only and uses `@supabase/ssr`'s `createServerClient` to refresh the session cookie and gate `/admin/*` behind a logged-in user (redirecting to `/admin/login`). `/admin/callback` is explicitly skipped so the client-side code exchange can complete.

### Three Supabase client factories: use the right one

- `createSupabasePublicClient()` (`src/lib/supabase/server.ts`): anon, no cookies. Use in **public RSCs** (home, `/blog`, `/blog/[slug]`) that only read `published = true` rows. Safe to call in `generateStaticParams` / `generateMetadata`.
- `createSupabaseServerClient()` (`src/lib/supabase/server.ts`): `@supabase/ssr` server client with Next.js cookie integration. Use in **authenticated server code** (route handlers that check `auth.getUser()`, admin server components).
- `getSupabaseClient()` (`src/lib/supabase/client.ts`): browser client, cached per tab. Use in **`"use client"` components** under `/admin`.

The `/api/upload` route is the only place that reaches for `SUPABASE_SERVICE_ROLE_KEY`: it verifies the user via the SSR client first, then creates a service-role client to bypass storage RLS. Don't replicate that pattern elsewhere without the same auth check.

### RLS model

Defined in `supabase/migrations/`:
- anon: `SELECT` on posts where `published = true`; `SELECT` on `post-images` storage.
- authenticated: full access to `posts`; full CRUD on `post-images`.

The admin UI relies on this: it queries Supabase directly from the browser client after magic-link auth, not through an API layer. Route protection lives in `proxy.ts`; RLS is the second line of defense.

### ISR and revalidation

Public pages set `export const revalidate = 3600`. Two on-demand revalidation routes exist:

- `POST /api/revalidate`: external, shared-secret (`REVALIDATION_SECRET`). For webhooks/cron.
- `POST /api/revalidate-post`: cookie-authenticated via the SSR client. Called from admin UI after publish/edit.

Both revalidate `/`, `/blog`, and `/blog/{slug}` when a slug is provided. Keep them in sync if you add paths.

### Content pipeline

Posts are authored in the `/admin` CMS with Tiptap (`src/components/tiptap-editor.tsx`), stored as HTML in `posts.content`, and rendered on `/blog/[slug]` through `<Prose html={post.content} />`. `Prose` renders the stored HTML directly: this is intentional because content is admin-authored and trusted. If you swap in sanitization, verify every Tiptap extension (code blocks, images, links, lists) still round-trips.

Code highlighting is done at render time via `@tiptap/extension-code-block-lowlight` + `highlight.js`. The featured image and any inline images are uploaded through `/api/upload` into the public `post-images` bucket; `next.config.ts` whitelists `**.supabase.co` for `next/image`.

### Styling system

Tailwind v4 with `@import "tailwindcss"` in `src/app/globals.css`. shadcn/ui uses the **`base-nova`** style (see `components.json`). UI primitives go in `src/components/ui/` and are built on `@base-ui/react`, not Radix. Note `Button` has a `render={...}` prop (Base UI pattern) used for rendering as `Link`; `nativeButton={false}` is required when doing that.

The look is a custom terminal/cyberpunk theme: `--neon` (`#00ffaa`), `--neon-secondary`, `--neon-dim` CSS vars in `globals.css`; monospace accents via Space Mono, body via Outfit (both via `next/font/google` in `src/app/layout.tsx`).

### Path alias

`@/*` → `src/*` (see `tsconfig.json`). Use it consistently.

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: client + SSR.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only, used only in `/api/upload`.
- `REVALIDATION_SECRET`: shared secret for `/api/revalidate`.

`.env.local` and `.env.production` are present but gitignored.
