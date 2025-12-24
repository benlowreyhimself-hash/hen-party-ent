
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role to bypass RLS for this test

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('Checking if "content" column is accessible...');

    // Try to select 'content' from the first house
    const { data, error } = await supabase
        .from('houses')
        .select('id, title, content')
        .limit(1);

    if (error) {
        console.error('❌ Error fetching content:', error);
        if (error.code === 'PGRST204' || error.message.includes('column')) {
            console.log('   Confirmed: "content" column is missing from Schema Cache.');
        }
    } else {
        console.log('✅ Successfully fetched content column.');
        console.log('Sample:', data);
    }
}

checkSchema();
