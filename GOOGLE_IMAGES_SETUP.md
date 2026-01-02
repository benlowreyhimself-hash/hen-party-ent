# Google Custom Search API Setup for Photo Discovery

This guide will help you set up Google Custom Search API to enable intelligent photo discovery with Google Images fallback.

## Why This Matters

When accommodation booking URLs are broken or return no images, the system will automatically fall back to searching Google Images for property photos. This makes photo discovery much more reliable!

## Setup Steps

### 1. Enable Google Custom Search API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Library**
4. Search for "Custom Search API"
5. Click **Enable**

### 2. Get Your API Key

1. In Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the generated API key
4. (Recommended) Click **Restrict Key** and:
   - Under "API restrictions", select "Restrict key"
   - Choose "Custom Search API" from the dropdown
   - Save

### 3. Create a Programmable Search Engine (CSE)

1. Go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click **Add** or **Create a new search engine**
3. Configure your search engine:
   - **Sites to search**: Choose "Search the entire web"
   - **Name**: "Accommodation Image Search" (or any name)
   - Click **Create**
4. After creation:
   - Click **Customize** on your new search engine
   - Under "Image search", toggle **ON** 
   - Under "Search settings", toggle **ON** for "Search the entire web"
   - Copy your **Search engine ID (CX)** - it looks like: `a1b2c3d4e5f6g7h8i`

### 4. Add to Environment Variables

Add these two variables to your `.env.local`:

```bash
# Google Custom Search API (for photo discovery fallback)
GOOGLE_CUSTOM_SEARCH_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_CUSTOM_SEARCH_CX=a1b2c3d4e5f6g7h8i
```

## Usage Limits & Costs

- **Free tier**: 100 queries per day
- **Paid**: $5 per 1,000 queries (up to 10,000/day)
- For most use cases, the free tier is sufficient for enriching accommodations gradually

## How It Works

The photo discovery system now works in 2 tiers:

1. **Primary**: Scrapes images from booking URLs (Airbnb, Booking.com, etc.)
2. **Fallback**: If < 3 photos found, searches Google Images with query: `{property name} {location} holiday accommodation`

This ensures you always get high-quality property photos, even when booking URLs are broken!

## Testing

Once configured, run the photo enrichment on a property:

```bash
npm run accommodations:enrich-all
```

Check the logs - you should see:
```
[PhotoDiscoverer] Searching Google Images for: "Beau Nash House Bath holiday accommodation"
[PhotoDiscoverer] Found 10 images via Google Images
```

## Security Notes

⚠️ **Never commit your API keys to git!**
- The `.env.local` file is already gitignored
- Keep your API key secure
- Use API restrictions in Google Cloud Console
