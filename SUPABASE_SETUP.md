# Supabase Setup for Hen Party Entertainment

## Database Password
**Password**: `VGms5gPefJbDjT`

⚠️ **Important**: This password is used when creating the Supabase project. Once the project is created, you'll use API keys (not this password) in your `.env.local` file.

## Steps to Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: `hen-party-ent`
   - **Database Password**: `VGms5gPefJbDjT` (use the password above)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 1-2 minutes for project to initialize

## Get API Keys

After project is created:

1. Go to **Settings** → **API**
2. Copy these values to `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

## Example .env.local

```bash
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Security Note

- The database password is only used during project creation
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep the service_role key secret - it has admin access

