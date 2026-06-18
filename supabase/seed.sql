-- Seed badges and atelier content (run after migration)
insert into public.badges (slug, label, icon) values
  ('clarity', 'CLARITY', 'diamond'),
  ('flow', 'FLOW', 'swirl'),
  ('cadence', 'CADENCE', 'shield'),
  ('genesis', 'GENESIS', 'plant')
on conflict (slug) do nothing;

insert into public.atelier_items (title, author_name, image_url, tags, sort_order) values
  ('The 5-Step Decompress', 'Sienna Cole', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&fit=crop', array['#SkinHealth', '#EveningRitual'], 1),
  ('Internal Radiance Tea', 'Elara Voss', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&fit=crop', array['#Glow', '#EveningRitual'], 2),
  ('The Weightless Base', 'Mara Lin', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&fit=crop', array['#Glow'], 3),
  ('Analyzing Glow Data', 'Façade Lab', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&fit=crop', array['#SkinHealth'], 4),
  ('Gua Sha Sculpting', 'Vivian Hart', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&fit=crop', array['#EveningRitual'], 5);
