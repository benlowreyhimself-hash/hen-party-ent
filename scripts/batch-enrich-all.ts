import * as dotenv from 'dotenv';
import { getAllHouses, updateHouse } from '../lib/supabase/houses';
import { enrichProperty } from '../lib/gemini/property-enricher';
import { verifyAddressAndFindLinks } from '../lib/gemini/address-verifier';

dotenv.config({ path: '.env.local' });

async function batchEnrichAll() {
  try {
    console.log('🚀 Starting batch enrichment of all accommodations...\n');

    // Get all published houses
    const allHouses = await getAllHouses();
    const publishedHouses = allHouses.filter(h => h.is_published);

    console.log(`📊 Found ${allHouses.length} total accommodations`);
    console.log(`   ${publishedHouses.length} published\n`);

    if (publishedHouses.length === 0) {
      console.log('⚠️  No published accommodations to enrich.');
      return;
    }

    console.log(`✨ Starting enrichment of ${publishedHouses.length} properties...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < publishedHouses.length; i++) {
      const house = publishedHouses[i];
      const progress = `[${i + 1}/${publishedHouses.length}]`;

      try {
        console.log(`${progress} Processing: ${house.title} (${house.location})...`);

        // 1. Verify Address & Find Links (Airbnb, Booking.com, Photos)
        let verificationData: any = null;
        if (house.address || house.raw_address) {
          console.log(`   🔍 Searching for booking links & verify address...`);
          try {
            // Add distinct delay for the search operation
            await new Promise(resolve => setTimeout(resolve, 1000));

            verificationData = await verifyAddressAndFindLinks(
              house.address || house.raw_address || '',
              house.location || house.region || undefined
            );

            if (verificationData?.is_public_property) {
              console.log(`   ✅ Found public listing: ${verificationData.verified_address}`);
              if (verificationData.photos?.length) console.log(`   📸 Found ${verificationData.photos.length} photos`);
            } else {
              console.log(`   ⚠️  Could not verify as public holiday let`);
            }
          } catch (err: any) {
            console.error(`   Warning: Address verification failed: ${err.message}`);
          }
        }

        // 2. Generate Creative Content (Description, Features)
        console.log(`   ✨ Generating creative content...`);
        const enrichedData = await enrichProperty(
          house.title,
          house.location,
          house.address || undefined,
          {
            title: house.title,
            description: house.description || undefined,
            location: house.location,
            address: house.address || undefined,
            postcode: house.postcode || undefined,
            features: house.features || undefined,
            content: house.content || undefined,
            meta_description: house.meta_description || undefined,
          }
        );

        // 3. Merge Data
        const updateData: any = {
          ...enrichedData,
          // Prefer verification data for sleeps if found
          sleeps: verificationData?.sleeps || enrichedData.sleeps || null,
        };

        // Add verification data if successful
        if (verificationData) {
          updateData.verified_address = verificationData.verified_address;
          updateData.google_maps_url = verificationData.google_maps_url;
          updateData.website_url = verificationData.website_url;
          updateData.airbnb_url = verificationData.airbnb_url;
          updateData.booking_com_url = verificationData.booking_com_url;
          updateData.vrbo_url = verificationData.vrbo_url;
          updateData.other_booking_url = verificationData.other_booking_urls?.[0] || null;
          if (verificationData.location) updateData.location = verificationData.location;
          if (verificationData.postcode) updateData.postcode = verificationData.postcode;

          updateData.address_verified = verificationData.is_public_property === true;
          updateData.booking_links_found = !!(
            verificationData.website_url ||
            verificationData.airbnb_url ||
            verificationData.booking_com_url ||
            verificationData.vrbo_url
          );

          // Handle Photos
          if (verificationData.photos && Array.isArray(verificationData.photos) && verificationData.photos.length > 0) {
            const photos = verificationData.photos.filter((url: string) => url && url.startsWith('http'));
            if (photos.length > 0) {
              updateData.image_url = photos[0] || null;
              updateData.photo_1_url = photos[1] || null;
              updateData.photo_2_url = photos[2] || null;
              updateData.photo_3_url = photos[3] || null;
              updateData.photos_extracted = true;
              updateData.photos_stored_in_blob = false;
            }
          }
        }

        // Update the house
        await updateHouse(house.id, updateData);

        console.log(`   💾 Saved updates for: ${house.title}`);
        successCount++;

        // Rate limiting - wait 2 seconds between properties to be nice to Gemini/Google
        if (i < publishedHouses.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error: any) {
        console.error(`   ❌ Error processing ${house.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`\n✅ Batch enrichment complete!`);
    console.log(`   Successfully enriched: ${successCount}`);
    console.log(`   Errors: ${errorCount}\n`);

  } catch (error: any) {
    console.error('❌ Batch enrichment failed:', error.message);
    process.exit(1);
  }
}

batchEnrichAll();

