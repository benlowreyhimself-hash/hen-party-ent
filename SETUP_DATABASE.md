# Database Setup Instructions

## Step 1: Create the Houses Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **hen-party-ent**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire contents of `supabase/schema.sql`
6. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:
- The `houses` table
- Indexes for performance
- Row Level Security (RLS) policies
- Auto-update triggers

## Step 2: Verify Table Creation

1. Go to **Table Editor** in the left sidebar
2. You should see the `houses` table
3. Click on it to view the structure

## Step 3: Test the Admin Panel

1. Make sure your Clerk keys are in `.env.local`
2. Visit `/admin/houses` on your site
3. You should be able to sign in and start adding houses!

## Troubleshooting

### "Could not find the table 'public.houses'"
- Make sure you ran the SQL schema
- Check that you're in the correct Supabase project
- Verify the table exists in Table Editor

### Clerk Authentication Errors
- Make sure both Clerk keys are complete (not truncated)
- Check that keys start with `pk_test_` and `sk_test_`
- Verify keys are in `.env.local` file

