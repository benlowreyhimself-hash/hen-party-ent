# Create Tables in Supabase - Quick Fix

## The Problem
Supabase is showing "No tables in schema" because the tables haven't been created yet in your database.

## Quick Solution (2 minutes)

### Option 1: Use SQL Editor (Recommended - Fastest)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project: **Hen Party Ent** (or whatever it's called)
   - Project ID should be: `xirtgqglzsghphhihrcr` (from your URL)

2. **Open SQL Editor:**
   - Click **SQL Editor** in the left sidebar
   - Click **New Query** button

3. **Run the Complete Schema:**
   - Copy the entire contents of `supabase/schema.sql` file
   - Paste into the SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)

4. **Verify Tables Created:**
   - Go to **Table Editor** in the left sidebar
   - You should now see:
     - `houses` table
     - `form_submissions` table

### Option 2: Use Migration Script

Run this command in your terminal:

```bash
npm run db:migrate
```

This will create both tables automatically.

## After Creating Tables

1. **Add the Missing Venue Tracking Columns:**
   - Go to SQL Editor again
   - Run the migration from `supabase/migrate-venue-fields.sql`:
   
   ```sql
   ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[];
   ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false;
   ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false;
   ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT;
   ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT;
   ```

2. **Refresh Schema Cache:**
   - Go to **Settings** → **API**
   - Click **Refresh Schema Cache** or **Reload Schema**
   - Wait 30 seconds

3. **Verify:**
   - Go to **Table Editor**
   - Click on `houses` table
   - You should see all columns including the new venue tracking fields

## Why This Happened

The tables were never created in Supabase. The code expects them to exist, but they need to be created first using the SQL schema file.

## Next Steps After Tables Are Created

1. Your 871 imported accommodations should now be visible
2. You can use the admin panel at `/admin/houses`
3. All features will work properly

