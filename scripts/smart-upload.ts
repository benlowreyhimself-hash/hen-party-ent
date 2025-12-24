
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET_NAME = 'hen-party-media';

async function smartUpload() {
    console.log("🚀 Starting Smart Media Upload...");

    const LOCAL_DIR = path.resolve(process.cwd(), "legacy-wordpress-backup", "wp-content", "uploads");

    // 1. Helper to find files recursively
    function getFiles(dir: string, fileList: string[] = []) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                getFiles(fullPath, fileList);
            } else {
                const ext = path.extname(item).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                    // SKIP THUMBNAILS (e.g. image-150x150.jpg)
                    if (!item.match(/-[0-9]+x[0-9]+\.(jpg|jpeg|png|webp)$/)) {
                        fileList.push(fullPath);
                    }
                }
            }
        }
        return fileList;
    }

    const allLocalFiles = getFiles(LOCAL_DIR);
    console.log(`📦 Found ${allLocalFiles.length} original high-res files locally.`);

    // 2. Identify and Route
    for (const filePath of allLocalFiles) {
        const fileName = path.basename(filePath);
        const fileBuffer = fs.readFileSync(filePath);

        // Safety check size
        if (fileBuffer.length < 1000) continue;

        // DETERMINATION: Is it censored?
        const isCensored = fileName.toLowerCase().includes('marketing') ||
            fileName.toLowerCase().includes('censored') ||
            fileName.toLowerCase().includes('star');

        const folder = isCensored ? 'marketing-censored' : 'originals';
        const storagePath = `${folder}/${fileName}`;

        console.log(`📤 [${folder}] ${fileName} (${Math.round(fileBuffer.length / 1024)} KB)...`);

        // Check if already exists in storage to avoid redundant uploads
        // (Optional: can just use upsert: true)

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, fileBuffer, {
                contentType: `image/${path.extname(fileName).slice(1).replace('jpg', 'jpeg')}`,
                upsert: true
            });

        if (error) {
            console.error(`❌ Failed ${fileName}:`, error.message);
        }
    }

    console.log("🏁 Smart Media Upload Complete.");
}

smartUpload();
