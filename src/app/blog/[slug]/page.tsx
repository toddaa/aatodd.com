import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Prose } from "@/components/prose";
import { siteConfig } from "@/lib/constants";
import type { Post } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: posts } = await supabase
      .from("posts")
      .select("slug")
      .eq("published", true);
    return (posts ?? []).map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const supabase = await createSupabaseServerClient();
    const { data: post } = await supabase
      .from("posts")
      .select("title, description, featured_image")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!post) return {};

    return {
      title: post.title,
      description: post.description ?? undefined,
      openGraph: {
        title: post.title,
        description: post.description ?? undefined,
        url: `${siteConfig.url}/blog/${slug}`,
        type: "article",
        images: post.featured_image
          ? [{ url: post.featured_image, width: 1200, height: 630 }]
          : undefined,
        locale: "en",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description ?? undefined,
        site: siteConfig.twitterHandle,
        images: post.featured_image ? [post.featured_image] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: Post | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    post = data;
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-4">
          <span>{format(new Date(post.date), "yyyy.MM.dd")}</span>
          <span className="text-border">|</span>
          <span>{post.author}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="mt-6 h-px bg-gradient-to-r from-neon via-neon-secondary to-transparent" />
      </header>

      {post.featured_image && (
        <div className="relative aspect-video overflow-hidden border border-border mb-10">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <Prose html={post.content} />
    </article>
  );
}
