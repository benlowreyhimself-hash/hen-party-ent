import { put, list, del, head } from '@vercel/blob';
import { createAdminClient } from '@/lib/supabase/admin';

const BLOB_STORE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Upload an image to Vercel Blob Storage
 * @param file - File object or Buffer
 * @param filename - Optional custom filename
 * @returns Public URL of uploaded image
 */
export async function uploadImage(
  file: File | Buffer,
  filename?: string
): Promise<string> {
  if (!BLOB_STORE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured. Add it to .env.local');
  }

  const blob = await put(filename || `image-${Date.now()}.jpg`, file, {
    access: 'public',
    token: BLOB_STORE_TOKEN,
  });

  return blob.url;
}

/**
 * Upload image from URL (downloads and uploads to Blob)
 * @param imageUrl - Source image URL
 * @param filename - Optional custom filename
 * @returns Public URL of uploaded image
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  filename?: string
): Promise<string> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine file extension from URL or content type
    const urlPath = new URL(imageUrl).pathname;
    const extension = urlPath.match(/\.(jpg|jpeg|png|webp|gif)$/i)?.[1] || 'jpg';
    const finalFilename = filename || `image-${Date.now()}.${extension}`;

    return await uploadImage(buffer, finalFilename);
  } catch (error: any) {
    console.error(`Error uploading image from URL ${imageUrl}:`, error.message);
    throw error;
  }
}

/**
 * Delete an image from Vercel Blob Storage
 * @param url - Blob URL to delete
 */
export async function deleteImage(url: string): Promise<void> {
  if (!BLOB_STORE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured');
  }

  try {
    await del(url, { token: BLOB_STORE_TOKEN });
  } catch (error: any) {
    console.error(`Error deleting image ${url}:`, error.message);
    throw error;
  }
}

/**
 * List all images in blob storage (for admin purposes)
 */
export async function listImages(): Promise<Array<{ url: string; uploadedAt: Date }>> {
  if (!BLOB_STORE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN not configured');
  }

  const { blobs } = await list({ token: BLOB_STORE_TOKEN });
  return blobs.map(blob => ({
    url: blob.url,
    uploadedAt: blob.uploadedAt,
  }));
}

/**
 * Check if an image URL is from Vercel Blob
 */
export function isBlobUrl(url: string): boolean {
  return url.includes('blob.vercel-storage.com') || url.includes('public.blob.vercel-storage.com');
}

/**
 * Get optimized image URL for Next.js Image component
 * Vercel Blob URLs work directly with Next.js Image
 */
export function getOptimizedImageUrl(url: string, width?: number, quality?: number): string {
  if (isBlobUrl(url)) {
    // Vercel Blob URLs work directly with Next.js Image optimization
    return url;
  }
  // For non-blob URLs, return as-is (Next.js will handle optimization)
  return url;
}

