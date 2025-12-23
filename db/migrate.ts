import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config({ path: '.env.local' });

// Get connection string from environment
// Prefer connection pooling URL (more secure and reliable for serverless)
const connectionString = process.env.DATABASE_URL || process.env.DATABASE_POOLER_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL or DATABASE_POOLER_URL not found in .env.local');
  console.error('\n📝 To set up:');
  console.error('   1. Go to Supabase Dashboard → Settings → Database');
  console.error('   2. Copy the Connection string');
  console.error('   3. For best security, use "Connection pooling" (Session mode)');
  console.error('   4. Add to .env.local as: DATABASE_POOLER_URL=postgresql://...');
  console.error('\n   Or use direct connection: DATABASE_URL=postgresql://...');
  process.exit(1);
}

console.log('Connecting to Supabase database...');
console.log('Using:', connectionString.includes('pooler') ? 'Connection Pooler ✅' : 'Direct Connection');

const client = postgres(connectionString, { 
  max: 1, // Single connection for migration
  ssl: 'require', // Always require SSL for security
  prepare: false, // Required for connection pooling
});

const db = drizzle(client, { schema });

async function migrate() {
  try {
    // Test connection
    await client`SELECT 1`;
    console.log('✅ Connected to database\n');
    
    console.log('Creating houses table...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS houses (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        postcode TEXT NOT NULL,
        region TEXT,
        location TEXT NOT NULL,
        address TEXT,
        raw_address TEXT,
        verified_address TEXT,
        google_place_id TEXT,
        description TEXT,
        content TEXT,
        features TEXT[],
        image_url TEXT,
        photo_1_url TEXT,
        photo_2_url TEXT,
        photo_3_url TEXT,
        website_url TEXT,
        airbnb_url TEXT,
        booking_com_url TEXT,
        vrbo_url TEXT,
        other_booking_url TEXT,
        meta_title TEXT,
        meta_description TEXT,
        is_published BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        address_verified BOOLEAN DEFAULT false,
        booking_links_found BOOLEAN DEFAULT false,
        photos_extracted BOOLEAN DEFAULT false,
        content_generated BOOLEAN DEFAULT false,
        enrichment_complete BOOLEAN DEFAULT false,
        google_maps_url TEXT,
        ben_visited_dates TEXT[],
        has_affiliate_relationship BOOLEAN DEFAULT false,
        owner_approved BOOLEAN DEFAULT false,
        owner_contact_info TEXT,
        owner_notes TEXT
      );
    `);
    console.log('✅ Houses table created');

    console.log('\nCreating form_submissions table...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        relation TEXT,
        occasion TEXT,
        region TEXT,
        group_size TEXT,
        duration TEXT,
        start_time TEXT,
        event_date TEXT,
        venue_type TEXT,
        full_address TEXT,
        message TEXT,
        source TEXT,
        method TEXT,
        enquiry_date TEXT
      );
    `);
    console.log('✅ Form submissions table created');

    console.log('\nCreating indexes...');
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_houses_slug ON houses(slug);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_houses_postcode ON houses(postcode);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_houses_region ON houses(region);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_houses_published ON houses(is_published);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);`);
    await db.execute(`CREATE INDEX IF NOT EXISTS idx_form_submissions_source ON form_submissions(source);`);
    console.log('✅ Indexes created');

    console.log('\nCreating update trigger...');
    await db.execute(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = TIMEZONE('utc', NOW());
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await db.execute(`
      DROP TRIGGER IF EXISTS update_houses_updated_at ON houses;
      CREATE TRIGGER update_houses_updated_at
        BEFORE UPDATE ON houses
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('✅ Update trigger created');

    console.log('\nSetting up Row Level Security...');
    await db.execute(`ALTER TABLE houses ENABLE ROW LEVEL SECURITY;`);

    await db.execute(`
      DROP POLICY IF EXISTS "Public can view published houses" ON houses;
      CREATE POLICY "Public can view published houses"
        ON houses FOR SELECT
        TO anon, authenticated
        USING (is_published = true);
    `);

    await db.execute(`
      DROP POLICY IF EXISTS "Admins can insert houses" ON houses;
      CREATE POLICY "Admins can insert houses"
        ON houses FOR INSERT
        TO authenticated
        WITH CHECK (true);
    `);

    await db.execute(`
      DROP POLICY IF EXISTS "Admins can update houses" ON houses;
      CREATE POLICY "Admins can update houses"
        ON houses FOR UPDATE
        TO authenticated
        USING (true)
        WITH CHECK (true);
    `);

    await db.execute(`
      DROP POLICY IF EXISTS "Admins can delete houses" ON houses;
      CREATE POLICY "Admins can delete houses"
        ON houses FOR DELETE
        TO authenticated
        USING (true);
    `);
    console.log('✅ RLS policies created');

    console.log('\nSetting up Row Level Security for form_submissions...');
    await db.execute(`ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;`);

    await db.execute(`
      DROP POLICY IF EXISTS "Public can insert form submissions" ON form_submissions;
      CREATE POLICY "Public can insert form submissions"
        ON form_submissions FOR INSERT
        TO anon, authenticated
        WITH CHECK (true);
    `);

    await db.execute(`
      DROP POLICY IF EXISTS "Admins can view form submissions" ON form_submissions;
      CREATE POLICY "Admins can view form submissions"
        ON form_submissions FOR SELECT
        TO authenticated
        USING (true);
    `);
    console.log('✅ Form submissions RLS policies created');

    console.log('\n✅ Database migration completed successfully!');
    console.log('✅ You can now use the admin panel at /admin/houses');
    
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    if (error.code === 'ENOTFOUND' || error.message.includes('getaddrinfo')) {
      console.error('\n💡 Connection issue. Please check:');
      console.error('   1. Connection string is correct in .env.local');
      console.error('   2. Database password is correct');
      console.error('   3. Network/firewall allows connection');
      console.error('   4. Try using Connection Pooling URL instead');
    }
    throw error;
  } finally {
    await client.end();
  }
}

migrate()
  .then(() => {
    console.log('\n✅ Setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Setup failed');
    process.exit(1);
  });
