
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkCounts() {
    console.log('--- Checking House Counts ---');

    // Total Houses
    const { count: totalCount, error: err1 } = await supabase
        .from('houses')
        .select('*', { count: 'exact', head: true });

    if (err1) console.error('Error counting total:', err1);
    else console.log(`Total Houses in DB: ${totalCount}`);

    // Published Houses
    const { count: pubCount, error: err2 } = await supabase
        .from('houses')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

    if (err2) console.error('Error counting published:', err2);
    else console.log(`Published Houses: ${pubCount}`);

    // Verified Address Houses
    const { count: verifCount, error: err3 } = await supabase
        .from('houses')
        .select('*', { count: 'exact', head: true })
        .eq('address_verified', true);

    if (err3) console.error('Error counting verified:', err3);
    else console.log(`Address Verified Houses: ${verifCount}`);

    // With Google Maps URL
    const { count: mapCount, error: err4 } = await supabase
        .from('houses')
        .select('*', { count: 'exact', head: true })
        .not('google_maps_url', 'is', null);

    if (err4) console.error('Error counting maps:', err4);
    else console.log(`Houses with Google Maps URL: ${mapCount}`);
}

checkCounts();
