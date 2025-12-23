import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { enrichProperty, enrichProperties } from '@/lib/gemini/property-enricher';
import { verifyAddressAndFindLinks } from '@/lib/gemini/address-verifier';
import { getHouseById, updateHouse } from '@/lib/supabase/houses';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { houseId } = body;

    if (!houseId) {
      return NextResponse.json({ error: 'houseId is required' }, { status: 400 });
    }

    const house = await getHouseById(houseId);
    if (!house) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }

    const propertyName = house.title;
    const location = house.location;
    const existingData: any = {
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
      raw_address: house.raw_address, // Ensure raw_address is passed
      sleeps: house.sleeps,
    };

    console.log(`[Enrich API] Starting enrichment for houseId: ${houseId}, title: ${propertyName}`);



    // Verify address and find booking links (if address exists)
    let addressVerification: any = null;
    if (existingData.address || existingData.raw_address) {
      console.log(`[Enrich API] Calling verifyAddressAndFindLinks for ${propertyName}...`);
      try {
        addressVerification = await verifyAddressAndFindLinks(
          existingData.address || existingData.raw_address || '',
          location || existingData?.location || undefined
        );
      } catch (error: any) {
        console.error(`[Enrich API] Address verification failed for ${propertyName}:`, error.message);
        // Continue with enrichment even if verification fails
        // Log the full error for more details
        console.error(error);
      }
    }

    // Enrich the property
    console.log(`[Enrich API] Calling enrichProperty for ${propertyName}...`);
    const enrichedData = await enrichProperty(
      propertyName || 'Property',
      location,
      existingData
    );
    console.log(`[Enrich API] enrichProperty completed for ${propertyName}.`)


    // Combine enrichment and verification data
    const updateData: any = {
      ...enrichedData,
      // Use sleeps from address verification if available, otherwise from enrichment
      sleeps: addressVerification?.sleeps || enrichedData.sleeps || null,
    };

    // Add address verification data if available
    if (addressVerification) {
      updateData.verified_address = addressVerification.verified_address;
      updateData.google_maps_url = addressVerification.google_maps_url;
      updateData.website_url = addressVerification.website_url;
      updateData.airbnb_url = addressVerification.airbnb_url;
      updateData.booking_com_url = addressVerification.booking_com_url;
      updateData.vrbo_url = addressVerification.vrbo_url;
      updateData.other_booking_url = addressVerification.other_booking_urls?.[0] || null;
      updateData.location = addressVerification.location || updateData.location;
      updateData.postcode = addressVerification.postcode || updateData.postcode;
      
      // Set address_verified based on is_public_property
      updateData.address_verified = addressVerification.is_public_property === true;
      updateData.booking_links_found = !!(
        addressVerification.website_url ||
        addressVerification.airbnb_url ||
        addressVerification.booking_com_url ||
        addressVerification.vrbo_url ||
        (addressVerification.other_booking_urls && addressVerification.other_booking_urls.length > 0)
      );
      
      // Extract and save photos (hybrid storage - URLs initially)
      if (addressVerification.photos && Array.isArray(addressVerification.photos) && addressVerification.photos.length > 0) {
        const photos = addressVerification.photos.filter((url: string) => url && url.startsWith('http'));
        if (photos.length > 0) {
          updateData.image_url = photos[0] || null;
          updateData.photo_1_url = photos[1] || null;
          updateData.photo_2_url = photos[2] || null;
          updateData.photo_3_url = photos[3] || null;
          updateData.photos_extracted = true;
          updateData.photos_stored_in_blob = false; // Initially stored as external URLs
        }
      }
    }

    // If houseId provided, update the house in database
    console.log(`[Enrich API] Updating house ${houseId} in database with enriched data.`);
    const updated = await updateHouse(houseId, updateData);
    console.log(`[Enrich API] House ${houseId} updated successfully.`);

    return NextResponse.json({
      success: true,
      data: enrichedData,
      addressVerification: addressVerification,
      updated: updated,
    });
  } catch (error: any) {
    console.error(`[Enrich API] Top-level error enriching property for houseId: ${houseId || 'N/A'}:`, error);
    return NextResponse.json(
      { error: error.message || 'Failed to enrich property' },
      { status: 500 }
    );
  }
}


