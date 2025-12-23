import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { uploadImageFromUrl } from '@/lib/storage/blob';
import { getAllHouses } from '@/lib/supabase/houses';
import { updateHouse } from '@/lib/supabase/houses';

/**
 * API route to migrate images from WordPress to Vercel Blob Storage
 * 
 * Usage: POST /api/admin/migrate-images
 * 
 * This will:
 * 1. Find all accommodations with WordPress image URLs
 * 2. Download each image
 * 3. Upload to Vercel Blob Storage
 * 4. Update database with new blob URLs
 */
export async function POST(request: Request) {
  try {
    // Check authentication (add your auth check here)
    // For now, this is a protected admin route

    const houses = await getAllHouses();
    const results = {
      total: houses.length,
      migrated: 0,
      failed: 0,
      skipped: 0,
      errors: [] as string[],
    };

    for (const house of houses) {
      try {
        const imageFields = [
          { field: 'image_url', value: house.image_url },
          { field: 'photo_1_url', value: house.photo_1_url },
          { field: 'photo_2_url', value: house.photo_2_url },
          { field: 'photo_3_url', value: house.photo_3_url },
        ];

        const updates: any = {};
        let hasUpdates = false;

        for (const { field, value } of imageFields) {
          if (!value) continue;

          // Check if already migrated (is blob URL)
          if (value.includes('blob.vercel-storage.com')) {
            results.skipped++;
            continue;
          }

          // Check if WordPress URL
          if (value.includes('henpartyentertainment.co.uk') || value.includes('i0.wp.com')) {
            try {
              console.log(`Migrating ${field} for ${house.title}: ${value}`);
              const blobUrl = await uploadImageFromUrl(
                value,
                `accommodations/${house.slug}-${field}.jpg`
              );
              updates[field] = blobUrl;
              hasUpdates = true;
              results.migrated++;
            } catch (error: any) {
              console.error(`Failed to migrate ${field} for ${house.title}:`, error.message);
              results.failed++;
              results.errors.push(`${house.title} - ${field}: ${error.message}`);
            }
          }
        }

        if (hasUpdates) {
          await updateHouse(house.id, updates);
          console.log(`✅ Updated ${house.title} with migrated images`);
        }
      } catch (error: any) {
        console.error(`Error processing ${house.title}:`, error.message);
        results.failed++;
        results.errors.push(`${house.title}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Image migration completed',
      results,
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

