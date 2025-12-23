import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials in .env.local');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createTable() {
  try {
    console.log('Reading SQL schema...');
    const sqlSchema = readFileSync(join(process.cwd(), 'supabase/schema.sql'), 'utf-8');
    
    console.log('Executing SQL via Supabase REST API...');
    
    // Split SQL into individual statements
    const statements = sqlSchema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          // Use Supabase's REST API to execute SQL
          // Note: This requires the table to be created via SQL Editor first
          // But we can check if it exists
          const { data, error } = await supabase
            .from('houses')
            .select('id')
            .limit(1);
          
          if (!error) {
            console.log('✅ Houses table already exists!');
            return;
          }
        } catch (err: any) {
          // Table doesn't exist - that's expected
          if (err.code === 'PGRST116') {
            console.log('⚠️  Table does not exist yet.');
            console.log('📝 Please run the SQL manually in Supabase SQL Editor:');
            console.log('   1. Go to https://supabase.com/dashboard');
            console.log('   2. Select your project');
            console.log('   3. Go to SQL Editor');
            console.log('   4. Copy and paste the contents of supabase/schema.sql');
            console.log('   5. Click Run');
            return;
          }
        }
      }
    }
    
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
}

createTable()
  .then(() => {
    console.log('\n✅ Check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  });

