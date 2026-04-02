"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TiptapEditor } from "@/components/tiptap-editor";
import { ImageUpload } from "@/components/image-upload";
import type { Post } from "@/lib/types";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [published, setPublished] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          const post = data as Post;
          setTitle(post.title);
          setSlug(post.slug);
          setDescription(post.description ?? "");
          setAuthor(post.author);
          setFeaturedImage(post.featured_image ?? "");
          setPublished(post.published);
          setContent(post.content);
        }
      } catch {
        // Error loading post
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = getSupabaseClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("posts") as any)
        .update({
          title,
          slug,
          description: description || null,
          content,
          author,
          featured_image: featuredImage || null,
          published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        alert(`Error saving post: ${error.message}`);
        return;
      }

      router.push("/admin");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Post</h1>

      <div className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <ImageUpload value={featuredImage} onChange={setFeaturedImage} />

        <div className="flex items-center gap-2">
          <Switch
            id="published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="published">Published</Label>
        </div>

        <div className="grid gap-2">
          <Label>Content</Label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={saving || !title || !content}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
