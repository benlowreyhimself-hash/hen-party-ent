
import { createAdminClient } from './admin';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid'; // Need uuid or random string? I'll use random text or crypto.
import crypto from 'crypto';

// Helper to generate unique filename
function generateFilename(extension: string = 'jpg') {
    return `${crypto.randomUUID()}.${extension}`;
}

export async function enrichHouseImages() {
    const supabase = createAdminClient();

    console.log('📸 Starting SMART Image Enrichment (Scrape + JSON-LD + Upload)...');

    // Fetch houses with website but NO photos_extracted (flag to avoid retrying failures endlessly in this loop?)
    // Or just image_url is null
    const { data: houses, error } = await supabase
        .from('houses')
        .select('id, title, website_url')
        .is('image_url', null)
        .not('website_url', 'is', null)
        .neq('website_url', '')
        .order('created_at', { ascending: false }) // Process newest (Gemini ones) first
        .limit(30);

    if (error) {
        console.error('❌ Error fetching houses:', error);
        return;
    }

    if (!houses || houses.length === 0) {
        console.log('✅ No houses found needing image enrichment.');
        return;
    }

    console.log(`Found ${houses.length} houses to process.`);

    let successCount = 0;
    let failCount = 0;

    for (const house of houses) {
        console.log(`\nProcessing: ${house.title}`);
        console.log(`   URL: ${house.website_url}`);

        try {
            const sourceImageUrl = await extractImageFromSite(house.website_url);

            if (sourceImageUrl) {
                console.log(`   Found Image URL: ${sourceImageUrl}`);

                // Download and Upload to Supabase
                const finalUrl = await downloadAndUploadImage(supabase, sourceImageUrl, house.id);

                if (finalUrl) {
                    // Update database
                    const { error: updateError } = await supabase
                        .from('houses')
                        .update({
                            image_url: finalUrl,
                            photos_extracted: true,
                            photos_stored_in_blob: true
                        })
                        .eq('id', house.id);

                    if (updateError) {
                        console.error(`   ❌ DB Update Failed: ${updateError.message}`);
                        failCount++;
                    } else {
                        console.log(`   ✅ Success! Image saved.`);
                        successCount++;
                    }
                } else {
                    console.error(`   ❌ Download/Upload Failed`);
                    failCount++;
                }

            } else {
                console.log('   ⚠️ No suitable image found on site.');
                // Mark as attempted?
                failCount++;
            }
        } catch (err: any) {
            console.error(`   ❌ Error: ${err.message}`);
            failCount++;
        }

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`\n🎉 Enrichment Complete. Success: ${successCount}, Failed: ${failCount}`);
}

async function extractImageFromSite(url: string | null): Promise<string | null> {
    if (!url) return null;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // 1. OG Image (Standard)
        let image = $('meta[property="og:image"]').attr('content');
        if (isValidImage(image)) return resolveUrl(image!, url);

        // 2. Twitter Image
        image = $('meta[name="twitter:image"]').attr('content');
        if (isValidImage(image)) return resolveUrl(image!, url);

        // 3. JSON-LD (Schema.org) using Cheerio
        let jsonLdImage: string | null = null;
        $('script[type="application/ld+json"]').each((i, elem) => {
            if (jsonLdImage) return; // found one
            try {
                const jsonText = $(elem).html();
                if (!jsonText) return;
                const data = JSON.parse(jsonText);

                // Helper to check object for image
                const checkObj = (obj: any) => {
                    if (!obj) return null;
                    if (typeof obj.image === 'string') return obj.image;
                    if (Array.isArray(obj.image) && obj.image.length > 0) return obj.image[0];
                    if (obj.image && typeof obj.image.url === 'string') return obj.image.url;
                    return null;
                };

                // Check root
                let img = checkObj(data);
                if (img) { jsonLdImage = img; return; }

                // Check graph
                if (data['@graph'] && Array.isArray(data['@graph'])) {
                    for (const node of data['@graph']) {
                        img = checkObj(node);
                        if (img) { jsonLdImage = img; return; }
                    }
                }
            } catch (e) { }
        });
        if (isValidImage(jsonLdImage)) return resolveUrl(jsonLdImage!, url);

        // 4. Link rel=image_src
        image = $('link[rel="image_src"]').attr('href');
        if (isValidImage(image)) return resolveUrl(image!, url);

        // 5. Hero Image heuristics (risky but better than nothing?)
        // Look for first large img?
        // Skip for now to assume "Official Marketing Image" means metadata.

        return null;

    } catch (error) {
        throw error;
    }
}

function isValidImage(url?: string | null): boolean {
    if (!url) return false;
    if (url.includes('logo')) return false; // Basic filter
    return true;
}

function resolveUrl(relativeUrl: string, baseUrl: string): string {
    try {
        return new URL(relativeUrl, baseUrl).toString();
    } catch {
        return relativeUrl;
    }
}

async function downloadAndUploadImage(supabase: any, imageUrl: string, houseId: string): Promise<string | null> {
    try {
        // Download
        const response = await fetch(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) throw new Error(`Image download failed: ${response.status}`);

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();

        // Detect extension from content-type or url
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        let ext = 'jpg';
        if (contentType.includes('png')) ext = 'png';
        else if (contentType.includes('webp')) ext = 'webp';

        const filename = `gemini-imports/${houseId}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

        // Upload
        const { data, error } = await supabase
            .storage
            .from('hen-party-media')
            .upload(filename, buffer, {
                contentType: contentType,
                upsert: true
            });

        if (error) {
            console.error('   Storage Upload Error:', error);
            return null;
        }

        // Get Public URL
        const { data: publicData } = supabase
            .storage
            .from('hen-party-media')
            .getPublicUrl(filename);

        return publicData.publicUrl;

    } catch (e: any) {
        console.error('   Download/Upload Error:', e.message);
        return null;
    }
}
