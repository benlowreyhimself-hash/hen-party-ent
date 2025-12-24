
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET_NAME = 'hen-party-media';
const GEMS_DIR = path.resolve(process.cwd(), 'RECOVERED_GEMS');

async function setupAndUpload() {
    console.log(`Setting up Supabase Storage bucket: ${BUCKET_NAME}...`);

    // 1. Create bucket if it doesn't exist
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    });

    if (bucketError && bucketError.message !== 'Bucket already exists') {
        console.error('Failed to create bucket:', bucketError.message);
        // Continue anyway in case it exists but error was thrown
    } else {
        console.log('Bucket ready.');
    }

    // 2. Read images
    const files = fs.readdirSync(GEMS_DIR).filter(f =>
        ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase())
    );

    console.log(`Found ${files.length} images to upload.`);

    // 3. Upload first 50 images as a test
    const batch = files.slice(0, 50);

    for (const file of batch) {
        const filePath = path.join(GEMS_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);

        console.log(`Uploading ${file}...`);

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(`originals/${file}`, fileBuffer, {
                contentType: `image/${path.extname(file).slice(1).replace('jpg', 'jpeg')}`,
                upsert: true
            });

        if (error) {
            console.error(`Error uploading ${file}:`, error.message);
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(`originals/${file}`);
            console.log(`Uploaded! URL: ${publicUrl}`);
        }
    }
}

setupAndUpload();
