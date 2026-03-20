import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/types";

export const revalidate = 3600;

export default async function HomePage() {
  let posts: Pick<Post, "id" | "title" | "slug" | "description" | "date" | "featured_image">[] = [];

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, description, date, featured_image")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(6);
    posts = data ?? [];
  } catch {
    // Supabase not configured yet — show static content only
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center py-20">
        <div className="hero-glow-primary" />
        <div className="hero-glow-secondary" />

        <div className="font-mono text-xs text-muted-foreground animate-fade-up delay-200">
          <span className="text-neon">$</span> cat /dev/mind
          <span className="inline-block w-2 h-[1em] bg-neon ml-0.5 align-text-bottom animate-blink" />
        </div>

        <h1 className="mt-6 text-5xl sm:text-7xl font-bold leading-[0.95] tracking-tight animate-glitch-in delay-400">
          <span className="text-neon neon-glow-strong">Build.</span>
          <br />
          <span className="[-webkit-text-stroke:1.5px_#6b6b76] text-transparent">
            Break.
          </span>
          <br />
          <span>Ship.</span>
        </h1>

        <p className="mt-8 font-mono text-sm text-muted-foreground max-w-[50ch] leading-relaxed animate-fade-up delay-700">
          I&apos;m <strong className="text-foreground">Aaron Todd</strong> — a
          software engineer who writes about the messy, beautiful process of
          turning ideas into working software. This is my workshop.
        </p>

        <div className="mt-8 flex gap-2 flex-wrap animate-fade-up delay-900">
          {["Next.js", "Architecture", "DevOps", "Craft"].map((tag) => (
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
          <div className="flex flex-col gap-px mt-4">
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
            { value: posts.length || "—", label: "Articles" },
            { value: "8+", label: "Years Building" },
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
