import sharp from 'sharp';
import { createAdminClient } from '@/lib/supabase/admin';

export class ImageProcessor {
    private supabase;

    constructor() {
        this.supabase = createAdminClient();
    }

    /**
     * Process and upload an image from a URL
     * @param imageUrl Source URL
     * @param slug Property slug for file naming
     * @param index Index for ordering (1, 2, 3...)
     */
    async processAndStoreImage(imageUrl: string, slug: string, index: number): Promise<string | null> {
        try {
            console.log(`[ImageProcessor] Processing ${imageUrl} for ${slug}...`);

            // Fetch image
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

            const buffer = await response.arrayBuffer();

            // Process with Sharp
            // Resize to max 1600px width, convert to WebP, 80% quality
            const processedBuffer = await sharp(Buffer.from(buffer))
                .resize(1600, 1200, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toBuffer();

            // Upload to Supabase
            const fileName = `accommodations/${slug}/photo-${index}-${Date.now()}.webp`;

            const { data, error } = await this.supabase
                .storage
                .from('hen-party-media')
                .upload(fileName, processedBuffer, {
                    contentType: 'image/webp',
                    upsert: true
                });

            if (error) {
                console.error(`[ImageProcessor] Supabase upload error:`, error);
                return null;
            }

            // Get Public URL
            const { data: { publicUrl } } = this.supabase
                .storage
                .from('hen-party-media')
                .getPublicUrl(fileName);

            console.log(`[ImageProcessor] Uploaded to ${publicUrl}`);
            return publicUrl;

        } catch (error) {
            console.error(`[ImageProcessor] Error processing image:`, error);
            return null;
        }
    }
}
