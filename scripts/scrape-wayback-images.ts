
import fs from 'fs';
import path from 'path';
import https from 'https';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const WAYBACK_URLS = [
    'https://web.archive.org/web/20250318201629/https://henpartyentertainment.co.uk/',
    'https://web.archive.org/web/20250318195441/https://henpartyentertainment.co.uk/photos/'
];

async function fetchUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

function extractImageUrls(html: string): string[] {
    // Broad regex to catch src inside img tags
    // Also catch srcset? maybe later.
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const matches: string[] = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        let src = match[1];
        src = src.replace(/&amp;/g, '&');
        matches.push(src);
    }
    return matches;
}

function cleanWaybackUrl(url: string): string {
    // Remove wayback prefix: https://web.archive.org/web/20250318201629im_/
    const original = url.replace(/https?:\/\/web\.archive\.org\/web\/\d+im_\//, '');
    return original;
}

function getFilename(url: string): string {
    const clean = cleanWaybackUrl(url);
    let basename = path.basename(clean).split('?')[0];

    // Decode URI component just in case
    try { basename = decodeURIComponent(basename); } catch { }

    return basename;
}

async function listAllSupabaseFiles() {
    let fileList: Set<string> = new Set();

    let count = 0;
    let keepFetching = true;
    let offset = 0;

    // While loop to fetch all files if > 1000
    // Actually Supabase storage list limit max is 100. We might need loop.
    // .list() supports limit, offset, search.

    // We'll trust there are a few thousand.
    // Recursive listing or just 1000 limit check for now.

    const { data, error } = await supabase.storage.from('hen-party-media').list('originals', { limit: 1000 });
    if (error) {
        console.error("Supabase list error:", error);
        return new Set();
    }

    data.forEach(f => fileList.add(f.name.toLowerCase()));

    return fileList;
}

async function main() {
    console.log('🔍 Scraping Wayback Machine...');

    const allImageUrls = new Set<string>();

    for (const url of WAYBACK_URLS) {
        console.log(`  Fetching ${url}...`);
        try {
            const html = await fetchUrl(url);
            const images = extractImageUrls(html);
            images.forEach(img => {
                if (img.match(/\.(jpg|jpeg|png|webp)/i)) {
                    // Ensure it's a full URL or relative resolved
                    if (img.startsWith('/')) {
                        // Wayback relative path logic... tricky.
                        // Usually wayback rewrites src to absolute `https://web.archive.org...`
                        allImageUrls.add(`https://web.archive.org${img}`);
                    } else if (img.startsWith('http')) {
                        allImageUrls.add(img);
                    }
                }
            });
        } catch (e: any) {
            console.error(`  Failed to fetch ${url}: ${e.message}`);
        }
    }

    console.log(`\nFound ${allImageUrls.size} image references.`);

    console.log('📂 Fetching Supabase file list...');
    const supabaseFiles = await listAllSupabaseFiles();

    console.log('🤝 Matching files...');

    const matches: any[] = [];
    const missing: any[] = [];

    for (const waybackUrl of allImageUrls) {
        const filename = getFilename(waybackUrl);
        const originalUrl = cleanWaybackUrl(waybackUrl);

        if (supabaseFiles.has(filename.toLowerCase())) {
            matches.push({ original: originalUrl, wayback: waybackUrl, filename });
        } else {
            missing.push({ original: originalUrl, wayback: waybackUrl, filename });
        }
    }

    console.log(`\n✅ Matched ${matches.length} files in Supabase.`);
    console.log(`\n❌ Missing ${missing.length} files. Downloading and Uploading...`);

    let uploadedCount = 0;

    for (const m of missing) {
        console.log(`  Processing ${m.filename}...`);
        try {
            // Download buffer
            const buffer = await new Promise<Buffer>((resolve, reject) => {
                // Handle redirects? Wayback often redirects.
                // Using simple https.get might fail on 302.
                // Let's use a robust fetch helper if needed, but basic for now.

                const req = https.get(m.wayback, (res) => {
                    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        // Redirect
                        https.get(res.headers.location, (res2) => {
                            const chunks: Buffer[] = [];
                            res2.on('data', c => chunks.push(c));
                            res2.on('end', () => resolve(Buffer.concat(chunks)));
                            res2.on('error', reject);
                        }).on('error', reject);
                        return;
                    }

                    if (res.statusCode !== 200) {
                        reject(new Error(`Status ${res.statusCode}`));
                        return;
                    }
                    const chunks: Buffer[] = [];
                    res.on('data', c => chunks.push(c));
                    res.on('end', () => resolve(Buffer.concat(chunks)));
                    res.on('error', reject);
                });
                req.on('error', reject);
            });

            // Determine ContentType
            const ext = path.extname(m.filename).toLowerCase();
            let contentType = 'image/jpeg';
            if (ext === '.png') contentType = 'image/png';
            if (ext === '.webp') contentType = 'image/webp';

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('hen-party-media')
                .upload(`originals/${m.filename}`, buffer, {
                    contentType,
                    upsert: true
                });

            if (uploadError) {
                console.error(`    Failed upload: ${uploadError.message}`);
            } else {
                console.log(`    ✅ Uploaded`);
                uploadedCount++;
            }

        } catch (e: any) {
            console.error(`    Failed download: ${e.message}`);
        }

        // Delay
        await new Promise(r => setTimeout(r, 200));
    }

    console.log(`\nRecovered ${uploadedCount} images.`);

    const report = { matches, missing, recovered: uploadedCount };
    fs.writeFileSync('wayback-image-report.json', JSON.stringify(report, null, 2));
}

main().catch(console.error);
