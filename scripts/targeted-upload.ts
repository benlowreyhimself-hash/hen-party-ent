
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET_NAME = 'hen-party-media';

const TARGET_IMAGES = [
    {
        localPath: '2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg',
        storagePath: 'originals/hero-background.jpeg'
    },
    {
        localPath: '2020/04/0374AD0B-770A-4F85-B2AF-EC71E410CF05.png',
        storagePath: 'originals/ben-profile.png'
    },
    {
        localPath: '2017/07/C3CD1C3E-99D3-4572-BB39-06D19DA36311_1_201_a-1.jpeg',
        storagePath: 'originals/session-1.jpeg'
    },
    {
        localPath: '2019/11/BA76C206-80F2-421E-9E80-8C8F097EB5D3_1_201_a.jpeg',
        storagePath: 'originals/session-2.jpeg'
    },
    {
        localPath: '2020/04/Life-Drawing-Best-9-of-98-scaled.jpg',
        storagePath: 'originals/session-3.jpeg'
    },
    {
        localPath: '2020/04/84101C19-5C36-45B8-94AB-BF1A10F610D3_1_105_c.jpg',
        storagePath: 'originals/session-4.jpeg'
    }
];

async function targetedUpload() {
    console.log("🚀 Starting Targeted Media Upload...");

    const LOCAL_BASE = path.resolve(process.cwd(), "legacy-wordpress-backup", "wp-content", "uploads");

    for (const item of TARGET_IMAGES) {
        const fullLocalPath = path.join(LOCAL_BASE, item.localPath);

        if (!fs.existsSync(fullLocalPath)) {
            console.error(`❌ Local file not found: ${fullLocalPath}`);
            continue;
        }

        const fileBuffer = fs.readFileSync(fullLocalPath);
        const fileName = path.basename(fullLocalPath);
        const ext = path.extname(fileName).toLowerCase().slice(1).replace('jpg', 'jpeg');

        console.log(`📤 Uploading ${item.storagePath} (${Math.round(fileBuffer.length / 1024)} KB)...`);

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(item.storagePath, fileBuffer, {
                contentType: `image/${ext}`,
                upsert: true
            });

        if (error) {
            console.error(`❌ Failed ${item.storagePath}:`, error.message);
        } else {
            console.log(`✅ Success: ${item.storagePath}`);
        }
    }

    console.log("🏁 Targeted Upload Complete.");
}

targetedUpload();
