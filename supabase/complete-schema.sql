-- Complete Database Schema for Hen Party Entertainment
-- Run this entire file in Supabase SQL Editor to create all tables

-- ============================================
-- 1. CREATE HOUSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- Basic Information
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  postcode TEXT NOT NULL,
  region TEXT, -- Will be auto-calculated from postcode
  location TEXT NOT NULL, -- e.g., "Bath", "Cotswolds", "Stratford-upon-Avon"
  address TEXT,
  
  -- Raw & Verified Address Data
  raw_address TEXT, -- Original address from Google Sheets
  verified_address TEXT, -- Google-verified official address
  google_place_id TEXT, -- Google Places API ID
  
  -- Description & Content
  description TEXT,
  content TEXT, -- Full sales content about hen party services
  features TEXT[], -- Array of features
  sleeps TEXT, -- Number of people the property sleeps (e.g., "8", "10-12", "12+")
  
  -- Images
  image_url TEXT, -- Main image
  photo_1_url TEXT,
  photo_2_url TEXT,
  photo_3_url TEXT,
  
  -- Booking Links
  website_url TEXT, -- Official property website
  airbnb_url TEXT,
  booking_com_url TEXT,
  vrbo_url TEXT,
  other_booking_url TEXT, -- JSON array of other booking platforms
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Enrichment Status
  address_verified BOOLEAN DEFAULT false,
  booking_links_found BOOLEAN DEFAULT false,
  photos_extracted BOOLEAN DEFAULT false,
  photos_stored_in_blob BOOLEAN DEFAULT false, -- Track if photos are in Blob vs external URLs
  content_generated BOOLEAN DEFAULT false,
  enrichment_complete BOOLEAN DEFAULT false,
  
  -- Links
  google_maps_url TEXT,
  
  -- Venue History & Relationships (NEW)
  ben_visited_dates TEXT[], -- Array of dates when Ben provided service (YYYY-MM-DD format)
  has_affiliate_relationship BOOLEAN DEFAULT false, -- Track affiliate partnerships
  owner_approved BOOLEAN DEFAULT false, -- Owner has approved listing
  owner_contact_info TEXT, -- Owner email/phone for approval tracking
  owner_notes TEXT -- Notes about owner relationship/approval
);

-- ============================================
-- 2. CREATE FORM SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Booking Details
  relation TEXT,
  occasion TEXT,
  region TEXT,
  group_size TEXT,
  duration TEXT,
  start_time TEXT,
  event_date TEXT,
  venue_type TEXT,
  full_address TEXT,
  message TEXT,
  
  -- Metadata
  source TEXT, -- 'form', 'email', 'sms'
  method TEXT, -- 'form_submission', 'template_request'
  enquiry_date TEXT
);

-- ============================================
-- 3. CREATE INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_houses_slug ON houses(slug);
CREATE INDEX IF NOT EXISTS idx_houses_postcode ON houses(postcode);
CREATE INDEX IF NOT EXISTS idx_houses_region ON houses(region);
CREATE INDEX IF NOT EXISTS idx_houses_published ON houses(is_published);
CREATE INDEX IF NOT EXISTS idx_houses_enrichment ON houses(enrichment_complete);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_source ON form_submissions(source);

-- ============================================
-- 4. CREATE UPDATE TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. CREATE TRIGGER FOR HOUSES TABLE
-- ============================================
DROP TRIGGER IF EXISTS update_houses_updated_at ON houses;
CREATE TRIGGER update_houses_updated_at
  BEFORE UPDATE ON houses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. CREATE RLS POLICIES FOR HOUSES
-- ============================================
-- Public can view published houses
DROP POLICY IF EXISTS "Public can view published houses" ON houses;
CREATE POLICY "Public can view published houses"
  ON houses
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Admins can insert houses
DROP POLICY IF EXISTS "Admins can insert houses" ON houses;
CREATE POLICY "Admins can insert houses"
  ON houses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admins can update houses
DROP POLICY IF EXISTS "Admins can update houses" ON houses;
CREATE POLICY "Admins can update houses"
  ON houses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can delete houses
DROP POLICY IF EXISTS "Admins can delete houses" ON houses;
CREATE POLICY "Admins can delete houses"
  ON houses
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 8. CREATE RLS POLICIES FOR FORM SUBMISSIONS
-- ============================================
-- Public can insert form submissions
DROP POLICY IF EXISTS "Public can insert form submissions" ON form_submissions;
CREATE POLICY "Public can insert form submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can view form submissions
DROP POLICY IF EXISTS "Admins can view form submissions" ON form_submissions;
CREATE POLICY "Admins can view form submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- DONE! ✅
-- ============================================
-- After running this:
-- 1. Go to Table Editor to verify tables exist
-- 2. Go to Settings → API → Refresh Schema Cache
-- 3. Your 871 imported accommodations should now be visible

