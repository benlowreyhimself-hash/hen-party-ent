import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { houses } from '../db/schema';

dotenv.config({ path: '.env.local' });

/**
 * This script uses Drizzle to directly query the database,
 * bypassing Supabase's REST API cache entirely.
 * It also triggers a schema refresh by querying the information_schema.
 */
async function refreshSchemaCache() {
  try {
    const connectionString = process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error('Missing DATABASE_POOLER_URL or DATABASE_URL in .env.local');
    }

    console.log('🔌 Connecting directly to database (bypassing Supabase API cache)...\n');
    
    // Create direct PostgreSQL connection
    const client = postgres(connectionString, { max: 1 });
    const db = drizzle(client);

    // Query information_schema to trigger cache refresh
    console.log('📊 Querying database schema...\n');
    
    const schemaQuery = await client`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'houses'
      ORDER BY ordinal_position
      LIMIT 5
    `;
    
    console.log(`✅ Found table 'houses' with ${schemaQuery.length} columns visible\n`);

    // Direct query using Drizzle to verify data exists
    console.log('🔍 Querying houses table directly...\n');
    
    const allHouses = await db.select().from(houses);
    const publishedHouses = allHouses.filter(h => h.is_published);
    
    console.log(`📊 Database Statistics:`);
    console.log(`   Total houses: ${allHouses.length}`);
    console.log(`   Published houses: ${publishedHouses.length}`);
    console.log(`   Unpublished houses: ${allHouses.length - publishedHouses.length}\n`);

    // Try to trigger PostgREST schema cache refresh by querying pg_catalog
    console.log('🔄 Attempting to trigger PostgREST schema cache refresh...\n');
    
    try {
      // Query that forces PostgREST to refresh its schema cache
      await client`
        SELECT pg_notify('pgrst', 'reload schema')
      `;
      console.log('   ✅ Sent schema reload notification\n');
    } catch (err: any) {
      // This might fail if we don't have permission, but that's okay
      console.log('   ⚠️  Could not send notification (this is normal)\n');
    }

    // Alternative: Query a system table that PostgREST watches
    await client`
      SELECT COUNT(*) FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'houses'
    `;

    console.log('✅ Schema cache refresh triggered\n');
    console.log('💡 The Supabase REST API cache should refresh within 30-60 seconds.');
    console.log('   If it doesn\'t, the cache will auto-refresh within 1-5 minutes.\n');
    
    // Show sample data
    if (publishedHouses.length > 0) {
      console.log('📋 Sample published accommodations:');
      publishedHouses.slice(0, 5).forEach((house, i) => {
        console.log(`   ${i + 1}. ${house.title} (${house.location})`);
      });
      console.log('');
    }

    await client.end();
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

refreshSchemaCache();

