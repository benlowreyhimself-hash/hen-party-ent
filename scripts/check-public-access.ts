
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a client with the ANON key (simulating a public user)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPublicAccess() {
    console.log('Checking public access with ANON key...');

    // Try to fetch published houses
    const { data, error, count } = await supabase
        .from('houses')
        .select('title', { count: 'exact' })
        .eq('is_published', true)
        .limit(5);

    if (error) {
        console.error('Error fetching with anon key:', error);
        return;
    }

    console.log(`Successfully fetched: ${count} houses`);
    console.log('Sample data:', data);

    if (count === 0) {
        console.log("❌ WARNING: Anon client sees 0 rows. RLS Policy is likely blocking public access.");
    } else {
        console.log("✅ SUCCESS: Anon client can see data.");
    }
}

checkPublicAccess();
