import type { Metadata } from "next";
import { createSupabasePublicClient } from "@/lib/supabase/server";
import { PostCard } from "@/components/post-card";
import { siteConfig } from "@/lib/constants";
import type { Post } from "@/lib/types";

export const metadata: Metadata = {
  title: {
    absolute: "Aaron Todd – Full-Stack Software Engineer from Michigan",
  },
  description:
    "Aaron Todd is a full-stack software engineer from Michigan. Articles on React, Next.js, React Native, AWS, serverless, and the craft of shipping software.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aaron Todd – Full-Stack Software Engineer",
    description:
      "Aaron Todd is a full-stack software engineer from Michigan writing about React, Next.js, AWS, and serverless.",
    url: siteConfig.url,
    type: "website",
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  let posts: Pick<Post, "id" | "title" | "slug" | "description" | "date" | "featured_image">[] = [];

  try {
    const supabase = createSupabasePublicClient();
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, description, date, featured_image")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(6);
    posts = data ?? [];
  } catch {
    // Supabase not configured yet; show static content only
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Aaron Todd",
    givenName: "Aaron",
    familyName: "Todd",
    url: siteConfig.url,
    mainEntityOfPage: `${siteConfig.url}/about`,
    image: `${siteConfig.url}/images/profile.png`,
    jobTitle: "Full-Stack Software Engineer",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressRegion: "MI",
      addressCountry: "US",
    },
    worksFor: {
      "@type": "Organization",
      name: "Roady's Truck Stops",
      url: "https://roadys.com",
    },
    memberOf: {
      "@type": "Organization",
      name: "Scouting America",
      url: "https://scouting.org",
    },
    award: "Eagle Scout",
    knowsAbout: [
      "Software Engineering",
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Node.js",
      "AWS",
      "Serverless",
      "Cloud Architecture",
      "DevOps",
    ],
    sameAs: Object.values(siteConfig.social),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aaron Todd",
    alternateName: "aatodd.com",
    url: siteConfig.url,
    author: { "@type": "Person", name: "Aaron Todd" },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-6">
      <script
        type="application/ld+json"
        // Static site config values, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        // Static site config values, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center py-20 overflow-hidden">
        <div className="hero-glow-primary" />
        <div className="hero-glow-secondary" />

        <h1 className="sr-only">
          Aaron Todd – Full-Stack Software Engineer from Michigan
        </h1>

        <div className="font-mono text-xs text-muted-foreground animate-fade-up delay-200">
          <span className="text-neon">$</span> cat /dev/mind
          <span className="inline-block w-2 h-[1em] bg-neon ml-0.5 align-text-bottom animate-blink" />
        </div>

        <div
          aria-hidden="true"
          className="mt-6 text-5xl sm:text-7xl font-bold leading-[0.95] tracking-tight animate-glitch-in delay-400"
        >
          <span className="text-neon neon-glow-strong">Build.</span>
          <br />
          <span className="[-webkit-text-stroke:1.5px_#6b6b76] text-transparent">
            Break.
          </span>
          <br />
          <span>Ship.</span>
        </div>

        <p className="mt-8 font-mono text-sm text-muted-foreground max-w-[50ch] leading-relaxed animate-fade-up delay-700">
          I&apos;m <strong className="text-foreground">Aaron Todd</strong>, a
          full-stack software engineer from Michigan who writes about the messy,
          beautiful process of turning ideas into working software. This is my
          workshop.
        </p>

        <div className="mt-8 flex gap-2 flex-wrap animate-fade-up delay-900">
          {["React", "React Native", "Next.js", "AWS", "DevOps"].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.65rem] uppercase tracking-widest px-3 py-1 border border-border text-muted-foreground transition-all duration-300 hover:border-neon hover:text-neon hover:neon-box-glow cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-3">
            <span className="text-muted-foreground">//</span>
            Latest Posts
          </h2>
          <a
            href="/blog"
            className="font-mono text-xs text-muted-foreground hover:text-neon transition-colors"
          >
            View Archive &rarr;
          </a>
        </div>

        {featured && (
          <PostCard post={featured} featured />
        )}

        {rest.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="border border-border p-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-neon">$</span> ls ./posts
              <br />
              <span className="text-muted-foreground/60">
                No posts yet. Initializing content...
              </span>
            </p>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
          {[
            { value: posts.length || "...", label: "Articles" },
            { value: "15+", label: "Years Building" },
            { value: "∞", label: "Bugs Shipped" },
            { value: "1", label: "Coffee Addiction" },
          ].map(({ value, label }) => (
            <div key={label} className="bg-background p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-neon neon-glow leading-none">
                {value}
              </div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
