export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  date: string;
  author: string;
  featured_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}
