import * as dotenv from 'dotenv';
import { getAllHouses } from '../lib/supabase/houses';

dotenv.config({ path: '.env.local' });

async function verifyImport() {
  try {
    console.log('🔍 Verifying accommodation import...\n');
    
    const houses = await getAllHouses();
    
    console.log(`📊 Total accommodations in database: ${houses.length}`);
    console.log(`📊 Published: ${houses.filter(h => h.is_published).length}`);
    console.log(`📊 Featured: ${houses.filter(h => h.is_featured).length}`);
    console.log(`📊 With postcodes: ${houses.filter(h => h.postcode).length}`);
    console.log(`📊 With regions: ${houses.filter(h => h.region).length}`);
    
    if (houses.length > 0) {
      console.log('\n📋 Sample accommodations:');
      houses.slice(0, 5).forEach((house, index) => {
        console.log(`  ${index + 1}. ${house.title}`);
        console.log(`     Location: ${house.location} | Postcode: ${house.postcode || 'N/A'}`);
        console.log(`     Region: ${house.region || 'N/A'} | Published: ${house.is_published}`);
      });
      
      // Count by region
      const regionCounts = new Map<string, number>();
      houses.forEach(house => {
        const region = house.region || 'Unknown';
        regionCounts.set(region, (regionCounts.get(region) || 0) + 1);
      });
      
      console.log('\n📊 Accommodations by region:');
      Array.from(regionCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([region, count]) => {
          console.log(`  ${region}: ${count}`);
        });
    } else {
      console.log('\n⚠️  No accommodations found in database');
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('schema cache')) {
      console.error('\n💡 This is a Supabase schema cache issue.');
      console.error('   The data is likely imported, but the API cache needs to refresh.');
      console.error('   This usually happens automatically within 1-5 minutes.');
      console.error('   You can also refresh it manually in Supabase Dashboard:');
      console.error('   Settings → API → Refresh Schema Cache');
    }
  }
}

verifyImport();

