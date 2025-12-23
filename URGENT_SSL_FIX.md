# URGENT: Fix SSL Certificate Error

## Current Problem

❌ **`https://henpartyentertainment.co.uk` is NOT secure** because:
- Domain is pointing to **old WordPress hosting** (IPs: 198.185.159.145, 198.49.23.145)
- **NOT connected to Vercel** yet
- Old WordPress site has invalid SSL certificate

✅ **Your new site IS working and secure:**
- `https://hen-party-ent.vercel.app` - Works perfectly!

## Solution: Connect Domain to Vercel (10 minutes)

### Step 1: Add Domain in Vercel (2 minutes)

1. **Go to**: https://vercel.com/dashboard
2. **Click**: Project **hen-party-ent**
3. **Go to**: **Settings** → **Domains** (left sidebar)
4. **Click**: **Add Domain** button
5. **Enter**: `henpartyentertainment.co.uk`
6. **Click**: **Add**

Vercel will show you DNS records to add.

### Step 2: Update DNS Records (5 minutes)

**Go to your domain registrar** (where you bought the domain):
- Google Domains: https://domains.google.com
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Or wherever you manage DNS

**DELETE old A records** pointing to:
- `198.185.159.145`
- `198.49.23.145`
- `198.185.159.144`

**ADD new DNS records:**

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

### Step 3: Wait for DNS Propagation (15 min - 48 hours)

- DNS changes take time to propagate
- Vercel will automatically provision SSL certificate
- Check status in Vercel dashboard → Domains

### Step 4: Verify It Works

After DNS propagates:
1. Visit `https://henpartyentertainment.co.uk`
2. Should see your new Next.js site (not WordPress)
3. SSL certificate will be valid ✅

## Quick Test Commands

Test if DNS has updated:
```bash
nslookup henpartyentertainment.co.uk
```

Should show: `76.76.21.21` (Vercel IP)

Test SSL certificate:
```bash
curl -I https://henpartyentertainment.co.uk
```

Should return HTTP 200 (not SSL error)

## Check DNS Propagation

Use these tools:
- https://dnschecker.org - Check global DNS propagation
- https://www.whatsmydns.net - Check DNS records

## Current Status

- ✅ New site working: `https://hen-party-ent.vercel.app`
- ❌ Custom domain: `https://henpartyentertainment.co.uk` (needs DNS update)
- ⏳ Waiting for: DNS update + SSL certificate provisioning

## Need Help?

1. **Vercel Dashboard**: Check domain status at Settings → Domains
2. **Vercel Support**: https://vercel.com/support
3. **Domain Registrar**: Contact support if you can't find DNS settings

## Important Notes

- **Old WordPress site will stop working** once DNS is updated (this is expected)
- **SSL certificate is automatic** - Vercel provisions it via Let's Encrypt
- **Both www and non-www work** - Configure both in DNS
- **Can take up to 48 hours** for full DNS propagation globally

