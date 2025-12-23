import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getHouseById, updateHouse, getAllHouses } from '@/lib/supabase/houses';
import { uploadImageFromUrl } from '@/lib/storage/blob';

/**
 * Migrate photos from external URLs to Vercel Blob Storage
 * POST /api/admin/migrate-photos
 * Body: { houseId?: string, houseIds?: string[] }
 */
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { houseId, houseIds } = body;

    // Single house migration
    if (houseId) {
      const house = await getHouseById(houseId);
      if (!house) {
        return NextResponse.json({ error: 'House not found' }, { status: 404 });
      }

      const result = await migrateHousePhotos(house);
      return NextResponse.json({
        success: true,
        houseId: house.id,
        title: house.title,
        ...result,
      });
    }

    // Batch migration
    if (houseIds && Array.isArray(houseIds)) {
      const allHouses = await getAllHouses();
      const housesToMigrate = allHouses.filter(h => houseIds.includes(h.id));

      const results = [];
      for (const house of housesToMigrate) {
        try {
          const result = await migrateHousePhotos(house);
          results.push({
            houseId: house.id,
            title: house.title,
            success: true,
            ...result,
          });
        } catch (error: any) {
          results.push({
            houseId: house.id,
            title: house.title,
            success: false,
            error: error.message,
          });
        }
      }

      return NextResponse.json({
        success: true,
        results,
        summary: {
          total: results.length,
          successful: results.filter(r => r.success).length,
          failed: results.filter(r => !r.success).length,
        },
      });
    }

    return NextResponse.json(
      { error: 'houseId or houseIds array is required' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error migrating photos:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to migrate photos' },
      { status: 500 }
    );
  }
}

/**
 * Migrate photos for a single house
 */
async function migrateHousePhotos(house: any) {
  const photoFields = [
    { field: 'image_url', value: house.image_url },
    { field: 'photo_1_url', value: house.photo_1_url },
    { field: 'photo_2_url', value: house.photo_2_url },
    { field: 'photo_3_url', value: house.photo_3_url },
  ];

  const updates: any = {};
  let migratedCount = 0;
  let failedCount = 0;

  for (const { field, value } of photoFields) {
    if (!value) continue;

    // Skip if already a Blob URL
    if (value.includes('blob.vercel-storage.com')) {
      continue;
    }

    try {
      // Download and upload to Blob Storage
      const blobUrl = await uploadImageFromUrl(
        value,
        `${house.slug}-${field}-${Date.now()}.jpg`
      );
      updates[field] = blobUrl;
      migratedCount++;
    } catch (error: any) {
      console.error(`Failed to migrate ${field} for ${house.title}:`, error.message);
      // Keep original URL if migration fails
      failedCount++;
    }
  }

  // Update database if any photos were migrated
  if (migratedCount > 0) {
    updates.photos_stored_in_blob = true;
    await updateHouse(house.id, updates);
  }

  return {
    migrated: migratedCount,
    failed: failedCount,
    photos_stored_in_blob: migratedCount > 0,
  };
}

