# Photo Storage Setup Guide

## Current Situation

Your site currently uses WordPress-hosted images (`henpartyentertainment.co.uk/wp-content/uploads/`), which creates a dependency risk:
- ❌ If WordPress goes down, all images break
- ❌ No control over image availability
- ❌ No optimization control
- ❌ External dependency

## Recommended Solution: Vercel Blob Storage

**Why Vercel Blob?**
- ✅ Native integration with Vercel/Next.js
- ✅ Works seamlessly with Next.js Image component
- ✅ Global CDN for fast loading
- ✅ Reliable and always available
- ✅ Built-in optimization
- ✅ Free tier: 1GB storage, 1GB bandwidth/day
- ✅ Pro: $20/month for 100GB storage

## Setup Instructions

### Step 1: Enable Vercel Blob Storage

1. Go to your Vercel project dashboard
2. Navigate to **Storage** → **Create Database/Storage**
3. Select **Blob Storage**
4. Create a new blob store (name it `hen-party-images` or similar)
5. Copy the **Read/Write Token** (starts with `vercel_blob_rw_`)

### Step 2: Add Environment Variable

Add to your `.env.local`:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

**Important:** Also add this to your Vercel project settings:
- Go to **Settings** → **Environment Variables**
- Add `BLOB_READ_WRITE_TOKEN` with your token
- Apply to all environments (Production, Preview, Development)

### Step 3: Install Package (Already Done)

The `@vercel/blob` package has been installed. If you need to reinstall:

```bash
npm install @vercel/blob
```

### Step 4: Migrate Existing Images

**Option A: Automatic Migration (Recommended)**

1. Make sure you're authenticated in the admin panel
2. Navigate to: `https://your-site.com/api/admin/migrate-images`
3. Send a POST request (use Postman, curl, or browser extension)

Or use curl:
```bash
curl -X POST https://your-site.com/api/admin/migrate-images \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Option B: Manual Migration Script**

Create a script to migrate specific images:

```typescript
import { uploadImageFromUrl } from '@/lib/storage/blob';

// Migrate a single image
const newUrl = await uploadImageFromUrl(
  'https://henpartyentertainment.co.uk/wp-content/uploads/2020/04/image.jpg',
  'accommodations/my-house-image.jpg'
);
```

### Step 5: Update Image Components (Optional)

The new `OptimizedImage` component provides:
- Automatic fallback if image fails
- Better error handling
- Works with both blob URLs and WordPress URLs (during migration)

Replace `Image` with `OptimizedImage` in your components:

```tsx
import OptimizedImage from '@/components/OptimizedImage';

// Instead of:
<Image src={url} alt="..." />

// Use:
<OptimizedImage src={url} alt="..." />
```

## Migration Strategy

### Phase 1: Setup (Now)
- ✅ Vercel Blob Storage enabled
- ✅ Environment variable added
- ✅ Migration API route created

### Phase 2: Migrate Accommodation Images
- Run migration API to move all accommodation photos
- Images will be stored at: `accommodations/{slug}-{field}.jpg`
- Database URLs automatically updated

### Phase 3: Migrate Static Site Images
- Homepage hero image
- Photo gallery images
- About Ben page image
- Update hardcoded URLs in components

### Phase 4: Cleanup
- Remove WordPress URL fallbacks from `next.config.ts`
- All images now served from Vercel Blob

## Usage Examples

### Upload New Image

```typescript
import { uploadImage } from '@/lib/storage/blob';

// From file input
const file = event.target.files[0];
const url = await uploadImage(file, `accommodations/${slug}-main.jpg`);

// From URL
const url = await uploadImageFromUrl(
  'https://example.com/image.jpg',
  `accommodations/${slug}-main.jpg`
);
```

### Delete Image

```typescript
import { deleteImage } from '@/lib/storage/blob';

await deleteImage('https://xxx.public.blob.vercel-storage.com/image.jpg');
```

### Check if Image is Reliable

```typescript
import { isBlobUrl } from '@/lib/storage/blob';

if (isBlobUrl(imageUrl)) {
  // Image is stored in Vercel Blob (reliable)
} else {
  // Image is external (may fail)
}
```

## Cost Estimate

**Free Tier:**
- 1GB storage
- 1GB bandwidth/day (30GB/month)
- Perfect for starting out

**Pro Tier ($20/month):**
- 100GB storage
- Unlimited bandwidth
- Recommended for production with many images

**Your Usage:**
- ~871 accommodations × 4 images = ~3,500 images
- Average image size: ~200KB
- Total storage: ~700MB (fits in free tier!)
- Bandwidth: Depends on traffic

## Benefits

1. **Reliability**: Images always available, no WordPress dependency
2. **Performance**: Global CDN, fast loading worldwide
3. **Control**: Full control over image lifecycle
4. **Optimization**: Automatic Next.js Image optimization
5. **Scalability**: Easy to upgrade as you grow

## Troubleshooting

### Images not loading after migration
- Check `BLOB_READ_WRITE_TOKEN` is set correctly
- Verify blob storage is enabled in Vercel dashboard
- Check migration API logs for errors

### Migration fails for some images
- WordPress images may be temporarily unavailable
- Check image URLs are accessible
- Some images may need manual migration

### Storage quota exceeded
- Upgrade to Pro tier ($20/month)
- Or delete unused images
- Check usage in Vercel dashboard

## Next Steps

1. ✅ Enable Vercel Blob Storage in dashboard
2. ✅ Add `BLOB_READ_WRITE_TOKEN` to `.env.local` and Vercel
3. ✅ Run migration API to move accommodation images
4. ✅ Update static page images (homepage, photos page, etc.)
5. ✅ Test all images load correctly
6. ✅ Monitor storage usage in Vercel dashboard

## Alternative: Supabase Storage

If you prefer to use Supabase Storage (since you're already using Supabase):

**Pros:**
- Already integrated with your stack
- Good for small to medium usage

**Cons:**
- Free tier limited (1GB storage, 5GB bandwidth/month)
- Pro tier: $25/month (100GB storage, 200GB bandwidth)

**Setup:**
1. Enable Storage in Supabase dashboard
2. Create `images` bucket
3. Set bucket to public
4. Use Supabase Storage API instead of Vercel Blob

I recommend **Vercel Blob** for better Next.js integration and performance, but Supabase Storage is also a solid choice.

