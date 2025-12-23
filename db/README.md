# Database Setup with Drizzle

## Current Status

✅ **Drizzle ORM is configured** and ready to use
✅ **Schema defined** in `db/schema.ts`
✅ **Migration script** ready in `db/migrate.ts`

## To Create the Table

You have two options:

### Option 1: Use Drizzle (Recommended)

1. **Get the correct database connection string:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Settings** → **Database**
   - Scroll to **Connection string**
   - Select **URI** tab
   - Copy the full connection string

2. **Add to `.env.local`:**
   ```bash
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require
   ```

3. **Run migration:**
   ```bash
   npm run db:migrate
   ```

### Option 2: Manual SQL (Faster)

1. Go to Supabase Dashboard → **SQL Editor**
2. Copy contents of `supabase/schema.sql`
3. Paste and click **Run**

## Check Status

```bash
npm run db:check
```

This will tell you if the table exists.

## Why Direct Connection Might Fail

Supabase uses connection pooling and may require:
- Specific hostname format (varies by region)
- Connection pooler URL (port 6543) instead of direct (port 5432)
- Network/firewall configuration

The **manual SQL approach (Option 2)** is the most reliable and takes only 30 seconds.

## After Table is Created

Once the table exists, you can:
- Use the admin panel at `/admin/houses`
- Add properties via the UI
- Use Gemini AI enrichment
- All operations will work via Supabase REST API

