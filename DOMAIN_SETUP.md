# Custom Domain Setup Guide

## Current Situation

- **Old WordPress Site**: `henpartyentertainment.co.uk` (showing SSL error)
- **New Next.js Site**: `hen-party-ent.vercel.app` (working on Vercel)

## Solution: Connect Custom Domain to Vercel

To use `henpartyentertainment.co.uk` for your new Next.js site, you need to:

### Step 1: Add Domain in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `hen-party-ent`
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `henpartyentertainment.co.uk`
6. Click **Add**

### Step 2: Configure DNS Records

Vercel will show you the DNS records to add. You need to add these to your domain registrar (where you bought the domain):

**Option A: Apex Domain (henpartyentertainment.co.uk)**

Add an A record:
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: Auto (or 3600)
```

**Option B: CNAME (Recommended for www)**

Add a CNAME record:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto (or 3600)
```

**For both apex and www (Recommended):**

1. Add A record for apex domain:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

2. Add CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 3: Update Environment Variable

Once the domain is connected, update your `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://henpartyentertainment.co.uk
```

**Also add this to Vercel Environment Variables:**
1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://henpartyentertainment.co.uk`
   - **Environment**: Production, Preview, Development (all)
3. **Redeploy** your site

### Step 4: Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Vercel will automatically provision SSL certificate once DNS is verified
- You can check status in Vercel dashboard → Domains

### Step 5: Verify SSL Certificate

Once DNS propagates:
1. Vercel automatically provisions SSL certificate (Let's Encrypt)
2. Your site will be accessible at `https://henpartyentertainment.co.uk`
3. SSL certificate will be valid and secure

## Quick Access (Temporary)

While setting up the custom domain, you can access your site at:
- **Vercel URL**: `https://hen-party-ent.vercel.app`
- This works immediately and has SSL

## Troubleshooting

### SSL Certificate Error (NET::ERR_CERT_COMMON_NAME_INVALID)

This happens when:
- DNS hasn't propagated yet
- Domain isn't properly connected to Vercel
- Old WordPress site is still active

**Solution:**
1. Verify DNS records are correct
2. Wait 24-48 hours for propagation
3. Check Vercel dashboard → Domains for status

### Domain Not Resolving

1. Check DNS records are correct
2. Use [DNS Checker](https://dnschecker.org) to verify propagation
3. Ensure domain registrar allows A/CNAME records

### Vercel Shows "Invalid Configuration"

1. Double-check DNS records match Vercel's requirements
2. Ensure domain is not pointing to old WordPress hosting
3. Remove old DNS records pointing to WordPress

## Important Notes

1. **Old WordPress Site**: Once DNS is updated, `henpartyentertainment.co.uk` will point to your new Next.js site, not WordPress
2. **SSL Certificate**: Vercel automatically provides free SSL certificates via Let's Encrypt
3. **Both www and non-www**: Vercel can handle both - configure both in DNS
4. **Redirects**: Vercel can automatically redirect www to non-www (or vice versa)

## Next Steps After Domain Setup

1. ✅ Domain connected to Vercel
2. ✅ DNS records configured
3. ✅ SSL certificate provisioned (automatic)
4. ✅ Update `NEXT_PUBLIC_SITE_URL` environment variable
5. ✅ Redeploy site
6. ✅ Test site at `https://henpartyentertainment.co.uk`

