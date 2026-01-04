import { createAdminClient } from './admin';

async function main() {
    const supabase = createAdminClient();

    console.log('🔍 Checking Schema / Data...');

    // Try to select the NEW columns from a known record or any record
    const { data: houses, error } = await supabase
        .from('houses')
        .select('id, title, ben_visited_dates, has_affiliate_relationship')
        .limit(3);

    if (error) {
        console.error('❌ Error fetching new columns:', error.message);
        if (error.message.includes('does not exist')) {
            console.error('   👉 The columns definitely do not exist in the database!');
        }
        return;
    }

    console.log('✅ Successfully selected new columns!');
    console.log('Sample Data:', JSON.stringify(houses, null, 2));
}

main().catch(console.error);
