import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { Post } from "@/lib/types";

export function PostCard({
  post,
  featured = false,
}: {
  post: Pick<Post, "title" | "slug" | "description" | "date" | "featured_image">;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block border border-border bg-card transition-colors duration-300 hover:border-neon relative overflow-hidden"
      >
        <span className="absolute top-4 right-4 font-mono text-[0.6rem] tracking-[0.15em] uppercase bg-neon text-background px-2 py-0.5 z-10">
          Featured
        </span>
        <div className="grid sm:grid-cols-2 gap-0">
          {post.featured_image ? (
            <div className="relative aspect-[16/10] bg-card overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] bg-muted/30 flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Featured Image
              </span>
            </div>
          )}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <div className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-widest mb-3">
              {format(new Date(post.date), "yyyy.MM.dd")}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight mb-3">
              {post.title}
            </h3>
            {post.description && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.description}
              </p>
            )}
            <span className="mt-4 font-mono text-xs text-neon uppercase tracking-widest">
              &rarr; Read Article
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="post-item-bar group grid grid-cols-[80px_1fr_auto] sm:grid-cols-[100px_1fr_auto] gap-4 sm:gap-8 items-center p-4 sm:p-5 bg-card border border-border relative overflow-hidden transition-all duration-300 hover:bg-muted/30 hover:border-neon hover:translate-x-1"
    >
      <span className="font-mono text-[0.65rem] sm:text-xs text-muted-foreground whitespace-nowrap">
        {format(new Date(post.date), "yyyy.MM.dd")}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm sm:text-base font-medium tracking-tight truncate group-hover:text-foreground transition-colors">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5 hidden sm:block">
            {post.description}
          </p>
        )}
      </div>
      <span className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 border border-neon-dim text-neon whitespace-nowrap hidden sm:inline-block">
        Read
      </span>
    </Link>
  );
}
