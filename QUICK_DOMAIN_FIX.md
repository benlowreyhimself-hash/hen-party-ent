# Quick Fix: SSL Certificate Error

## The Problem

You're seeing an SSL error because:
- `henpartyentertainment.co.uk` is still pointing to your **old WordPress site**
- Your **new Next.js site** is on Vercel at `hen-party-ent.vercel.app`
- The WordPress site's SSL certificate is invalid/expired

## Immediate Solution

### Option 1: Access Your New Site (Right Now)

Your new site is already live at:
```
https://hen-party-ent.vercel.app
```

This works immediately and has a valid SSL certificate.

### Option 2: Connect Custom Domain to Vercel (Recommended)

To use `henpartyentertainment.co.uk` for your new site:

#### Step 1: Add Domain in Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Click your project: **hen-party-ent**
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `henpartyentertainment.co.uk`
6. Click **Add**

Vercel will show you DNS records to add.

#### Step 2: Update DNS at Your Domain Registrar (5 minutes)

Go to where you bought the domain (e.g., Google Domains, Namecheap, GoDaddy) and add:

**For apex domain (henpartyentertainment.co.uk):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: Auto
```

**For www (www.henpartyentertainment.co.uk):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

#### Step 3: Wait for DNS Propagation (15 minutes - 48 hours)

- DNS changes take time to propagate
- Vercel will automatically provision SSL certificate once DNS is verified
- Check status in Vercel dashboard → Domains

#### Step 4: Update Environment Variable

Once domain is working, add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://henpartyentertainment.co.uk
```

**Also add to Vercel:**
1. Settings → Environment Variables
2. Add `NEXT_PUBLIC_SITE_URL` = `https://henpartyentertainment.co.uk`
3. Redeploy

## What Happens After Setup

✅ `henpartyentertainment.co.uk` → Points to your new Next.js site  
✅ SSL certificate → Automatically provided by Vercel (free)  
✅ Both www and non-www → Work automatically  
✅ Old WordPress site → No longer accessible via this domain  

## Need Help?

1. **Check DNS propagation**: https://dnschecker.org
2. **Vercel domain status**: Dashboard → Settings → Domains
3. **SSL certificate**: Automatically provisioned by Vercel (no action needed)

## Quick Checklist

- [ ] Add domain in Vercel dashboard
- [ ] Update DNS records at domain registrar
- [ ] Wait for DNS propagation (check status in Vercel)
- [ ] Update `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Test site at `https://henpartyentertainment.co.uk`

