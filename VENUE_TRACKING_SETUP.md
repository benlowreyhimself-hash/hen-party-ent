# Venue Date Tracking & Relationship Management System

## Overview

This system tracks when Ben has visited each venue, manages affiliate relationships, and tracks owner approvals for listing accommodations.

## New Database Fields

Added to `houses` table:
- `ben_visited_dates` (TEXT[]) - Array of dates when Ben provided service (YYYY-MM-DD format)
- `has_affiliate_relationship` (BOOLEAN) - Track affiliate partnerships
- `owner_approved` (BOOLEAN) - Owner has approved listing
- `owner_contact_info` (TEXT) - Owner email/phone for approval tracking
- `owner_notes` (TEXT) - Notes about owner relationship/approval

## Setup Steps

### 1. Run Database Migration

```bash
npm run db:migrate-venue-fields
```

This adds the new columns to your `houses` table.

### 2. Re-import Accommodations with Dates

The import script now automatically extracts dates from:
- Sheet names (e.g., "2024-01-15", "Jan 2024", "15/01/2024")
- Date columns in sheets (if present)

```bash
npm run accommodations:import
```

This will:
- Extract dates from sheet names or date columns
- Group multiple visits to the same venue
- Store all visit dates in `ben_visited_dates` array

### 3. Public Accommodations Page

The new `/accommodations` page includes:
- **Filter by Region**: Click region buttons to filter
- **List/Grid View Toggle**: Switch between views
- **Visit Dates Display**: Shows latest visit date and total visit count
- **Affiliate Badge**: Shows "Affiliate" badge for partnerships
- **Owner Approval Indicator**: Green checkmark for approved listings

### 4. Admin Panel Updates

Update the admin panel to edit:
- Visit dates (add/remove dates)
- Affiliate relationship status
- Owner approval status
- Owner contact information
- Owner notes

## Features

### Date Extraction

The import script automatically extracts dates from:
1. **Sheet Names**: 
   - "2024-01-15" → 2024-01-15
   - "15/01/2024" → 2024-01-15
   - "Jan 2024" → 2024-01-01 (first of month)
   - "January 2024" → 2024-01-01

2. **Date Columns**: 
   - Looks for columns named "Date", "When", etc.
   - Parses date values from cells

3. **Multiple Visits**: 
   - If same venue appears in multiple sheets, all dates are collected
   - Stored as sorted array of unique dates

### Display Features

**Accommodation Cards Show:**
- Latest visit date: "Ben visited: 15 Jan 2024"
- Visit count: "(3 visits)" if multiple
- Affiliate badge if partnership exists
- Owner approval checkmark if approved

**Filtering:**
- Filter by region (All, South West, London, etc.)
- Shows count for each region
- Maintains filter state

**View Modes:**
- **Grid View**: Card layout (default)
- **List View**: Horizontal layout with more details

## Admin Management

### Editing Visit Dates

In admin panel, you can:
- Add new visit dates manually
- Remove incorrect dates
- See all dates for a venue

### Managing Relationships

- **Affiliate Tracking**: Mark venues with affiliate relationships
- **Owner Approval**: Track which owners have approved their listing
- **Contact Info**: Store owner email/phone for follow-up
- **Notes**: Add notes about relationship status, approval process, etc.

## Owner Approval Workflow

1. **Initial Listing**: Venue appears, not yet approved
2. **Contact Owner**: Use owner contact info to reach out
3. **Request Approval**: Ask owner to approve listing and links
4. **Mark Approved**: Set `owner_approved = true` once confirmed
5. **Track Notes**: Document approval process in `owner_notes`

## Affiliate Relationship Tracking

- Mark venues with `has_affiliate_relationship = true`
- Use to:
  - Prioritize affiliate venues in listings
  - Track commission/partnership status
  - Show affiliate badge to customers
  - Generate affiliate reports

## API Endpoints

- `GET /api/accommodations` - Get all published accommodations with dates
- `GET /api/accommodations/regions` - Get regions with counts

## Next Steps

1. ✅ Run migration: `npm run db:migrate-venue-fields`
2. ✅ Re-import accommodations: `npm run accommodations:import`
3. ✅ Update admin panel to edit new fields
4. ✅ Test public accommodations page
5. ✅ Contact owners for approval
6. ✅ Mark affiliate relationships

## Notes

- Dates are stored in YYYY-MM-DD format (ISO 8601)
- Multiple visits to same venue are automatically grouped
- Dates are sorted chronologically (newest first in display)
- Owner approval is separate from publishing status
- Affiliate relationships can be tracked independently

