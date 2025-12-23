import { NextResponse } from 'next/server';
import { enrichPhoto, enrichPhotos } from '@/lib/gemini/photo-enricher';

/**
 * API route to enrich a single photo with Gemini AI
 */
export async function POST(request: Request) {
  try {
    const { photoUrl, existingAlt } = await request.json();

    if (!photoUrl) {
      return NextResponse.json(
        { error: 'photoUrl is required' },
        { status: 400 }
      );
    }

    const metadata = await enrichPhoto(photoUrl, existingAlt);

    return NextResponse.json({ metadata });
  } catch (error: any) {
    console.error('Error enriching photo:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to enrich photo' },
      { status: 500 }
    );
  }
}

/**
 * API route to batch enrich multiple photos
 */
export async function PUT(request: Request) {
  try {
    const { photos } = await request.json();

    if (!Array.isArray(photos)) {
      return NextResponse.json(
        { error: 'photos array is required' },
        { status: 400 }
      );
    }

    const results = await enrichPhotos(photos);

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error('Error batch enriching photos:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to enrich photos' },
      { status: 500 }
    );
  }
}

