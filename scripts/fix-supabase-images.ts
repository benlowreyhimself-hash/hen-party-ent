
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET_NAME = 'hen-party-media';

async function cleanupAndUpload() {
    console.log("Cleaning up old corrupted files in Supabase...");

    // 1. List all files in 'originals'
    const { data: filesInStorage, error: listError } = await supabase.storage
        .from(BUCKET_NAME)
        .list('originals', { limit: 1000 });

    if (filesInStorage && filesInStorage.length > 0) {
        const pathsToDelete = filesInStorage.map(f => `originals/${f.name}`);
        console.log(`Deleting ${pathsToDelete.length} files...`);
        await supabase.storage.from(BUCKET_NAME).remove(pathsToDelete);
    }

    console.log("Starting fresh upload of REAL high-res images...");

    const LOCAL_DIR = path.resolve(process.cwd(), "legacy-wordpress-backup", "wp-content", "uploads");

    // Recursively find real images
    function getFiles(dir: string, fileList: string[] = []) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                getFiles(fullPath, fileList);
            } else {
                if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(item).toLowerCase())) {
                    fileList.push(fullPath);
                }
            }
        }
        return fileList;
    }

    const allLocalFiles = getFiles(LOCAL_DIR);
    console.log(`Found ${allLocalFiles.length} real files locally.`);

    for (const filePath of allLocalFiles) {
        const fileName = path.basename(filePath);
        const fileBuffer = fs.readFileSync(filePath);

        // Check if it's a real photo (not 710 bytes)
        if (fileBuffer.length < 1000) {
            console.log(`Skipping corrupted local file: ${fileName}`);
            continue;
        }

        console.log(`Uploading Real Photo: ${fileName} (${Math.round(fileBuffer.length / 1024)} KB)...`);

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(`originals/${fileName}`, fileBuffer, {
                contentType: `image/${path.extname(fileName).slice(1).replace('jpg', 'jpeg')}`,
                upsert: true
            });

        if (error) console.error(`Failed ${fileName}:`, error.message);
    }
}

cleanupAndUpload();
