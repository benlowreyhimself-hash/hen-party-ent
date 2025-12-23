# Database Migration Required

## Issue
The Drizzle fallback queries are failing because the database schema doesn't include the new venue tracking columns yet.

## Solution: Run the Migration

Run this command to add the missing columns:

```bash
npm run db:migrate-venue-fields
```

This will add:
- `ben_visited_dates` (TEXT[])
- `has_affiliate_relationship` (BOOLEAN)
- `owner_approved` (BOOLEAN)
- `owner_contact_info` (TEXT)
- `owner_notes` (TEXT)

## Alternative: Manual SQL

If the script doesn't work, run this SQL in Supabase Dashboard → SQL Editor:

```sql
ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[];
ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT;
```

## After Migration

Once the migration is complete:
1. The Drizzle fallback queries will work correctly
2. The admin edit page will be able to save venue tracking fields
3. The public accommodation pages will display visit dates and relationship info

