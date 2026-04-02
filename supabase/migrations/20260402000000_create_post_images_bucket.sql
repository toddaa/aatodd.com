-- Create a public storage bucket for post images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-images',
  'post-images',
  true,
  10485760, -- 10MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Allow authenticated users to upload files
create policy "Authenticated users can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images');

-- Allow authenticated users to update their uploads
create policy "Authenticated users can update images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images');

-- Allow authenticated users to delete images
create policy "Authenticated users can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images');

-- Allow public read access (bucket is public)
create policy "Anyone can view post images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'post-images');
