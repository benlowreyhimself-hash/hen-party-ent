# Google Tag Manager & Analytics Verification Guide

## ✅ Code Implementation Status

### What's Already Implemented:
1. **GTM Container ID**: `GTM-WQVW4H2` (extracted from original site)
2. **GTM Script**: Properly loaded in `app/layout.tsx` via `components/GTM.tsx`
3. **Event Tracking**: All contact buttons (phone/email) have tracking implemented
4. **Environment Variable**: Stored in `.env.local` as `NEXT_PUBLIC_GTM_ID`

### Files Modified:
- `components/GTM.tsx` - GTM container loader
- `lib/gtm.ts` - Event tracking functions
- `components/Header.tsx` - Phone/email tracking in header
- `components/ContactButtons.tsx` - Homepage contact button tracking
- `components/ContactLink.tsx` - Reusable contact link with tracking
- `app/page.tsx` - Homepage contact buttons
- `app/contact/page.tsx` - Contact page links
- `app/house-archives/[slug]/page.tsx` - Property page contact links
- `app/locations/bath/page.tsx` - Location page contact links

## 🔍 How to Verify Everything is Working

### 1. Verify GTM is Loading on Your Site

**Option A: Browser DevTools**
1. Visit your live site: https://hen-party-ent.vercel.app
2. Open DevTools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Type: `window.dataLayer` and press Enter
5. You should see an array with GTM initialization data

**Option B: Network Tab**
1. Open DevTools → **Network** tab
2. Filter by "gtm" or "googletagmanager"
3. Refresh the page
4. You should see a request to: `https://www.googletagmanager.com/gtm.js?id=GTM-WQVW4H2`

**Option C: View Page Source**
1. Right-click on your site → View Page Source
2. Search for "GTM-WQVW4H2"
3. You should see the GTM script in the HTML

### 2. Verify Event Tracking is Working

**Test Phone Click Tracking:**
1. Open DevTools → **Console** tab
2. Type: `window.dataLayer` and press Enter (to see current state)
3. Click on any phone number link (e.g., "07747571426")
4. Type `window.dataLayer` again
5. You should see a new entry with:
   ```javascript
   {
     event: "phone_click",
     phone_number: "07747571426",
     event_category: "Contact",
     event_label: "Phone Click"
   }
   ```

**Test Email Click Tracking:**
1. Same process as above
2. Click on any email link
3. Check `window.dataLayer` for:
   ```javascript
   {
     event: "email_click",
     email: "ben@henpartyentertainment.co.uk",
     event_category: "Contact",
     event_label: "Email Click"
   }
   ```

### 3. Verify in Google Tag Manager

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Select your container: `GTM-WQVW4H2`
3. Click **Preview** (top right)
4. Enter your site URL: `https://hen-party-ent.vercel.app`
5. You should see:
   - GTM container loaded
   - Tags firing
   - Events being tracked

### 4. Verify in Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Navigate to **Reports** → **Realtime**
3. Visit your site in another browser/incognito window
4. You should see your visit appear in real-time reports

### 5. Verify Google Ads Conversion Tracking

If you have Google Ads conversion tracking set up in GTM:
1. Go to [ads.google.com](https://ads.google.com)
2. Navigate to **Tools & Settings** → **Conversions**
3. Check if conversions are being recorded
4. Test by clicking a tracked button and checking if the conversion fires

## ⚠️ Important: Vercel Environment Variable

**You MUST add the GTM ID to Vercel environment variables:**

1. Go to your Vercel project: https://vercel.com
2. Select your project: `hen-party-ent`
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `NEXT_PUBLIC_GTM_ID`
   - **Value**: `GTM-WQVW4H2`
   - **Environment**: Production, Preview, Development (select all)
5. **Redeploy** your site (or wait for next auto-deploy)

Without this, GTM won't load on the live site!

## 🐛 Troubleshooting

### GTM Not Loading?
- ✅ Check Vercel environment variable is set
- ✅ Check browser console for errors
- ✅ Verify `.env.local` has `NEXT_PUBLIC_GTM_ID=GTM-WQVW4H2`
- ✅ Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Events Not Firing?
- ✅ Check browser console for JavaScript errors
- ✅ Verify `window.dataLayer` exists
- ✅ Check GTM Preview mode to see if events are received
- ✅ Verify the event names match what's configured in GTM

### Google Analytics Not Receiving Data?
- ✅ Verify GA4 is configured in your GTM container
- ✅ Check GTM Preview mode to see if GA4 tag fires
- ✅ Verify your GA4 Measurement ID is correct in GTM
- ✅ Check GA4 DebugView for real-time events

## 📊 What Events Are Being Tracked

Currently tracking:
- `phone_click` - When users click phone numbers
- `email_click` - When users click email addresses
- `button_click` - (Available for future use)

All events include:
- `event_category`: "Contact" or "Engagement"
- `event_label`: Descriptive label
- Additional data (phone_number, email, etc.)

## 🔗 Next Steps

1. **Add GTM ID to Vercel** (Critical!)
2. **Test event tracking** using the methods above
3. **Configure GTM Tags** to send events to Google Analytics
4. **Set up Google Ads conversion tracking** (if needed)
5. **Test in GTM Preview mode** to verify everything works

## 📝 Notes

- The GTM ID `GTM-WQVW4H2` was extracted from your original WordPress site
- All contact buttons across the site now have tracking
- Events are pushed to `dataLayer` which GTM can then use to trigger tags
- The implementation follows Google's best practices for GTM integration

