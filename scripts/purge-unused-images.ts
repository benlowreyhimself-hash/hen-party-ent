
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
    console.log('🗑️  Starting cleanup...');

    // 1. Get whitelist from Wayback Report
    let whitelist = new Set<string>();
    if (fs.existsSync('wayback-image-report.json')) {
        const report = JSON.parse(fs.readFileSync('wayback-image-report.json', 'utf-8'));
        report.matches.forEach((m: any) => whitelist.add(m.filename.toLowerCase()));
        report.missing.forEach((m: any) => whitelist.add(m.filename.toLowerCase()));
    }
    console.log(`✅ Loaded ${whitelist.size} files from Wayback Report.`);

    // 2. Get whitelist from Database (Houses)
    console.log('🔍 Checking database for referenced images...');
    const { data: houses, error } = await supabase.from('houses').select('image_url');
    if (error) {
        console.error('Error fetching houses:', error);
        return;
    }

    houses.forEach(h => {
        if (h.image_url) {
            // Extract filename from URL
            const parts = h.image_url.split('/');
            const filename = parts[parts.length - 1];
            if (filename) whitelist.add(filename.toLowerCase());
        }
    });
    console.log(`✅ Whitelist size after DB check: ${whitelist.size}`);

    // 3. List Supabase Files (with Pagination)
    let allFiles: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    console.log('📂 Fetching file list from Supabase...');

    while (hasMore) {
        // Supabase list 'limit' is Max 100, but some clients support more. 
        // We will loop carefully.
        const { data, error } = await supabase.storage
            .from('hen-party-media')
            .list('originals', { limit: pageSize, offset: page * pageSize });

        if (error) {
            console.error('Error listing files:', error);
            break;
        }

        if (data && data.length > 0) {
            allFiles = [...allFiles, ...data];
            console.log(`   Fetched ${data.length} files (Page ${page}). Total: ${allFiles.length}`);

            if (data.length < pageSize) {
                // We fetched fewer than pageSize, so we are done
                hasMore = false;
            } else {
                page++;
            }
        } else {
            hasMore = false;
        }
    }

    console.log(`📂 Found TOTAL ${allFiles.length} files in Supabase 'originals'.`);

    // 4. Identify Deletions
    const toDelete: string[] = [];

    for (const file of allFiles) {
        // Skip .emptyFolderPlaceholder if exists
        if (file.name === '.emptyFolderPlaceholder') continue;

        // Check whitelist (case-insensitive)
        if (!whitelist.has(file.name.toLowerCase())) {
            toDelete.push(`originals/${file.name}`);
        }
    }

    console.log(`⚠️  Found ${toDelete.length} files to DELETE.`);

    // 5. Execute Delete
    if (toDelete.length > 0) {
        // Delete in batches of 100
        const batchSize = 100;
        for (let i = 0; i < toDelete.length; i += batchSize) {
            const batch = toDelete.slice(i, i + batchSize);
            console.log(`   Deleting batch ${i + 1} - ${Math.min(i + batchSize, toDelete.length)} / ${toDelete.length}...`);
            const { error: delError } = await supabase.storage.from('hen-party-media').remove(batch);
            if (delError) {
                console.error(`   ❌ Error deleting batch: ${delError.message}`);
            } else {
                await new Promise(r => setTimeout(r, 100));
            }
        }
        console.log('✅ Cleanup complete.');
    } else {
        console.log('✨ No files to delete.');
    }
}

main().catch(console.error);
