import * as dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config({ path: '.env.local' });

/**
 * Migration script to add venue history and relationship tracking fields
 * Run: npm run db:migrate-venue-fields
 * 
 * Note: If this fails, run the SQL manually in Supabase Dashboard → SQL Editor
 */
async function migrate() {
  try {
    console.log('🔄 Starting migration: Adding venue history fields...\n');
    
    const connectionString = process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error('Missing DATABASE_POOLER_URL or DATABASE_URL in .env.local');
    }

    console.log('📡 Connecting to database...');
    const client = postgres(connectionString, { 
      max: 1,
      ssl: 'require',
      prepare: false 
    });
    
    // Add new columns using raw SQL
    const migrations = [
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[]`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT`,
    ];
    
    for (const migration of migrations) {
      try {
        await client.unsafe(migration);
        console.log('  ✅ Executed:', migration.substring(0, 60) + '...');
      } catch (err: any) {
        // Column might already exist, which is fine
        if (err.message?.includes('already exists') || err.message?.includes('duplicate')) {
          console.log('  ℹ️  Column already exists (skipping)');
        } else {
          throw err;
        }
      }
    }
    
    await client.end();
    
    console.log('\n✅ Migration complete!');
    console.log('   Added fields:');
    console.log('   - ben_visited_dates (TEXT[])');
    console.log('   - has_affiliate_relationship (BOOLEAN)');
    console.log('   - owner_approved (BOOLEAN)');
    console.log('   - owner_contact_info (TEXT)');
    console.log('   - owner_notes (TEXT)\n');
    
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 Alternative: Run this SQL manually in Supabase Dashboard → SQL Editor:');
    console.error(`
ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[];
ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT;
    `);
    process.exit(1);
  }
}

migrate();
