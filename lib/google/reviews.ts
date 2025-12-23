/**
 * Google Reviews Service
 * Fetches reviews from Google Places API or provides embed/link functionality
 */

const GOOGLE_REVIEWS_SHARE_LINK = 'https://share.google/SkTxcIAp7GAgditi0';

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

/**
 * Get Google Reviews share link
 * This is the primary method since Google Places API requires authentication
 */
export function getGoogleReviewsLink(): string {
  return GOOGLE_REVIEWS_SHARE_LINK;
}

/**
 * Fetch reviews from Google Places API (if API key and Place ID are available)
 * Note: This requires Google Places API key and Place ID
 */
export async function fetchGoogleReviews(
  placeId?: string,
  apiKey?: string
): Promise<GoogleReview[] | null> {
  if (!placeId || !apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();

    if (data.status === 'OK' && data.result?.reviews) {
      return data.result.reviews as GoogleReview[];
    }

    return null;
  } catch (error) {
    console.error('Error fetching Google Reviews:', error);
    return null;
  }
}

/**
 * Extract Place ID from Google Reviews share link
 * Note: This may not always be possible depending on the share link format
 */
export function extractPlaceIdFromShareLink(shareLink: string): string | null {
  // Google share links don't directly contain Place ID
  // This would need to be manually configured or extracted via other means
  // For now, return null and require manual Place ID configuration
  return null;
}

