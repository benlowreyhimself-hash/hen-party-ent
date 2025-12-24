
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDb() {
    console.log('Checking database regions...');

    // Count houses with region
    const { count: withRegion, error } = await supabase
        .from('houses')
        .select('*', { count: 'exact', head: true })
        .not('region', 'is', null);

    console.log(`Houses with region populated: ${withRegion}`);

    const { data } = await supabase.from('houses').select('title, region, postcode').limit(5);
    console.log('Sample data:', data);
}

checkDb();
