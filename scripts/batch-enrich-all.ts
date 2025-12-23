import * as dotenv from 'dotenv';
import { getAllHouses, updateHouse } from '../lib/supabase/houses';
import { enrichProperty } from '../lib/gemini/property-enricher';

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
        console.log(`${progress} Enriching: ${house.title} (${house.location})...`);
        
        // Enrich the property
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
        
        // Update the house
        await updateHouse(house.id, enrichedData);
        
        console.log(`   ✅ Successfully enriched: ${house.title}`);
        successCount++;
        
        // Rate limiting - wait 500ms between requests
        if (i < publishedHouses.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error: any) {
        console.error(`   ❌ Error enriching ${house.title}: ${error.message}`);
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

