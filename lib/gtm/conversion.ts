// Google Ads Conversion Tracking
// 
// ARCHITECTURE NOTE (Jan 2026):
// - GTM loads GA4 and handles GA4 events (generate_lead, etc.)
// - This module fires Google Ads conversions directly via gtag
// - We do NOT push to dataLayer for Ads conversions because GTM
//   doesn't have a Google Ads Conversion tag listening for form_submission
// - Phone/Email clicks are handled by GTM's own awct tags

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Ads Conversion IDs
// AW-971873050 is your Google Ads account
const GOOGLE_ADS_ID = 'AW-971873050';
const FORM_CONVERSION_LABEL = '-I6MCM2UwLsBEJq2ts8D'; // Form submission conversion

/**
 * Track Google Ads conversion for form submissions
 * This fires directly to Google Ads via gtag
 */
export function trackGoogleAdsConversion(value?: number) {
  if (typeof window === 'undefined') return;

  const conversionData = {
    'send_to': `${GOOGLE_ADS_ID}/${FORM_CONVERSION_LABEL}`,
    'value': value || 0,
    'currency': 'GBP',
  };

  // Primary method: gtag (loaded by GTM's Google tag)
  if (window.gtag) {
    window.gtag('event', 'conversion', conversionData);
    console.log('✅ Google Ads conversion fired via gtag:', conversionData);
  } else {
    // Fallback: If gtag isn't available (shouldn't happen with GTM), use pixel
    console.warn('⚠️ gtag not available, using pixel fallback');
    const img = document.createElement('img');
    img.src = `https://www.googleadservices.com/pagead/conversion/971873050/?label=${FORM_CONVERSION_LABEL}&guid=ON&script=0`;
    img.width = 1;
    img.height = 1;
    img.style.display = 'none';
    document.body.appendChild(img);
    console.log('✅ Google Ads conversion fired via pixel fallback');
  }
}
