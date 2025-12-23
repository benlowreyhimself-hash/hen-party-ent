-- Migration: Add sleeps field to houses table
-- Run this in Supabase Dashboard → SQL Editor

ALTER TABLE houses ADD COLUMN IF NOT EXISTS sleeps TEXT;

-- Verify column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'houses'
  AND column_name = 'sleeps';

