
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const TARGET_BEN_PHOTO = '84101C19-5C36-45B8-94AB-BF1A10F610D3_1_105_c.jpg';
const BEN_NEW_NAME = 'ben-bride-glasses.jpg';

async function renameFile(oldName: string, newName: string) {
    if (oldName === newName) return;

    console.log(`   Renaming ${oldName} -> ${newName}...`);

    // Supabase Storage doesn't have a direct 'rename'. We must move (copy + delete).
    const { data, error: moveError } = await supabase.storage
        .from('hen-party-media')
        .move(`originals/${oldName}`, `originals/${newName}`);

    if (moveError) {
        console.error(`   ❌ Move failed: ${moveError.message}`);
        return false;
    }

    console.log(`   ✅ Renamed successfully.`);
    return true;
}

async function getImageDescription(buffer: Buffer, mimeType: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
        "Describe this image in 3-5 words for a filename. Use hyphens. Lowercase. No file extension. Context: Hen Party Entertainment, Life Drawing. E.g. 'group-photo-drawing', 'ben-posing-model'.",
        {
            inlineData: {
                data: buffer.toString('base64'),
                mimeType
            }
        }
    ]);

    return result.response.text().trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

async function main() {
    console.log('🖼️  Starting AI Image Renaming...');

    // 1. List files
    const { data: files, error } = await supabase.storage.from('hen-party-media').list('originals', { limit: 1000 });
    if (error) throw error;

    console.log(`📂 Found ${files.length} files.`);

    for (const file of files) {
        if (file.name === '.emptyFolderPlaceholder') continue;

        let newName = '';

        // SPECIAL CASE: Ben's Photo
        if (file.name === TARGET_BEN_PHOTO) {
            console.log(`🎯 Found Ben's photo! Renaming immediately.`);
            await renameFile(file.name, BEN_NEW_NAME);
            continue;
        }

        // Skip if already renamed (heuristic)
        if (file.name.includes('hen-party') || file.name.includes('ben-bride')) {
            console.log(`   Skipping ${file.name} (already looks renamed)`);
            continue;
        }

        try {
            console.log(`   Processing ${file.name}...`);

            // Download
            const { data: blob, error: downloadError } = await supabase.storage
                .from('hen-party-media')
                .download(`originals/${file.name}`);

            if (downloadError) throw downloadError;

            const buffer = Buffer.from(await blob.arrayBuffer());
            const mimeType = file.metadata?.mimetype || 'image/jpeg';

            // Generate Name
            const slug = await getImageDescription(buffer, mimeType);

            // Append random string to avoid collisions if description is generic
            const unique = Math.random().toString(36).substring(2, 6);
            const ext = path.extname(file.name);
            newName = `hen-party-${slug}-${unique}${ext}`;

            await renameFile(file.name, newName);

            // Rate limit
            await new Promise(r => setTimeout(r, 1000));

        } catch (e: any) {
            console.error(`   ❌ Process failed for ${file.name}: ${e.message}`);
        }
    }

    console.log('✨ Image renaming complete.');
}

main().catch(console.error);
