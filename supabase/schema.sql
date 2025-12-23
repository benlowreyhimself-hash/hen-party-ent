-- Create houses table for Hen Party accommodations
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
  
  -- Description & Content
  description TEXT,
  content TEXT, -- Full sales content about hen party services
  features TEXT[], -- Array of features
  
  -- Images
  image_url TEXT, -- Main image
  photo_1_url TEXT,
  photo_2_url TEXT,
  photo_3_url TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Links
  booking_url TEXT, -- Link to Airbnb/booking site
  google_maps_url TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_houses_slug ON houses(slug);
CREATE INDEX IF NOT EXISTS idx_houses_postcode ON houses(postcode);
CREATE INDEX IF NOT EXISTS idx_houses_region ON houses(region);
CREATE INDEX IF NOT EXISTS idx_houses_published ON houses(is_published);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_houses_updated_at
  BEFORE UPDATE ON houses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published houses
CREATE POLICY "Public can view published houses"
  ON houses
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Policy: Only authenticated users (admins) can insert
CREATE POLICY "Admins can insert houses"
  ON houses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can update
CREATE POLICY "Admins can update houses"
  ON houses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can delete
CREATE POLICY "Admins can delete houses"
  ON houses
  FOR DELETE
  TO authenticated
  USING (true);

