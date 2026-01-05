import { getPopularQueries } from '../lib/gsc';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
    try {
        console.log('Testing GSC Connection...');
        const rows = await getPopularQueries();

        console.log(`\n✅ Success! Retrieved ${rows.length} queries.`);

        if (rows.length > 0) {
            console.log('\nTop 10 Popular Search Queries:');
            console.log('--------------------------------');
            rows.slice(0, 10).forEach((row, i) => {
                console.log(`${i + 1}. "${row.keys?.[0]}" - Clicks: ${row.clicks}, Impressions: ${row.impressions}, Avg Pos: ${row.position?.toFixed(1)}`);
            });
        } else {
            console.log('No queries found in the last 30 days. Site might be too new.');
        }

    } catch (error: any) {
        console.error('\n❌ Failed to fetch GSC data:');
        console.error(error.message);
        if (error.response) {
            console.error('API Response:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

run();
