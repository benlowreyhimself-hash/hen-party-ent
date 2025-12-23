import { NextResponse } from 'next/server';
import { fetchGoogleReviews } from '@/lib/google/reviews';

/**
 * API route to fetch Google Reviews server-side
 * This keeps API keys secure and avoids CORS issues
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId') || process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { 
          reviews: null,
          error: 'Google Places API credentials not configured',
          message: 'Please configure GOOGLE_PLACES_API_KEY and NEXT_PUBLIC_GOOGLE_PLACE_ID in environment variables'
        },
        { status: 200 } // Return 200 so frontend can handle gracefully
      );
    }

    const reviews = await fetchGoogleReviews(placeId, apiKey);

    if (!reviews) {
      return NextResponse.json(
        { 
          reviews: null,
          error: 'Failed to fetch reviews',
          message: 'Could not retrieve reviews from Google Places API'
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('Error fetching Google Reviews:', error);
    return NextResponse.json(
      { 
        reviews: null,
        error: error.message || 'Failed to fetch reviews'
      },
      { status: 200 }
    );
  }
}

