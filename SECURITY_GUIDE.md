# Security Guide for Database Connections

## Recommended: Connection Pooling (Most Secure & Reliable)

### Why Connection Pooling?

1. **Better for Serverless**: Next.js API routes run in serverless environments where connection pooling handles concurrent requests better
2. **Connection Limits**: Prevents hitting PostgreSQL connection limits
3. **Security**: Still uses SSL/TLS encryption, same security as direct connection
4. **Performance**: Reuses connections efficiently

### Setup Steps

1. Go to **Supabase Dashboard** → **Settings** → **Database**
2. Scroll to **Connection string**
3. Select **Connection pooling** tab
4. Choose **Session mode** (recommended for migrations)
5. Copy the connection string
6. Add to `.env.local`:

```bash
DATABASE_POOLER_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### Security Features

✅ **SSL/TLS Encryption**: All connections are encrypted  
✅ **Environment Variables**: Never commit `.env.local` (already in `.gitignore`)  
✅ **Row Level Security**: Database policies protect data  
✅ **Service Role Key**: Only used server-side, never exposed to client  

## Current Architecture

### For Migrations (One-time Setup)
- Uses: Direct PostgreSQL connection via Drizzle ORM
- Security: SSL required, password in `.env.local`
- When: Only during `npm run db:migrate`

### For Application (All Operations)
- Uses: Supabase REST API (via `@supabase/supabase-js`)
- Security: API keys, Row Level Security policies
- When: All admin panel operations, public pages
- **No direct database connection** - this is the most secure approach!

## Best Practices

1. ✅ **Use Connection Pooling** for migrations (if available)
2. ✅ **Use Supabase REST API** for all app operations (already set up)
3. ✅ **Never expose** `SUPABASE_SERVICE_ROLE_KEY` to client
4. ✅ **Keep** `.env.local` in `.gitignore` (already done)
5. ✅ **Use RLS policies** to protect data (already configured)

## Connection String Format

### Connection Pooling (Recommended)
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### Direct Connection (Alternative)
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
```

## What Gets Exposed?

### ✅ Safe to Expose (Client-side)
- `NEXT_PUBLIC_SUPABASE_URL` - Public API endpoint
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public read-only key (protected by RLS)

### ❌ Never Expose (Server-side only)
- `SUPABASE_SERVICE_ROLE_KEY` - Full database access
- `DATABASE_URL` / `DATABASE_POOLER_URL` - Direct database connection
- `CLERK_SECRET_KEY` - Authentication secrets
- `GEMINI_API_KEY` - API keys

## Summary

**For your setup:**
1. Get the **Connection Pooling** URL from Supabase Dashboard
2. Add it as `DATABASE_POOLER_URL` in `.env.local`
3. Run `npm run db:migrate` (one-time setup)
4. All app operations use Supabase REST API (already secure ✅)

This gives you the best security and performance!

