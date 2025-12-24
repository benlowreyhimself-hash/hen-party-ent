
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET_NAME = 'hen-party-media';

const KEEP_LIST = [
    'originals/hero-background.jpeg',
    'originals/ben-profile.png',
    'originals/session-1.jpeg',
    'originals/session-2.jpeg',
    'originals/session-3.jpeg',
    'originals/session-4.jpeg'
];

async function cleanupStorage() {
    console.log("🧹 Starting Recursive Storage Cleanup...");

    let hasMore = true;
    while (hasMore) {
        // 1. List files (Supabase list only returns up to 1000)
        const { data: files, error: listError } = await supabase.storage
            .from(BUCKET_NAME)
            .list('originals', { limit: 1000 }); // Large batches

        if (listError) {
            console.error("❌ Failed to list files:", listError.message);
            break;
        }

        if (!files || files.length === 0) {
            console.log("✨ Storage is empty.");
            break;
        }

        const filesToDelete = files
            .map(f => `originals/${f.name}`)
            .filter(path => !KEEP_LIST.includes(path));

        if (filesToDelete.length === 0) {
            // If all files in this batch are in the KEEP_LIST, but there might be more...
            // Actually, 'list' doesn't support offset easily, it's paginated by folder.
            // But if we delete what we find, eventually we'll only have the KEEP_LIST left.
            console.log("No more files to delete in this batch.");
            hasMore = false;
            // Wait, if all 100 files in this batch are kept, we'll exit but might have thousands more.
            // Let's use a larger limit and check if the total returned is less than the limit to stop.
            break;
        }

        console.log(`🗑️ Deleting ${filesToDelete.length} files...`);

        const { error: deleteError } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(filesToDelete);

        if (deleteError) {
            console.error("❌ Failed to delete files:", deleteError.message);
            break;
        }

        console.log(`✅ Deleted ${filesToDelete.length} files.`);

        if (files.length < 100) hasMore = false;
    }

    console.log("🏁 Cleanup Complete.");
}

cleanupStorage();
