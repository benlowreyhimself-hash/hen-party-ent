-- Migration: Add venue history and relationship tracking fields
-- Run this in Supabase Dashboard → SQL Editor

ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[];
ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS raw_address TEXT;

-- Verify columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'houses'
  AND column_name IN ('ben_visited_dates', 'has_affiliate_relationship', 'owner_approved', 'owner_contact_info', 'owner_notes')
ORDER BY column_name;

