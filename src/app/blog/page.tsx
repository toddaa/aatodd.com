import type { Metadata } from "next";
import { createSupabasePublicClient } from "@/lib/supabase/server";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Aaron Todd's Blog",
  description:
    "Articles by Aaron Todd on web development, React, Next.js, serverless, AWS, and the craft of shipping software.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://aatodd.com" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://aatodd.com/blog" },
        ],
      },
      {
        "@type": "Blog",
        url: "https://aatodd.com/blog",
        name: "Aaron Todd - Blog",
        description:
          "Articles by Aaron Todd on web development, React, Next.js, serverless, and AWS.",
        author: { "@id": "https://aatodd.com/#person" },
      },
    ],
  };

  let posts: Pick<Post, "id" | "title" | "slug" | "description" | "date" | "featured_image">[] = [];

  try {
    const supabase = createSupabasePublicClient();
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, description, date, featured_image")
      .eq("published", true)
      .order("date", { ascending: false });
    posts = data ?? [];
  } catch {
    // Supabase not configured yet
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        // Static page values, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-12">
        <h1 className="font-mono text-xs uppercase tracking-[0.2em] text-neon flex items-center gap-3 mb-4">
          <span className="text-muted-foreground" aria-hidden="true">//</span>
          Blog
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-neon">$</span> ls -la ./posts --sort=date
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="border border-border p-8 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            No posts yet. Initializing content...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
