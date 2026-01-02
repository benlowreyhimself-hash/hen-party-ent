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

async function uploadHeroImage() {
    const filePath = path.resolve(process.cwd(), 'new-hero-image.jpg');
    const fileName = 'hero-hen-party-group-drawing-class.jpg';
    
    console.log(`Uploading hero image: ${fileName}...`);
    
    const fileBuffer = fs.readFileSync(filePath);
    
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`originals/${fileName}`, fileBuffer, {
            contentType: 'image/jpeg',
            upsert: true
        });
    
    if (error) {
        console.error(`Error uploading ${fileName}:`, error.message);
        process.exit(1);
    } else {
        const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(`originals/${fileName}`);
        console.log(`✅ Uploaded successfully!`);
        console.log(`Public URL: ${publicUrl}`);
    }
}

uploadHeroImage();
