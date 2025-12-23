# Admin & Accommodation Management System

## Overview

This system allows you to manage Hen Party AirBnB accommodations with:
- **Admin Interface**: Protected by Clerk authentication
- **Public SEO Pages**: Each accommodation gets its own public page
- **Region Grouping**: Automatically groups by UK postcode regions
- **Database**: Supabase PostgreSQL database

## Setup Instructions

### 1. Create Database Tables

Run the SQL schema in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `supabase/schema.sql`
3. Run the SQL to create the `houses` table and policies

### 2. Set Up Clerk Authentication

1. Go to https://dashboard.clerk.com
2. Create an application for "hen-party-ent"
3. Copy your API keys to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### 3. Access Admin Panel

1. Visit `/admin/houses` (you'll be redirected to sign in)
2. Sign in with Clerk
3. Start adding accommodations!

## Features

### Admin Features (`/admin/houses`)

- **List all houses**: View all accommodations in a table
- **Add new house**: Create new accommodation entries
- **Edit house**: Update existing accommodations
- **Publish/Unpublish**: Control visibility on public site
- **Feature houses**: Mark accommodations as featured

### Public Features

- **All Accommodations** (`/accommodations`): Browse all published houses
- **Individual Pages** (`/accommodations/[slug]`): SEO-optimized pages for each house
- **Region Pages** (`/regions/[region]`): Browse by UK region (auto-grouped by postcode)

## House Data Structure

Each house includes:
- **Basic Info**: Title, slug, location, postcode, address
- **Content**: Description, full sales content, features list
- **Images**: Main image + 3 additional photos
- **SEO**: Meta title and description
- **Links**: Booking URL, Google Maps URL
- **Status**: Published/Draft, Featured flag

## Region Auto-Detection

The system automatically detects UK regions from postcodes:
- BA, BS, GL → South West
- OX, RG, SL → South East
- CV, B → West Midlands
- etc.

See `lib/utils/postcode.ts` for full mapping.

## Public Pages Template

Each accommodation page includes:
1. **Hero Section**: Large image with title
2. **Location Information**: Postcode, address, region
3. **Photo Gallery**: Up to 3 photos
4. **Description**: Short description
5. **Sales Content**: Full hen party entertainment sales piece
6. **Features List**: Accommodation features
7. **Contact Section**: Phone, email with GTM tracking
8. **Booking Link**: Link to Airbnb/booking site
9. **Google Maps**: Location map link

## SEO Benefits

- Each house gets its own URL: `/accommodations/[slug]`
- Static generation for fast loading
- Custom meta titles and descriptions
- Region-based pages for location SEO
- All pages are public and indexable

## Next Steps

1. Run the database schema
2. Add Clerk keys
3. Start adding your first accommodation!

