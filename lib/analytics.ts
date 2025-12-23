// Google Analytics 4 (GA4) tracking functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics 4
 * This should be called once when the app loads
 */
export function initGA(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track outbound link click (accommodation booking links)
 */
export function trackOutboundClick(
  url: string,
  linkType: 'airbnb' | 'booking_com' | 'vrbo' | 'website' | 'other',
  accommodationName?: string
) {
  if (typeof window === 'undefined') return;

  const eventData = {
    event_category: 'Outbound Link',
    event_label: `${linkType} - ${accommodationName || 'Unknown'}`,
    link_url: url,
    link_type: linkType,
    accommodation_name: accommodationName,
    transport_type: 'beacon', // Use beacon API for outbound links
  };

  // Track via GTM dataLayer (works with existing GTM setup)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'outbound_click',
      ...eventData,
    });
  }

  // Track via gtag (direct GA4)
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Outbound Link',
      event_label: `${linkType} - ${accommodationName || 'Unknown'}`,
      link_url: url,
      link_type: linkType,
      accommodation_name: accommodationName,
    });
  }
}

/**
 * Track accommodation page view
 */
export function trackAccommodationView(accommodationName: string, slug: string) {
  if (typeof window === 'undefined') return;

  const eventData = {
    event_category: 'Accommodation',
    event_label: accommodationName,
    accommodation_name: accommodationName,
    accommodation_slug: slug,
  };

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'accommodation_view',
      ...eventData,
    });
  }

  if (window.gtag) {
    window.gtag('event', 'view_item', {
      event_category: 'Accommodation',
      item_name: accommodationName,
      item_id: slug,
    });
  }
}

/**
 * Track accommodation search/filter
 */
export function trackAccommodationFilter(filterType: string, filterValue: string) {
  if (typeof window === 'undefined') return;

  const eventData = {
    event_category: 'Accommodation Filter',
    filter_type: filterType,
    filter_value: filterValue,
  };

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'accommodation_filter',
      ...eventData,
    });
  }

  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: `${filterType}: ${filterValue}`,
    });
  }
}

/**
 * Track custom event (for any other tracking needs)
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
) {
  if (typeof window === 'undefined') return;

  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }

  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
}

