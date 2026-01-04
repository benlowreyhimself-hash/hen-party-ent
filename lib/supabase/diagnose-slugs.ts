
import { createAdminClient } from './admin';

async function main() {
    const supabase = createAdminClient();

    console.log('🔍 Diagnosing House Slugs...');

    // Fetch all houses
    const { data: houses, error } = await supabase
        .from('houses')
        .select('id, title, slug, is_published, website_url');

    if (error) {
        console.error('❌ Error fetching houses:', error);
        return;
    }

    console.log(`✅ Found ${houses.length} houses.`);

    // Check 1: Url-safe slugs
    const badSlugs = houses.filter(h => !/^[a-z0-9-]+$/.test(h.slug));
    if (badSlugs.length > 0) {
        console.log(`\n⚠️  ${badSlugs.length} Malformed Slugs (should be kebab-case):`);
        badSlugs.forEach(h => console.log(`  - "${h.slug}" (${h.title})`));
    } else {
        console.log('\n✅ All slugs are valid kebab-case.');
    }

    // Check 2: Duplicates
    const slugCounts: Record<string, number> = {};
    houses.forEach(h => { slugCounts[h.slug] = (slugCounts[h.slug] || 0) + 1; });
    const duplicates = Object.entries(slugCounts).filter(([, c]) => c > 1);
    if (duplicates.length > 0) {
        console.log(`\n❌ ${duplicates.length} Duplicate Slugs:`);
        duplicates.forEach(([slug, count]) => console.log(`  - "${slug}" (${count}x)`));
    } else {
        console.log('\n✅ No duplicate slugs found.');
    }

    // Check 3: Check a few random ones for publishing status
    const unpublished = houses.filter(h => !h.is_published);
    console.log(`\nℹ️  ${unpublished.length} houses are NOT published.`);
    if (unpublished.length > 0) {
        console.log('Sample unpublished:', unpublished.slice(0, 3).map(h => h.slug).join(', '));
    }
}

main().catch(console.error);
