import type { MetadataRoute } from "next";
import { createSupabasePublicClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aatodd.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/consulting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/service`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let postPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createSupabasePublicClient();
    const { data: posts } = await supabase
      .from("posts")
      .select("slug, updated_at")
      .eq("published", true);

    postPages = (posts ?? []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Supabase not available
  }

  return [...staticPages, ...postPages];
}
