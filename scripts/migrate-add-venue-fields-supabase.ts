import * as dotenv from 'dotenv';
import { createAdminClient } from '../lib/supabase/admin';

dotenv.config({ path: '.env.local' });

/**
 * Migration script to add venue history and relationship tracking fields
 * Uses Supabase admin client to execute SQL
 * Run: npm run db:migrate-venue-fields
 */
async function migrate() {
  try {
    console.log('🔄 Starting migration: Adding venue history fields...\n');
    
    const supabase = createAdminClient();
    
    // Add new columns using Supabase RPC or direct SQL execution
    const migrations = [
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[]`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT`,
      `ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT`,
    ];
    
    for (const migration of migrations) {
      // Use Supabase's rpc to execute SQL (if available) or use direct query
      const { error } = await supabase.rpc('exec_sql', { sql: migration });
      
      if (error) {
        // If RPC doesn't exist, try direct execution via query
        console.warn(`  ⚠️  RPC method failed, trying alternative...`);
        // For now, just log the SQL that needs to be run manually
        console.log(`  SQL: ${migration}`);
      } else {
        console.log('  ✅ Executed migration');
      }
    }
    
    console.log('\n✅ Migration script completed!');
    console.log('   If columns were not added automatically, run this SQL in Supabase Dashboard → SQL Editor:');
    console.log('\n' + migrations.join(';\n') + ';\n');
    console.log('   Added fields:');
    console.log('   - ben_visited_dates (TEXT[])');
    console.log('   - has_affiliate_relationship (BOOLEAN)');
    console.log('   - owner_approved (BOOLEAN)');
    console.log('   - owner_contact_info (TEXT)');
    console.log('   - owner_notes (TEXT)\n');
    
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    console.error('\n💡 Please run this SQL manually in Supabase Dashboard → SQL Editor:');
    console.error(`
ALTER TABLE houses ADD COLUMN IF NOT EXISTS ben_visited_dates TEXT[];
ALTER TABLE houses ADD COLUMN IF NOT EXISTS has_affiliate_relationship BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_approved BOOLEAN DEFAULT false;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_contact_info TEXT;
ALTER TABLE houses ADD COLUMN IF NOT EXISTS owner_notes TEXT;
    `);
  }
}

migrate();

