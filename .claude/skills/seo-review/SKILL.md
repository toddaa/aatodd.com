---
name: seo-review
description: Use when editing pages, components, or layouts in the aatodd.com blog to check for SEO issues. Also use when user asks for an SEO audit, review, or checkup. Covers meta tags, structured data, sitemap, robots, images, headings, semantic HTML, and OG images.
user_invocable: true
---

# SEO Review for aatodd.com

Review pages and components for SEO issues specific to this Next.js 16 App Router blog powered by Supabase.

## Checklist

Run through each section. Report issues found and fix them. Skip sections that don't apply to the files being reviewed.

### 1. Page Metadata

Every page in `src/app/` MUST export either a static `metadata` object or a `generateMetadata()` function.

**Check for:**
- Missing metadata export (especially on new pages)
- Missing or generic `title` (should be descriptive, under 60 chars)
- Missing or generic `description` (should be compelling, 150-160 chars)
- Title should use the template system — child pages export just `title`, root layout appends `| Aaron Todd`

**Blog posts specifically:**
- `generateMetadata()` must set `openGraph.type` to `"article"`
- Must include `openGraph.url` with full canonical path
- Must include `openGraph.images` when `featured_image` exists (1200x630)
- Must include `twitter.card`, `twitter.images`

**Reference:** Root layout metadata is in `src/app/layout.tsx`, site config in `src/lib/constants.ts`.

### 2. Open Graph & Twitter Cards

**Check for:**
- Every public page needs OG title + description (inherited from metadata is fine)
- Blog posts need OG type `"article"` (not `"website"`)
- Default OG image should exist at `/public/images/og-default.png` (1200x630) and be referenced in root layout metadata `openGraph.images`
- Twitter card should be `"summary_large_image"` when an image is available
- OG locale should be `"en_US"`

### 3. JSON-LD Structured Data

Blog posts SHOULD include `BlogPosting` JSON-LD. The about page SHOULD include `Person` JSON-LD.

**BlogPosting schema** (in `src/app/blog/[slug]/page.tsx`):
- `@type`: BlogPosting
- `headline`: post.title
- `description`: post.description
- `author`: `{ "@type": "Person", "name": post.author }`
- `datePublished`: post.date
- `url`: full canonical URL
- `image`: post.featured_image (if present)

**Person schema** (in `src/app/about/page.tsx`):
- `@type`: Person
- `name`: Aaron Todd
- `url`: https://aatodd.com
- `jobTitle`: Software Engineer
- `sameAs`: array of social profile URLs from siteConfig

Render JSON-LD via a `<script type="application/ld+json">` tag in the page component.

### 4. Sitemap

A dynamic sitemap MUST exist at `src/app/sitemap.ts` that:
- Includes all static pages (`/`, `/blog`, `/about`)
- Queries Supabase for published blog post slugs
- Returns proper `lastModified` dates
- Uses `createSupabasePublicClient()` (not the cookie-based server client)

### 5. Robots

A robots file SHOULD exist at `src/app/robots.ts` that:
- Allows all user agents
- References the sitemap URL (`https://aatodd.com/sitemap.xml`)
- Disallows `/admin` paths

### 6. Images

**Check for:**
- All `<Image>` components MUST have descriptive `alt` text (not empty string)
- Alt text should describe the image content, not just repeat the page title
- Featured images on blog posts should use `priority` prop if above the fold
- Remote images must be configured in `next.config.ts` `images.remotePatterns`

### 7. Heading Hierarchy

**Check for:**
- Exactly one `<h1>` per page
- No skipped heading levels (h1 -> h3 without h2)
- Section labels should use heading elements (`<h2>`, `<h3>`), not styled `<div>` elements
- Headings should be descriptive and contain keywords naturally

### 8. Semantic HTML

**Check for:**
- Blog posts wrapped in `<article>`
- Navigation uses `<nav>`
- Page sections use `<section>` with purpose
- Site header/footer use `<header>`/`<footer>`
- Main content area uses `<main>`
- Interactive elements use `<button>` not `<div onClick>`
- Links use `<a>` with meaningful link text (not "click here")

### 9. Canonical URLs

**Check for:**
- Blog posts should include canonical URL in metadata: `alternates: { canonical: `/blog/${slug}` }`
- Prevents duplicate content if URL variants exist

### 10. Performance Signals

**Check for:**
- `next/font` used for fonts (not external stylesheet links)
- No render-blocking external CSS
- Images above the fold have `priority` prop
- Large components below the fold are candidates for dynamic import

## When Auto-Triggered on File Edit

If triggered by a file edit (not manual invocation), scope the review to only the sections relevant to the edited file:

| File Pattern | Sections to Check |
|---|---|
| `src/app/**/page.tsx` | 1, 2, 3, 7, 8 |
| `src/app/**/layout.tsx` | 1, 2, 8, 10 |
| `src/components/*.tsx` | 6, 7, 8 |
| `src/app/sitemap.ts` | 4 |
| `src/app/robots.ts` | 5 |
| `next.config.ts` | 6 |

## Reporting

After review, report:
- **Issues found** with file path and line number
- **Fixes applied** (or proposed if uncertain)
- **Score** out of 10 sections passing
