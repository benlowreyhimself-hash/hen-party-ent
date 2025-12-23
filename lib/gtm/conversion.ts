// Google Ads Conversion Tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const CONVERSION_ID = '971873050';
const CONVERSION_LABEL = '-I6MCM2UwLsBEJq2ts8D';

/**
 * Track Google Ads conversion
 */
export function trackGoogleAdsConversion(value?: number) {
  if (typeof window === 'undefined') return;

  // Method 1: Using gtag (if available)
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${CONVERSION_ID}/${CONVERSION_LABEL}`,
      'value': value || 0,
      'currency': 'GBP',
    });
  }

  // Method 2: Using dataLayer (for GTM)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'conversion',
      conversion_id: CONVERSION_ID,
      conversion_label: CONVERSION_LABEL,
      conversion_value: value || 0,
      conversion_currency: 'GBP',
    });
  }

  // Method 3: Direct pixel (fallback)
  const img = document.createElement('img');
  img.src = `https://www.googleadservices.com/pagead/conversion/${CONVERSION_ID}/?label=${CONVERSION_LABEL}&guid=ON&script=0`;
  img.width = 1;
  img.height = 1;
  img.style.display = 'none';
  document.body.appendChild(img);
}

