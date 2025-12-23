-- Migration: Add photos_stored_in_blob field
-- Run this in Supabase SQL Editor

ALTER TABLE houses ADD COLUMN IF NOT EXISTS photos_stored_in_blob BOOLEAN DEFAULT false;

-- Add comment
COMMENT ON COLUMN houses.photos_stored_in_blob IS 'Track if photos are stored in Vercel Blob Storage vs external URLs';

