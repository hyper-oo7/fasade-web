-- Ritual photos bucket (private)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'ritual-photos',
  'ritual-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png']
)
on conflict (id) do nothing;

create policy "Users upload own ritual photos"
  on storage.objects for insert
  with check (
    bucket_id = 'ritual-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
    and public.is_verified_member(auth.uid())
  );

create policy "Users read own ritual photos"
  on storage.objects for select
  using (
    bucket_id = 'ritual-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users update own ritual photos"
  on storage.objects for update
  using (
    bucket_id = 'ritual-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
