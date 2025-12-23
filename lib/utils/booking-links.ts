/**
 * Utility functions for determining booking link types
 */

export type BookingLinkType = 'airbnb' | 'booking_com' | 'vrbo' | 'website' | 'other';

/**
 * Determine booking link type from URL
 */
export function getBookingLinkType(url: string): BookingLinkType {
  if (!url) return 'other';
  
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('airbnb.com') || lowerUrl.includes('airbnb.co.uk')) {
    return 'airbnb';
  }
  
  if (lowerUrl.includes('booking.com') || lowerUrl.includes('booking.co.uk')) {
    return 'booking_com';
  }
  
  if (lowerUrl.includes('vrbo.com') || lowerUrl.includes('vrbo.co.uk') || lowerUrl.includes('homeaway.com')) {
    return 'vrbo';
  }
  
  // If it's not a known booking platform, assume it's the property website
  return 'website';
}

/**
 * Get all booking links from a house object
 */
export function getAllBookingLinks(house: {
  website_url?: string | null;
  airbnb_url?: string | null;
  booking_com_url?: string | null;
  vrbo_url?: string | null;
  other_booking_url?: string | null;
  booking_url?: string | null;
}): Array<{ url: string; type: BookingLinkType; label: string }> {
  const links: Array<{ url: string; type: BookingLinkType; label: string }> = [];
  
  if (house.airbnb_url) {
    links.push({ url: house.airbnb_url, type: 'airbnb', label: 'Airbnb' });
  }
  
  if (house.booking_com_url) {
    links.push({ url: house.booking_com_url, type: 'booking_com', label: 'Booking.com' });
  }
  
  if (house.vrbo_url) {
    links.push({ url: house.vrbo_url, type: 'vrbo', label: 'VRBO' });
  }
  
  if (house.website_url) {
    links.push({ url: house.website_url, type: 'website', label: 'Property Website' });
  }
  
  // Handle other_booking_url (could be JSON array or single URL)
  if (house.other_booking_url) {
    try {
      const parsed = JSON.parse(house.other_booking_url);
      if (Array.isArray(parsed)) {
        parsed.forEach((url: string) => {
          links.push({ url, type: getBookingLinkType(url), label: 'Other Booking Site' });
        });
      } else {
        links.push({ url: house.other_booking_url, type: getBookingLinkType(house.other_booking_url), label: 'Other Booking Site' });
      }
    } catch {
      // Not JSON, treat as single URL
      links.push({ url: house.other_booking_url, type: getBookingLinkType(house.other_booking_url), label: 'Other Booking Site' });
    }
  }
  
  // Fallback to booking_url if no specific links found
  if (links.length === 0 && house.booking_url) {
    links.push({ url: house.booking_url, type: getBookingLinkType(house.booking_url), label: 'Book Now' });
  }
  
  return links;
}

