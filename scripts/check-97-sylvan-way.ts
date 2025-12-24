
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkEnrichment() {
    const { data, error } = await supabase
        .from('houses')
        .select('title, slug, website_url, airbnb_url, booking_com_url, vrbo_url, other_booking_url')
        .eq('slug', '97-sylvan-way')
        .single();

    if (error) {
        console.error('Error fetching property:', error);
        return;
    }

    console.log('Booking Links for 97 Sylvan Way:');
    console.log(JSON.stringify(data, null, 2));
}

checkEnrichment();
