
import { createAdminClient } from './admin';

async function main() {
    const supabase = createAdminClient();

    // Check for duplicates
    const { data: houses, error } = await supabase
        .from('houses')
        .select('slug, title, id');

    if (error) {
        console.error(error);
        return;
    }

    const slugCounts: Record<string, number> = {};
    const sluggMap: Record<string, any[]> = {};

    houses?.forEach(h => {
        slugCounts[h.slug] = (slugCounts[h.slug] || 0) + 1;
        if (!sluggMap[h.slug]) sluggMap[h.slug] = [];
        sluggMap[h.slug].push(h);
    });

    const duplicates = Object.entries(slugCounts).filter(([_, count]) => count > 1);

    if (duplicates.length > 0) {
        console.log('❌ Duplicate slugs found:');
        duplicates.forEach(([slug, count]) => {
            console.log(`  - ${slug} (${count} times)`);
            console.log(`    IDs: ${sluggMap[slug].map((h: any) => h.id).join(', ')}`);
        });
    } else {
        console.log('✅ No duplicate slugs found.');
    }

    // Check for weird characters in slugs
    const weirdSlugs = houses?.filter(h => !/^[a-z0-9-]+$/.test(h.slug));
    if (weirdSlugs && weirdSlugs.length > 0) {
        console.log('⚠️ Slugs with potential issues (non-alphanumeric):');
        weirdSlugs.forEach(h => console.log(`  - ${h.slug} (${h.title})`));
    } else {
        console.log('✅ All slugs look standard (a-z0-9-).');
    }
}

main().catch(console.error);
