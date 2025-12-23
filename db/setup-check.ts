import * as dotenv from 'dotenv';
import { createAdminClient } from '../lib/supabase/admin';

dotenv.config({ path: '.env.local' });

async function checkSetup() {
  try {
    console.log('Checking Supabase database setup...\n');
    
    const supabase = createAdminClient();
    
    // Try to query the houses table
    const { data, error } = await supabase
      .from('houses')
      .select('id')
      .limit(1);
    
    if (!error) {
      console.log('✅ Houses table exists!');
      console.log('✅ Database is ready to use');
      return true;
    }
    
    if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
      console.log('❌ Houses table does not exist');
      console.log('\n📝 To create the table:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Select your project');
      console.log('   3. Go to SQL Editor');
      console.log('   4. Copy and paste the contents of supabase/schema.sql');
      console.log('   5. Click Run');
      console.log('\n   Or use: npm run db:setup (if implemented)');
      return false;
    }
    
    console.error('❌ Error checking database:', error.message);
    return false;
    
  } catch (error: any) {
    console.error('❌ Failed to check database:', error.message);
    return false;
  }
}

checkSetup()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

