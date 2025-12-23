import * as dotenv from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { verifyAddressAndFindLinks } from '../lib/gemini/address-verifier';
import { createHouse } from '../lib/supabase/houses';
import { enrichProperty } from '../lib/gemini/property-enricher';

dotenv.config({ path: '.env.local' });

interface RawAddress {
  sheet: string;
  row: number;
  address: string;
  venue?: string;
  region?: string;
  eventDate?: string;
  status?: string;
}

interface EnrichedAddress extends RawAddress {
  verified_address?: string;
  google_maps_url?: string;
  website_url?: string;
  airbnb_url?: string;
  booking_com_url?: string;
  vrbo_url?: string;
  other_booking_urls?: string[];
  location?: string;
  postcode?: string;
  verified: boolean;
}

async function verifyAndEnrich() {
  try {
    console.log('🔍 Loading raw addresses...\n');
    
    const rawDataPath = join(process.cwd(), 'data', 'raw-addresses.json');
    const rawAddresses: RawAddress[] = JSON.parse(
      readFileSync(rawDataPath, 'utf-8')
    );
    
    console.log(`📊 Found ${rawAddresses.length} addresses to verify\n`);
    
    const enriched: EnrichedAddress[] = [];
    const errors: Array<{ address: string; error: string }> = [];
    
    // Process in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < rawAddresses.length; i += batchSize) {
      const batch = rawAddresses.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1} (${i + 1}-${Math.min(i + batchSize, rawAddresses.length)} of ${rawAddresses.length})...`);
      
      for (const raw of batch) {
        try {
          console.log(`  🔍 Verifying: ${raw.address.substring(0, 50)}...`);
          
          const verified = await verifyAddressAndFindLinks(
            raw.address,
            raw.region
          );
          
          enriched.push({
            ...raw,
            ...verified,
            verified: true,
          });
          
          console.log(`    ✅ Verified: ${verified.verified_address}`);
          if (verified.airbnb_url) console.log(`    🏠 Found Airbnb: ${verified.airbnb_url}`);
          if (verified.booking_com_url) console.log(`    🏨 Found Booking.com: ${verified.booking_com_url}`);
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error: any) {
          console.error(`    ❌ Error: ${error.message}`);
          errors.push({ address: raw.address, error: error.message });
          
          enriched.push({
            ...raw,
            verified: false,
          });
        }
      }
      
      // Longer pause between batches
      if (i + batchSize < rawAddresses.length) {
        console.log('  ⏳ Waiting 5 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    // Save enriched data
    const enrichedPath = join(process.cwd(), 'data', 'enriched-addresses.json');
    writeFileSync(enrichedPath, JSON.stringify(enriched, null, 2));
    
    console.log(`\n✅ Verification complete!`);
    console.log(`📊 Verified: ${enriched.filter(e => e.verified).length}`);
    console.log(`❌ Errors: ${errors.length}`);
    console.log(`💾 Saved to: ${enrichedPath}\n`);
    
    if (errors.length > 0) {
      const errorsPath = join(process.cwd(), 'data', 'verification-errors.json');
      writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
      console.log(`⚠️  Errors saved to: ${errorsPath}\n`);
    }
    
    // Summary
    const withBookingLinks = enriched.filter(e => 
      e.airbnb_url || e.booking_com_url || e.vrbo_url || (e.other_booking_urls && e.other_booking_urls.length > 0)
    );
    
    console.log('📈 Summary:');
    console.log(`  • Addresses with booking links: ${withBookingLinks.length}`);
    console.log(`  • Airbnb links found: ${enriched.filter(e => e.airbnb_url).length}`);
    console.log(`  • Booking.com links found: ${enriched.filter(e => e.booking_com_url).length}`);
    console.log(`  • VRBO links found: ${enriched.filter(e => e.vrbo_url).length}`);
    
    return enriched;
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyAndEnrich();

