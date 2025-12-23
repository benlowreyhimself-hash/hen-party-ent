# Environment Variables Setup

This document lists all required environment variables for the email, SMS, and database features.

## Required Environment Variables

Add these to your `.env.local` file:

### Email (Resend)
```bash
# Get from https://resend.com
# Free tier: 3,000 emails/month
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### SMS (Twilio)
```bash
# Get from https://www.twilio.com
# Free trial: $15.50 credit
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+447747571426  # Your Twilio UK phone number (format: +44...)
```

### Database (Supabase)
```bash
# Already configured, but ensure these are present:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

## Important Security Notes

⚠️ **Resend API Key:** Saved in `.resend-api-key.txt` (gitignored)
- Add to `.env.local` as: `RESEND_API_KEY=re_SMmGJ95j_GCpP1bzZqkaP8y21HPs6ceDW`
- **DO NOT commit this to git**

⚠️ **Twilio Recovery Code:** Saved in `.twilio-recovery-code.txt` (gitignored)
- Keep this secure - use it to recover your Twilio account if needed
- **DO NOT commit this to git**

## Setup Instructions

### 1. Resend Setup ✅
**API Key:** `re_SMmGJ95j_GCpP1bzZqkaP8y21HPs6ceDW` (saved in `.resend-api-key.txt`)

**Action Required:**
1. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_SMmGJ95j_GCpP1bzZqkaP8y21HPs6ceDW
   ```

2. (Optional) Verify your domain at https://resend.com to use custom "from" address
   - Currently using `onboarding@resend.dev` for testing
   - Update `from` email in `lib/email/sender.ts` once domain is verified

### 2. Twilio Setup
1. Go to https://www.twilio.com
2. Sign up for a free trial (includes $15.50 credit)
3. Get your Account SID and Auth Token from the console
4. Purchase a UK phone number (or use trial number)
5. Add all three Twilio variables to `.env.local`

**Cost:** ~£0.04-0.05 per SMS in UK

### 3. Database Migration
After adding all environment variables, run:
```bash
npm run db:migrate
```

This will create the `form_submissions` table in your Supabase database.

## Testing

Once configured:
- Form submissions will be saved to database AND sent via email
- Template requests (SMS/Email) will be saved to database AND sent
- All submissions are stored in Supabase for backup/archive

## Fallback Behavior

- If Resend is not configured: Emails are logged to console
- If Twilio is not configured: SMS requests will throw an error (user should use email template instead)
- If database save fails: Email/SMS still sends (errors are logged but don't block)
