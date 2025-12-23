import * as dotenv from 'dotenv';
import { getAllHouses, updateHouse, deleteHouse } from '../lib/supabase/houses';
import { getRegionFromPostcode } from '../lib/utils/postcode';

dotenv.config({ path: '.env.local' });

interface DuplicateGroup {
  address: string;
  houses: Array<{ id: string; title: string; slug: string; created_at: string; raw_address: string | null }>;
}

async function cleanupAccommodations() {
  try {
    console.log('🧹 Starting accommodation cleanup...\n');
    
    const allHouses = await getAllHouses();
    console.log(`📊 Total accommodations before cleanup: ${allHouses.length}\n`);
    
    // Step 1: Remove duplicates based on normalized address
    console.log('🔍 Step 1: Finding duplicates...\n');
    
    const addressMap = new Map<string, DuplicateGroup>();
    
    for (const house of allHouses) {
      // Normalize address for comparison (lowercase, remove extra spaces, remove special chars)
      const normalizedAddress = (house.address || house.raw_address || '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s,.-]/g, '');
      
      if (!normalizedAddress || normalizedAddress.length < 5) {
        continue; // Skip invalid addresses
      }
      
      if (!addressMap.has(normalizedAddress)) {
        addressMap.set(normalizedAddress, {
          address: house.address || house.raw_address || '',
          houses: [],
        });
      }
      
      addressMap.get(normalizedAddress)!.houses.push({
        id: house.id,
        title: house.title,
        slug: house.slug,
        created_at: house.created_at,
        raw_address: house.raw_address,
      });
    }
    
    // Find duplicates
    const duplicates = Array.from(addressMap.values()).filter(g => g.houses.length > 1);
    console.log(`   Found ${duplicates.length} duplicate address groups\n`);
    
    // Step 2: Remove duplicates (keep the oldest/most complete one)
    console.log('🗑️  Step 2: Removing duplicates...\n');
    let duplicatesRemoved = 0;
    
    for (const group of duplicates) {
      // Sort by created_at (oldest first) and by data completeness
      const sorted = group.houses.sort((a, b) => {
        // Prefer ones with more complete data
        const aComplete = (a.raw_address || '').length;
        const bComplete = (b.raw_address || '').length;
        if (aComplete !== bComplete) {
          return bComplete - aComplete; // More complete first
        }
        // Then by date (oldest first)
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
      
      // Keep the first one, delete the rest
      const toKeep = sorted[0];
      const toDelete = sorted.slice(1);
      
      for (const house of toDelete) {
        try {
          await deleteHouse(house.id);
          console.log(`   ✅ Removed duplicate: ${house.title} (${house.slug})`);
          duplicatesRemoved++;
        } catch (error: any) {
          console.error(`   ❌ Failed to delete ${house.title}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n   Removed ${duplicatesRemoved} duplicate accommodations\n`);
    
    // Step 3: Validate UK addresses and clean up
    console.log('🇬🇧 Step 3: Validating UK addresses...\n');
    
    const allHousesAfterDedup = await getAllHouses();
    let cleaned = 0;
    let invalidRemoved = 0;
    
    for (const house of allHousesAfterDedup) {
      const address = house.address || house.raw_address || '';
      let needsUpdate = false;
      const updates: any = {};
      
      // Check if address looks like UK (has UK postcode pattern)
      const ukPostcodePattern = /\b([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})\b/i;
      const hasUKPostcode = ukPostcodePattern.test(address);
      
      // Check for non-UK indicators
      const nonUKIndicators = [
        /^\s*https?:\/\//i, // URLs
        /^\s*@/i, // Email-like
        /^\s*[A-Z]{2}\s*\d{5}/i, // US zip codes
        /^\s*\d{5}\s*$/i, // Just numbers
        /^\s*[A-Z]{1,3}\s*$/i, // Just letters (too short)
      ];
      
      const isInvalid = nonUKIndicators.some(pattern => pattern.test(address));
      
      if (isInvalid || (!hasUKPostcode && address.length < 10)) {
        // Mark as invalid - we'll remove these
        try {
          await deleteHouse(house.id);
          console.log(`   🗑️  Removed invalid address: ${house.title} - "${address.substring(0, 50)}"`);
          invalidRemoved++;
          continue;
        } catch (error: any) {
          console.error(`   ❌ Failed to remove invalid ${house.title}: ${error.message}`);
        }
      }
      
      // Clean up and normalize address
      let cleanedAddress = address.trim();
      
      // Remove source sheet info from raw_address if present
      if (house.raw_address && house.raw_address.includes('[Source:')) {
        cleanedAddress = house.raw_address.split('[Source:')[0].trim();
        updates.raw_address = cleanedAddress;
        needsUpdate = true;
      }
      
      // Ensure postcode is extracted and uppercase
      if (house.postcode) {
        const postcodeMatch = cleanedAddress.match(ukPostcodePattern);
        if (postcodeMatch) {
          const extractedPostcode = postcodeMatch[1].toUpperCase().replace(/\s+/g, ' ');
          if (house.postcode !== extractedPostcode) {
            updates.postcode = extractedPostcode;
            needsUpdate = true;
          }
        }
      } else {
        // Extract postcode if missing
        const postcodeMatch = cleanedAddress.match(ukPostcodePattern);
        if (postcodeMatch) {
          updates.postcode = postcodeMatch[1].toUpperCase().replace(/\s+/g, ' ');
          needsUpdate = true;
        }
      }
      
      // Update region from postcode if missing or incorrect
      if (updates.postcode || house.postcode) {
        const postcode = updates.postcode || house.postcode;
        const calculatedRegion = getRegionFromPostcode(postcode);
        if (calculatedRegion !== 'Unknown' && house.region !== calculatedRegion) {
          updates.region = calculatedRegion;
          needsUpdate = true;
        }
      }
      
      // Clean up location if it's too generic
      if (house.location === 'Unknown' || !house.location) {
        // Try to extract from address
        const addressParts = cleanedAddress.split(',').map(p => p.trim());
        if (addressParts.length > 0) {
          const firstPart = addressParts[0];
          // Check if it's a recognizable UK location
          if (firstPart.length > 3 && firstPart.length < 30) {
            updates.location = firstPart;
            needsUpdate = true;
          }
        }
      }
      
      // Update if needed
      if (needsUpdate) {
        try {
          await updateHouse(house.id, updates);
          console.log(`   ✨ Cleaned: ${house.title}`);
          cleaned++;
        } catch (error: any) {
          console.error(`   ❌ Failed to update ${house.title}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n   Cleaned ${cleaned} accommodations`);
    console.log(`   Removed ${invalidRemoved} invalid addresses\n`);
    
    // Step 4: Final summary
    const finalHouses = await getAllHouses();
    const publishedCount = finalHouses.filter(h => h.is_published).length;
    const withPostcodes = finalHouses.filter(h => h.postcode).length;
    const withRegions = finalHouses.filter(h => h.region).length;
    
    console.log('✅ Cleanup complete!\n');
    console.log('📊 Final Statistics:');
    console.log(`   Total accommodations: ${finalHouses.length}`);
    console.log(`   Published: ${publishedCount}`);
    console.log(`   With postcodes: ${withPostcodes}`);
    console.log(`   With regions: ${withRegions}`);
    console.log(`   Duplicates removed: ${duplicatesRemoved}`);
    console.log(`   Invalid addresses removed: ${invalidRemoved}`);
    console.log(`   Records cleaned: ${cleaned}\n`);
    
  } catch (error: any) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

cleanupAccommodations();

