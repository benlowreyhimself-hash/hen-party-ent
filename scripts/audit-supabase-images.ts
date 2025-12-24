
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listAllFiles(bucket: string, folder: string = '') {
    let fileList: any[] = [];
    const { data, error } = await supabase.storage.from(bucket).list(folder, { limit: 1000 });

    if (error) {
        console.error(`Error listing folder ${folder}:`, error);
        return [];
    }

    for (const item of data) {
        if (item.id === null) {
            // It's a folder
            const subFiles = await listAllFiles(bucket, `${folder ? folder + '/' : ''}${item.name}`);
            fileList = [...fileList, ...subFiles];
        } else {
            fileList.push({ ...item, fullPath: `${folder ? folder + '/' : ''}${item.name}` });
        }
    }
    return fileList;
}

async function audit() {
    console.log('--- Starting Supabase Storage Audit ---');

    // 1. List all files in storage
    console.log('Listing files in hen-party-media...');
    const files = await listAllFiles('hen-party-media');
    console.log(`Found ${files.length} files in storage.`);

    // 2. Identify potential matches for "Ben with Glasses"
    const glassesCandidates = files.filter(f =>
        f.name.toLowerCase().includes('glass') ||
        f.name.toLowerCase().includes('ben') ||
        f.name.toLowerCase().includes('img') // many phone photos are IMG_xxxx
    );

    console.log('\nPotential "Ben with Glasses" candidates:');
    glassesCandidates.forEach(f => console.log(`- ${f.fullPath} (${(f.metadata.size / 1024).toFixed(1)} KB)`));

    // 3. TODO: In a real audit we would check DB usage, but for now we just want to see the mess.
    // We can see duplicates if we see same filenames in different folders or slight variations.

    // Write full list to file for review
    fs.writeFileSync('supabase-files.json', JSON.stringify(files, null, 2));
    console.log('\nFull file list written to supabase-files.json');
}

audit().catch(console.error);
