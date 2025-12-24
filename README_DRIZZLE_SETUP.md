# Drizzle ORM Setup for Supabase

## Quick Setup (Recommended: Connection Pooling)

### Step 1: Get Connection Pooling URL (Most Secure)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **hen-party-ent**
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string**
5. Select **Connection pooling** tab
6. Choose **Session mode** (recommended)
7. Copy the connection string

**Format:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### Step 2: Add to .env.local

Add this line to your `.env.local`:

```bash
# Connection Pooling (Recommended - more secure and reliable)
DATABASE_POOLER_URL=postgresql://postgres.xirtgqglzsghphhihrcr:[REDACTED]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?sslmode=require
```

**Note**: Replace with your actual connection pooling URL from Step 1.

### Step 3: Run Migration

```bash
npm run db:migrate
```

This will create the `houses` table using Drizzle's schema definition.

## Why Connection Pooling?

✅ **More Secure**: Handles concurrent connections better  
✅ **Serverless-Friendly**: Works great with Next.js API routes  
✅ **Same Security**: Still uses SSL/TLS encryption  
✅ **Better Performance**: Reuses connections efficiently  

## Alternative: Direct Connection

If connection pooling is not available, you can use direct connection:

1. In Supabase Dashboard → **Settings** → **Database**
2. Select **URI** tab (direct connection)
3. Copy the connection string
4. Add to `.env.local` as `DATABASE_URL=...`

## Alternative: Manual SQL Setup

If you prefer to run SQL manually (fastest option):

1. Go to Supabase Dashboard → **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and click **Run**

Takes only 30 seconds!

## Check Database Status

```bash
npm run db:check
```

This will verify if the `houses` table exists.

## Security Notes

- ✅ Connection strings are stored in `.env.local` (not committed to git)
- ✅ All connections use SSL/TLS encryption
- ✅ Application uses Supabase REST API (no direct DB access)
- ✅ Row Level Security (RLS) policies protect data

See `SECURITY_GUIDE.md` for complete security information.

## Files

- `db/schema.ts` - Drizzle schema definition
- `drizzle.config.ts` - Drizzle configuration
- `db/migrate.ts` - Migration script
- `supabase/schema.sql` - SQL schema (for manual setup)
- `db/setup-check.ts` - Script to check if table exists
