import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { enrichProperty, enrichProperties } from '@/lib/gemini/property-enricher';
import { getHouseById, updateHouse } from '@/lib/supabase/houses';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { houseId, propertyName, location } = body;

    if (!houseId && !propertyName) {
      return NextResponse.json(
        { error: 'Either houseId or propertyName is required' },
        { status: 400 }
      );
    }

    // If houseId provided, fetch existing data
    let existingData = {};
    if (houseId) {
      const house = await getHouseById(houseId);
      if (house) {
        existingData = {
          title: house.title,
          description: house.description,
          location: house.location,
          address: house.address,
          postcode: house.postcode,
          features: house.features,
          content: house.content,
          meta_description: house.meta_description,
          booking_url: house.booking_url,
          google_maps_url: house.google_maps_url,
        };
      }
    }

    // Enrich the property
    const enrichedData = await enrichProperty(
      propertyName || existingData.title || 'Property',
      location || existingData.location,
      existingData
    );

    // If houseId provided, update the house in database
    if (houseId) {
      const updated = await updateHouse(houseId, enrichedData);
      return NextResponse.json({
        success: true,
        data: enrichedData,
        updated: updated,
      });
    }

    // Otherwise, just return the enriched data
    return NextResponse.json({
      success: true,
      data: enrichedData,
    });
  } catch (error: any) {
    console.error('Error enriching property:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to enrich property' },
      { status: 500 }
    );
  }
}

/**
 * Batch enrich multiple properties
 */
export async function PUT(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { houseIds } = body;

    if (!Array.isArray(houseIds) || houseIds.length === 0) {
      return NextResponse.json(
        { error: 'houseIds array is required' },
        { status: 400 }
      );
    }

    // Fetch all houses
    const { getAllHouses } = await import('@/lib/supabase/houses');
    const allHouses = await getAllHouses();
    const housesToEnrich = allHouses.filter(h => houseIds.includes(h.id));

    // Prepare enrichment requests
    const enrichmentRequests = housesToEnrich.map(house => ({
      name: house.title,
      location: house.location,
      existingData: {
        title: house.title,
        description: house.description,
        location: house.location,
        address: house.address,
        postcode: house.postcode,
        features: house.features,
        content: house.content,
        meta_description: house.meta_description,
        booking_url: house.booking_url,
        google_maps_url: house.google_maps_url,
      },
    }));

    // Enrich all properties
    const enrichedData = await enrichProperties(enrichmentRequests);

    // Update all houses in database
    const results = [];
    for (let i = 0; i < housesToEnrich.length; i++) {
      const house = housesToEnrich[i];
      const enriched = enrichedData[i];
      
      try {
        const updated = await updateHouse(house.id, enriched);
        results.push({
          houseId: house.id,
          title: house.title,
          success: true,
          updated: updated,
        });
      } catch (error: any) {
        results.push({
          houseId: house.id,
          title: house.title,
          success: false,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error: any) {
    console.error('Error batch enriching properties:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to enrich properties' },
      { status: 500 }
    );
  }
}

