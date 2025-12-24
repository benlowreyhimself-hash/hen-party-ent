import * as cheerio from 'cheerio';

interface DiscoveredPhoto {
    url: string;
    alt: string;
    source: string;
    score: number; // 0-1 quality score based on heuristics
}

export class PhotoDiscoverer {
    /**
     * Find photos from a given URL
     */
    async findPhotos(url: string): Promise<DiscoveredPhoto[]> {
        try {
            // Basic validation
            if (!url || !url.startsWith('http')) {
                return [];
            }

            console.log(`[PhotoDiscoverer] Scanning ${url}...`);

            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!response.ok) {
                console.error(`[PhotoDiscoverer] Failed to fetch ${url}: ${response.status}`);
                return [];
            }

            const html = await response.text();
            const $ = cheerio.load(html);
            const photos: DiscoveredPhoto[] = [];

            // Strategy 1: Open Graph Image (usually best quality)
            const ogImage = $('meta[property="og:image"]').attr('content');
            if (ogImage) {
                photos.push({
                    url: ogImage,
                    alt: $('meta[property="og:title"]').attr('content') || 'Main property image',
                    source: 'og:image',
                    score: 0.95
                });
            }

            // Strategy 2: Airbnb specific
            if (url.includes('airbnb')) {
                // Airbnb heavily obfuscates, but sometimes meta/json-ld works
                $('img').each((i, el) => {
                    const src = $(el).attr('src') || $(el).attr('data-original-uri');
                    const alt = $(el).attr('alt') || '';

                    if (src && this.isHighQualityImage(src)) {
                        photos.push({
                            url: src,
                            alt,
                            source: 'airbnb_img',
                            score: 0.6
                        });
                    }
                });
            }

            // Strategy 3: Booking.com specific
            else if (url.includes('booking.com')) {
                $('a[href*=".jpg"], a[href*=".jpeg"]').each((i, el) => {
                    const href = $(el).attr('href');
                    if (href && !href.includes('user_avatar')) {
                        photos.push({
                            url: href,
                            alt: 'Booking.com photo',
                            source: 'booking_link',
                            score: 0.8
                        });
                    }
                });
            }

            // Strategy 4: Generic img tags
            $('img').each((i, el) => {
                const src = $(el).attr('src');
                const alt = $(el).attr('alt') || '';
                const width = parseInt($(el).attr('width') || '0');
                const height = parseInt($(el).attr('height') || '0');

                if (src && src.startsWith('http') && this.isHighQualityImage(src, width, height)) {
                    // Avoid duplicates
                    if (!photos.some(p => p.url === src)) {
                        photos.push({
                            url: src,
                            alt,
                            source: 'img_tag',
                            score: 0.5
                        });
                    }
                }
            });

            // Sort by score
            return photos.sort((a, b) => b.score - a.score).slice(0, 10);

        } catch (error) {
            console.error(`[PhotoDiscoverer] Error scanning ${url}:`, error);
            return [];
        }
    }

    private isHighQualityImage(url: string, width = 0, height = 0): boolean {
        const lowerUrl = url.toLowerCase();

        // Filter out common junk
        if (lowerUrl.includes('logo') || lowerUrl.includes('icon') || lowerUrl.includes('avatar') || lowerUrl.includes('profile')) {
            return false;
        }

        if (lowerUrl.endsWith('.svg') || lowerUrl.endsWith('.gif')) {
            return false;
        }

        // Check dimensions if available
        if (width > 0 && width < 400) return false;
        if (height > 0 && height < 300) return false;

        // Check specific URL patterns for known low-quality/thumbnails
        if (lowerUrl.includes('thumbnail') || lowerUrl.includes('small') || lowerUrl.includes('50x50')) {
            return false;
        }

        return true;
    }
}
