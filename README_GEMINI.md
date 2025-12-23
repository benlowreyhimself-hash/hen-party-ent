# Gemini AI Property Enrichment

## Overview

This system uses Google's Gemini 3 API to automatically fetch and enrich property information for your accommodations database.

## Setup

### 1. Get Your Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Create a new API key (or use existing)
3. Copy your API key

### 2. Add to Environment Variables

Add to `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Add to Vercel (for production)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `GEMINI_API_KEY` with your key
3. Redeploy

## Features

### Individual Property Enrichment

1. Go to `/admin/houses`
2. Click "Enrich" next to any property
3. The AI will:
   - Research the property
   - Generate compelling description
   - Extract features
   - Write sales content
   - Create SEO meta description
   - Find booking URLs and Google Maps links

### Batch Enrichment

1. Go to `/admin/houses/enrich-all`
2. Select multiple properties
3. Click "Enrich X Properties"
4. All selected properties will be enriched automatically

## What Gets Enriched

- **Description**: 2-3 sentence compelling description
- **Features**: List of key features for hen parties
- **Sales Content**: 200-300 word sales piece
- **Meta Description**: SEO-optimized description
- **Address/Postcode**: Location details if found
- **Booking URLs**: Links to booking sites
- **Google Maps**: Location map links

## How It Works

1. You provide property name and location
2. Gemini AI researches the property
3. AI generates comprehensive content
4. Content is automatically saved to database
5. Property pages are updated with enriched data

## Tips

- **Start with basic info**: Add property name and location first
- **Review before publishing**: Check AI-generated content
- **Edit as needed**: You can always edit after enrichment
- **Batch process**: Use batch enrichment for multiple properties at once

## API Usage

The enrichment uses Gemini 2.0 Flash Experimental model, which is:
- Fast and efficient
- Great for content generation
- Cost-effective for batch operations

## Troubleshooting

### "GEMINI_API_KEY not found"
- Make sure the key is in `.env.local`
- Restart your dev server after adding
- Check for typos in the key

### "Failed to enrich property"
- Check your API key is valid
- Verify you have Gemini API access
- Check console for detailed error messages

