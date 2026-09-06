-- =============================================================================
-- TOXIC / PARRHESIA - SUPABASE POSTGRESQL SCHEMA & RLS MIGRATION
-- =============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. TABLE: tours (Tour Dates, Venues, and Tickets)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tours (
  id TEXT PRIMARY KEY DEFAULT ('evt_' || floor(extract(epoch from now()) * 1000)::text),
  date DATE NOT NULL,
  time TEXT NOT NULL DEFAULT '20:00',
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'SATIŞTA',
  ticket_url TEXT NOT NULL DEFAULT '',
  rsvp_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 2. TABLE: releases (Albums, EPs, Singles)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS releases (
  id TEXT PRIMARY KEY DEFAULT ('rel_' || floor(extract(epoch from now()) * 1000)::text),
  title TEXT NOT NULL,
  artist TEXT NOT NULL DEFAULT 'TOXIC',
  year TEXT NOT NULL,
  release_date TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'SINGLE', -- 'ALBUM' | 'EP' | 'SINGLE'
  cover_url TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'PUBLISHED', -- 'PUBLISHED' | 'DRAFT'
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 3. TABLE: tracks (Audio Tracks connected to Releases)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tracks (
    id TEXT PRIMARY KEY DEFAULT ('trk_' || floor(extract(epoch from now()) * 1000)::text),
    release_id BIGINT NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    duration TEXT NOT NULL DEFAULT '03:30',
    duration_sec INTEGER NOT NULL DEFAULT 210,
    audio_url TEXT NOT NULL,
    track_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tracks_release_id ON tracks(release_id);

-- -----------------------------------------------------------------------------
-- 4. TABLE: updates (Journal Entries, Studio Transmissions & News)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS updates (
  id TEXT PRIMARY KEY DEFAULT ('upd_' || floor(extract(epoch from now()) * 1000)::text),
  date TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'TRANSMISSION // JOURNAL',
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  meta TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'PUBLISHED', -- 'PUBLISHED' | 'DRAFT'
  featured BOOLEAN NOT NULL DEFAULT false,
  tracklist TEXT[] NOT NULL DEFAULT '{}',
  links JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 5. TABLE: products (Merchandise Store Catalog)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT ('prod_' || floor(extract(epoch from now()) * 1000)::text),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'T-SHIRTS' | 'HOODIES' | 'VINYL' | 'CASSETTES' | 'ACCESSORIES'
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT '€',
  stock_status TEXT NOT NULL DEFAULT 'IN_STOCK', -- 'IN_STOCK' | 'LOW_STOCK' | 'SOLD_OUT'
  stock_label TEXT NOT NULL DEFAULT 'STOKTA VAR',
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  default_size TEXT NOT NULL DEFAULT 'M',
  primary_image TEXT NOT NULL,
  secondary_image TEXT NOT NULL DEFAULT '',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  season TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  material TEXT NOT NULL DEFAULT '',
  size_guide TEXT NOT NULL DEFAULT '',
  shipping_info TEXT NOT NULL DEFAULT '',
  returns_info TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 6. TABLE: about_slides (Biography & About Slideshow Images / Zine Archive)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_slides (
  id TEXT PRIMARY KEY DEFAULT ('slide_' || floor(extract(epoch from now()) * 1000)::text),
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 1,
  slide_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 7. TABLE: media_items (Media Library for CMS)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_items (
  id TEXT PRIMARY KEY DEFAULT ('med_' || floor(extract(epoch from now()) * 1000)::text),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'IMAGE',
  size TEXT NOT NULL DEFAULT '',
  dimensions TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 8. TABLE: social_links (Header & Footer Social Platform Links)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS social_links (
  id TEXT PRIMARY KEY DEFAULT ('soc_' || floor(extract(epoch from now()) * 1000)::text),
  title TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  target_url TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  icon_url TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 9. TABLE: activity_logs (CMS Administrative Audit Trail)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY DEFAULT ('act_' || floor(extract(epoch from now()) * 1000)::text),
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  user_identifier TEXT NOT NULL DEFAULT 'ADMIN',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 10. TABLE: site_settings (Global Configuration, Bio Paragraphs & Footer Data)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  site_title TEXT NOT NULL DEFAULT 'toxic - the band',
  site_description TEXT NOT NULL DEFAULT '',
  artist_name TEXT NOT NULL DEFAULT 'TOXIC',
  hero_album_title TEXT NOT NULL DEFAULT 'MADE OF SIN',
  contact_email TEXT NOT NULL DEFAULT 'booking@toxic.com',
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  auto_publish_schedule BOOLEAN NOT NULL DEFAULT true,
  default_player_volume NUMERIC(3,2) NOT NULL DEFAULT 0.80,
  bio_paragraphs TEXT[] NOT NULL DEFAULT '{}',
  footer_line1 TEXT NOT NULL DEFAULT '© DEVIL''S GRIN RECORDS 2026',
  footer_line2 TEXT NOT NULL DEFAULT 'MADE OF SIN',
  footer_line4 TEXT NOT NULL DEFAULT '© 2026 Toxic',
  privacy_policy_url TEXT NOT NULL DEFAULT '#',
  terms_conditions_url TEXT NOT NULL DEFAULT '#',
  ai_usage_url TEXT NOT NULL DEFAULT '#',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- PUBLIC SELECT POLICIES (Allow anonymous visitors to view public content)
-- -----------------------------------------------------------------------------
CREATE POLICY "Public Read Access for Tours" ON tours
  FOR SELECT USING (visible = true OR auth.role() = 'authenticated');

CREATE POLICY "Public Read Access for Releases" ON releases
FOR SELECT USING (true);

CREATE POLICY "Public Read Access for Tracks" ON tracks
  FOR SELECT USING (true);

CREATE POLICY "Public Read Access for Updates" ON updates
FOR SELECT USING (true);

CREATE POLICY "Public Read Access for Products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public Read Access for About Slides" ON about_slides
  FOR SELECT USING (true);

CREATE POLICY "Public Read Access for Social Links" ON social_links
  FOR SELECT USING (true);

CREATE POLICY "Public Read Access for Site Settings" ON site_settings
  FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- ADMIN CMS POLICIES (Authenticated users can INSERT, UPDATE, DELETE)
-- -----------------------------------------------------------------------------
CREATE POLICY "Admin All Access for Tours" ON tours
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Releases" ON releases
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Tracks" ON tracks
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Updates" ON updates
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Products" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for About Slides" ON about_slides
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Media Items" ON media_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Social Links" ON social_links
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Activity Logs" ON activity_logs
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin All Access for Site Settings" ON site_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =============================================================================
-- STORAGE BUCKETS (Optional / Recommended for Media Uploads)
-- =============================================================================
-- Note: In Supabase, you can create a public bucket named 'media' in the Dashboard.
-- The following SQL registers the bucket and its public read policy if using storage extension.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access for Media Bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Admin Upload Access for Media Bucket" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

CREATE POLICY "Admin Delete Access for Media Bucket" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media');
