
import { getHouseBySlug } from './houses';

async function main() {
    console.log('Testing getHouseBySlug...');
    // Try to fetch a known slug. 
    // From previous output, we saw slugs like 'ashridge-house-devon', 'widcombe-grange-somerset'
    // I'll try one that likely exists from the seed data.
    const slug = 'ashridge-house-devon';

    try {
        const house = await getHouseBySlug(slug);
        if (house) {
            console.log(`✅ Successfully fetched house: ${house.title} (${house.slug})`);
            console.log(`   Image: ${house.image_url}`);
        } else {
            console.log(`❌ House not found: ${slug}`);
        }
    } catch (e) {
        console.error('❌ Error fetching house:', e);
    }
}

main();
