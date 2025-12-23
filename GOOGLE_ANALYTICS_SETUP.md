# Google Analytics 4 Integration Guide

## Overview

Your site now has comprehensive Google Analytics 4 (GA4) integration that tracks:
- Page views
- Outbound clicks (accommodation booking links)
- Contact interactions (phone, email, forms)
- Accommodation page views
- Filter usage (region, view mode)
- All existing GTM events

## Setup Instructions

### Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: "Hen Party Entertainment"
5. Select timezone and currency
6. Click **Next**
7. Select **Business size** and **How you intend to use Google Analytics**
8. Click **Create**

### Step 2: Get Measurement ID

1. In your new GA4 property, go to **Admin** → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter:
   - Website URL: `https://henpartyentertainment.co.uk` (or your domain)
   - Stream name: "Hen Party Entertainment Website"
4. Click **Create stream**
5. Copy the **Measurement ID** (starts with `G-`)

### Step 3: Add Environment Variable

Add to `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Also add to Vercel:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
3. Apply to: Production, Preview, Development
4. Redeploy your site

### Step 4: Verify Installation

1. Visit your site
2. Open browser DevTools → **Network** tab
3. Filter by "google-analytics" or "gtag"
4. You should see requests to `https://www.google-analytics.com/g/collect`
5. Check **Console** tab: `window.gtag` should be defined

## Tracked Events

### Contact Events
- `phone_click` - Phone number clicked
- `email_click` - Email address clicked
- `form_submission` - Contact form submitted
- `template_request` - Booking template requested

### Accommodation Events
- `accommodation_view` - Accommodation page viewed
- `outbound_click` - Booking link clicked (Airbnb, Booking.com, VRBO, etc.)
- `accommodation_filter` - Region or view mode filter used

### Engagement Events
- `button_click` - Button clicked
- `page_view` - Page viewed (automatic)

### Conversion Events
- `conversion` - Google Ads conversion (existing)

## Outbound Link Tracking

All accommodation booking links are automatically tracked:
- **Airbnb links** → Tracked as `outbound_click` with `link_type: 'airbnb'`
- **Booking.com links** → Tracked as `outbound_click` with `link_type: 'booking_com'`
- **VRBO links** → Tracked as `outbound_click` with `link_type: 'vrbo'`
- **Property websites** → Tracked as `outbound_click` with `link_type: 'website'`
- **Google Maps links** → Tracked as `outbound_click` with `link_type: 'other'`

Each event includes:
- `accommodation_name` - Name of the accommodation
- `link_url` - Full URL clicked
- `link_type` - Type of booking platform

## Viewing Reports

### Option 1: Admin Dashboard

1. Go to `/admin/analytics`
2. Click **Open Google Analytics** button
3. View reports directly in GA4

### Option 2: Direct Access

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. Navigate to **Reports** → **Engagement** → **Events**

### Key Reports to Check

**Accommodation Performance:**
- **Reports** → **Engagement** → **Events**
- Filter by `accommodation_view` to see which accommodations are viewed most
- Filter by `outbound_click` to see which booking links get clicked

**Contact Interactions:**
- Filter by `phone_click`, `email_click`, `form_submission`
- See which contact methods are most popular

**User Behavior:**
- **Reports** → **Engagement** → **Pages and screens**
- See which pages get the most traffic
- **Reports** → **Engagement** → **Events**
- See all tracked events and their frequency

## Integration with GTM

Your existing Google Tag Manager setup works alongside GA4:
- GTM events are automatically forwarded to GA4
- Both systems track the same events
- You can configure GTM to send events to GA4

## Custom Events

You can track custom events using:

```typescript
import { trackEvent } from '@/lib/analytics';

trackEvent('custom_event_name', {
  event_category: 'Custom',
  event_label: 'Custom Label',
  custom_parameter: 'value',
});
```

## Troubleshooting

### Events Not Showing in GA4

1. **Check Measurement ID**: Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. **Wait for Processing**: GA4 can take 24-48 hours to show data
3. **Use DebugView**: In GA4, go to **Admin** → **DebugView** to see real-time events
4. **Check Browser Console**: Look for errors in DevTools console

### Outbound Clicks Not Tracking

1. Ensure links use `OutboundLink` component
2. Check browser console for errors
3. Verify `trackOutboundClick` is being called
4. Check Network tab for GA4 requests

### GTM and GA4 Conflicts

- Both can run simultaneously
- GTM can forward events to GA4
- No conflicts expected

## Next Steps

1. ✅ Set up GA4 property
2. ✅ Add Measurement ID to environment variables
3. ✅ Verify tracking is working
4. ✅ Set up custom reports in GA4
5. ✅ Configure goals/conversions
6. ✅ Set up email reports (optional)

## Admin Access

Access analytics dashboard at: `/admin/analytics`

This page provides:
- Quick links to GA4, GTM, and Google Ads
- List of all tracked events
- Configuration status
- Direct access to reports

