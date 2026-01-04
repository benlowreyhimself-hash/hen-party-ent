
import { createAdminClient } from './admin';

async function main() {
    try {
        const supabase = createAdminClient();
        console.log('Testing connection...');

        const { count, error } = await supabase
            .from('houses')
            .select('*', { count: 'exact', head: true });

        console.log('Total houses:', count);
        if (error) console.error(error);

        const { data: nullImages, error: nullError } = await supabase
            .from('houses')
            .select('id')
            .is('image_url', null)
            .not('website_url', 'is', null);

        console.log('Houses with null image:', nullImages?.length);
        if (nullError) console.error(nullError);

    } catch (e) {
        console.error(e);
    }
}

main();
