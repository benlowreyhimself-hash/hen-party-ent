import * as dotenv from 'dotenv';
import { getAllHouses } from '../lib/supabase/houses';
import { discoverAndEnrichPhotos } from '../lib/gemini/photo-enricher';

dotenv.config({ path: '.env.local' });

async function batchEnrichPhotos() {
    try {
        console.log('🚀 Starting batch photo enrichment...\n');

        // Get all published houses
        const allHouses = await getAllHouses();
        const publishedHouses = allHouses.filter(h => h.is_published);

        console.log(`📊 Found ${allHouses.length} total accommodations`);
        console.log(`   ${publishedHouses.length} published\n`);

        // Filter to only properties that need photos
        const housesNeedingPhotos = publishedHouses.filter(h => {
            // Skip if already has photos in Supabase
            if (h.photos_stored_in_blob) return false;

            // Need at least one booking URL or address for discovery
            const hasBookingUrls = h.airbnb_url || h.booking_com_url || h.website_url || h.vrbo_url;
            const hasAddress = h.address || h.raw_address;

            return hasBookingUrls || hasAddress;
        });

        console.log(`🎯 ${housesNeedingPhotos.length} properties need photo enrichment\n`);

        if (housesNeedingPhotos.length === 0) {
            console.log('✅ All published accommodations already have photos!');
            return;
        }

        console.log(`⏱️  Estimated time: ${Math.ceil(housesNeedingPhotos.length)} minutes (1 property/minute)\n`);
        console.log(`✨ Starting photo enrichment...\n`);

        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        for (let i = 0; i < housesNeedingPhotos.length; i++) {
            const house = housesNeedingPhotos[i];
            const progress = `[${i + 1}/${housesNeedingPhotos.length}]`;

            try {
                console.log(`${progress} Processing: ${house.title} (${house.location})...`);

                // Collect all booking URLs
                const bookingUrls = [
                    house.website_url,
                    house.airbnb_url,
                    house.booking_com_url,
                    house.vrbo_url,
                    house.other_booking_url
                ].filter((url): url is string => Boolean(url));

                if (bookingUrls.length === 0) {
                    console.log(`   ⚠️  No booking URLs found, will try Google Images search only`);
                } else {
                    console.log(`   📋 Found ${bookingUrls.length} booking URL(s) to scrape`);
                }

                // Run photo discovery with Google Images fallback
                const result = await discoverAndEnrichPhotos(house.slug, bookingUrls);

                if (result.success) {
                    console.log(`   ✅ Uploaded ${result.count} photos to Supabase`);
                    successCount++;
                } else {
                    console.log(`   ⚠️  Skipped: ${result.message}`);
                    skipCount++;
                }

                // CRITICAL: Rate limiting - 60 seconds between properties
                // This ensures we stay under Gemini's 10 requests/min limit
                if (i < housesNeedingPhotos.length - 1) {
                    console.log(`   ⏳ Waiting 60 seconds before next property...`);
                    await new Promise(resolve => setTimeout(resolve, 60000));
                }

            } catch (error: any) {
                console.error(`   ❌ Error: ${error.message}`);
                errorCount++;

                // Still wait on errors to maintain rate limits
                if (i < housesNeedingPhotos.length - 1) {
                    console.log(`   ⏳ Waiting 60 seconds before next property...`);
                    await new Promise(resolve => setTimeout(resolve, 60000));
                }
            }
        }

        console.log(`\n✅ Batch photo enrichment complete!`);
        console.log(`   Successfully enriched: ${successCount}`);
        console.log(`   Skipped: ${skipCount}`);
        console.log(`   Errors: ${errorCount}\n`);

    } catch (error: any) {
        console.error('❌ Batch photo enrichment failed:', error.message);
        process.exit(1);
    }
}

batchEnrichPhotos();
