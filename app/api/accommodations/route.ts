import { NextResponse } from 'next/server';
import { getPublishedHouses } from '@/lib/supabase/houses';

export async function GET() {
  try {
    const houses = await getPublishedHouses();

    return NextResponse.json({
      houses: houses.map(house => ({
        id: house.id,
        title: house.title,
        slug: house.slug,
        location: house.location,
        region: house.region,
        image_url: house.image_url,
        description: house.description,
        sleeps: house.sleeps,
        address: house.address,
        google_maps_url: house.google_maps_url || null,
        ben_visited_dates: house.ben_visited_dates || null,
        has_affiliate_relationship: house.has_affiliate_relationship || false,
        owner_approved: house.owner_approved || false,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching accommodations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accommodations', houses: [] },
      { status: 500 }
    );
  }
}

