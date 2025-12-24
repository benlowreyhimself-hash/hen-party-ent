-- Run this in Supabase Dashboard -> SQL Editor
-- It safely adds any missing columns required for enrichment

-- Core Content Fields
ALTER TABLE houses ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS features TEXT[]; -- Array of strings
ALTER TABLE houses ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS sleeps TEXT;

-- Images
ALTER TABLE houses ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS photo_1_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS photo_2_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS photo_3_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS photos_extracted BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS photos_stored_in_blob BOOLEAN DEFAULT false;

-- Booking Links & Verification
ALTER TABLE houses ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS airbnb_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS booking_com_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS vrbo_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS other_booking_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS google_maps_url TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS address_verified BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS booking_links_found BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS verified_address TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS raw_address TEXT;

-- Process Flags
ALTER TABLE houses ADD COLUMN IF NOT EXISTS content_generated BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS enrichment_complete BOOLEAN DEFAULT false;

-- Venue History & Business Logic
ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[];
ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT;

-- Re-apply RLS policies just in case (Safe to run multiple times)
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'houses' AND policyname = 'Public Read Access'
    ) THEN
        CREATE POLICY "Public Read Access" ON houses FOR SELECT USING (true);
    END IF;
END $$;
