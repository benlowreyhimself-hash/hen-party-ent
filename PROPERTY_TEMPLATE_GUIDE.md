# Property Template Layout Guide

## Overview

Each property gets its own SEO-optimized page at `/accommodations/[slug]` with the following structure:

## Page Structure

### 1. Hero Section
- **Large hero image** (full width, 400px height)
- **Purple overlay** (60% opacity)
- **Title** (large, centered, white text)
- **Location** (subtitle, white text)

### 2. Location Information Card
- **Location**: City/town name
- **Postcode**: UK postcode
- **Address**: Full address (if available)
- **Region**: Auto-detected from postcode (e.g., "South West", "London")

### 3. Photo Gallery
- **Grid layout**: 3 columns on desktop, responsive
- **Up to 3 photos** displayed
- **Main image** + photo_1, photo_2, photo_3
- **300px height** per image
- **Rounded corners** with overflow hidden

### 4. Description Section
- **Short description** (2-3 sentences)
- **Large, readable text** (text-lg)
- **Relaxed line spacing**

### 5. Sales Content Section
- **Heading**: "Hen Party Life Drawing Entertainment"
- **Full sales piece** (200-300 words)
- **Prose styling** for readability
- **Whitespace preserved** (pre-line formatting)

### 6. Features List
- **Heading**: "Accommodation Features"
- **Checkmark icons** (✓) in primary color
- **Bullet list** of features
- **One feature per line**

### 7. Booking & Contact Section
- **Purple background** (primary/10 opacity)
- **Border** in primary color
- **Heading**: "Book Your Hen Party Entertainment"
- **Intro text** about booking
- **Contact information**:
  - Phone: 07747571426 (with GTM tracking)
  - Email: ben@henpartyentertainment.co.uk (with GTM tracking)
- **Booking button** (if booking_url provided)
  - Links to Airbnb/booking site
  - Opens in new tab

### 8. Google Maps Section
- **Heading**: "Location Map"
- **Link to Google Maps** (if google_maps_url provided)
- **Opens in new tab**

### 9. Navigation
- **Back link**: "← View All Accommodations"
- **Centered** at bottom

## SEO Features

- **Custom meta title**: Uses `meta_title` or generates from property name
- **Custom meta description**: Uses `meta_description` or generates from description
- **Static generation**: All pages pre-rendered for fast loading
- **Structured URLs**: `/accommodations/[slug]` format
- **Semantic HTML**: Proper headings, sections, etc.

## Example URL Structure

```
/accommodations/church-farm-barn-cotswolds
/accommodations/forest-holiday-dean
/accommodations/cotswold-manor-estate
```

## Data Fields Used

| Field | Purpose | Required |
|-------|---------|----------|
| `title` | Page title, hero heading | ✅ Yes |
| `slug` | URL slug | ✅ Yes |
| `location` | City/town name | ✅ Yes |
| `postcode` | UK postcode | ✅ Yes |
| `address` | Full address | ❌ Optional |
| `region` | Auto-detected from postcode | Auto |
| `description` | Short description | ❌ Optional |
| `content` | Sales content | ❌ Optional |
| `features` | Array of features | ❌ Optional |
| `image_url` | Main hero image | ❌ Optional |
| `photo_1_url` | Gallery photo 1 | ❌ Optional |
| `photo_2_url` | Gallery photo 2 | ❌ Optional |
| `photo_3_url` | Gallery photo 3 | ❌ Optional |
| `meta_title` | SEO title | ❌ Optional |
| `meta_description` | SEO description | ❌ Optional |
| `booking_url` | Link to booking site | ❌ Optional |
| `google_maps_url` | Google Maps link | ❌ Optional |

## Gemini AI Enrichment

When you use the "Enrich" feature, Gemini AI will automatically populate:
- ✅ Description
- ✅ Features list
- ✅ Sales content
- ✅ Meta description
- ✅ Address/postcode (if found)
- ✅ Booking URLs (if found)
- ✅ Google Maps links (if found)

## Styling

- **Primary color**: Purple (#c87cc4)
- **Background**: White
- **Text**: Dark gray/black
- **Cards**: White with border
- **Spacing**: Generous padding and margins
- **Responsive**: Mobile-first design

## Example Complete Page

```
/accommodations/church-farm-barn-cotswolds
├── Hero (image + title)
├── Location Info Card
├── Photo Gallery (3 photos)
├── Description
├── Sales Content
├── Features List
├── Booking & Contact Section
├── Google Maps Link
└── Back Navigation
```

## Customization

You can customize the template by editing:
- `app/accommodations/[slug]/page.tsx` - Main template
- `app/globals.css` - Colors and styling
- `components/ContactLink.tsx` - Contact button styling

