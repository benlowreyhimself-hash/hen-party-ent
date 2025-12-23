# Fix SSL Certificate Error - Immediate Steps

## Problem
`https://henpartyentertainment.co.uk` shows SSL certificate error because:
- Domain is still pointing to **old WordPress hosting** (IPs: 198.185.159.145, 198.49.23.145)
- **NOT pointing to Vercel** (should be 76.76.21.21)
- Old WordPress site has invalid/expired SSL certificate

## Your New Site is Working
✅ **Your new Next.js site is live and secure at:**
- `https://hen-party-ent.vercel.app` (works perfectly with SSL)

## Fix Steps (Do This Now)

### Step 1: Add Domain to Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Click project: **hen-party-ent**
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `henpartyentertainment.co.uk`
6. Click **Add**

Vercel will show you DNS records to add.

### Step 2: Update DNS at Your Domain Registrar (5 minutes)

**Where did you buy the domain?** (Google Domains, Namecheap, GoDaddy, etc.)

Go to your domain registrar's DNS settings and **REPLACE** the current A records with:

**For apex domain (henpartyentertainment.co.uk):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: Auto (or 3600)
```

**For www (www.henpartyentertainment.co.uk):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto (or 3600)
```

**IMPORTANT:** 
- **DELETE** the old A records pointing to `198.185.159.145` and `198.49.23.145`
- **ADD** the new A record pointing to `76.76.21.21`

### Step 3: Wait for DNS Propagation (15 minutes - 48 hours)

- DNS changes take time to propagate globally
- Vercel will automatically provision SSL certificate once DNS is verified
- Check status in Vercel dashboard → Domains

### Step 4: Verify It's Working

After DNS propagates:
1. Visit `https://henpartyentertainment.co.uk`
2. Should load your new Next.js site (not WordPress)
3. SSL certificate will be valid (green padlock)

## Quick Test

While waiting for DNS:
- ✅ Your new site: `https://hen-party-ent.vercel.app` (works now)
- ❌ Old domain: `https://henpartyentertainment.co.uk` (will work after DNS update)

## Check DNS Status

Use these tools to verify DNS propagation:
- https://dnschecker.org - Check if DNS has propagated globally
- https://www.whatsmydns.net - Check DNS records

## Common Issues

### "Domain already in use"
- The domain might be connected to another Vercel project
- Check all your Vercel projects
- Or contact Vercel support

### "DNS not verified"
- Wait longer (can take up to 48 hours)
- Double-check DNS records are correct
- Ensure old records are deleted

### "SSL certificate pending"
- This is normal - Vercel provisions SSL automatically
- Usually takes 5-10 minutes after DNS verification
- Check Vercel dashboard → Domains for status

## Need Help?

1. **Check Vercel Dashboard**: Settings → Domains → See status
2. **Vercel Support**: https://vercel.com/support
3. **DNS Issues**: Contact your domain registrar support

## Summary

**Current Status:**
- ❌ Domain pointing to old WordPress (wrong IPs)
- ✅ New site working on Vercel
- ⏳ Need to update DNS to point to Vercel

**Action Required:**
1. Add domain in Vercel dashboard
2. Update DNS records at domain registrar
3. Wait for propagation
4. SSL will work automatically

