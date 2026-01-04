import { createClient } from './server';
import { createAdminClient } from './admin';
import { getRegionFromPostcode } from '@/lib/utils/postcode';
import { getDrizzleDb } from '@/lib/drizzle/db';
import { houses } from '@/db/schema';
import { eq, and, or, desc, asc, isNotNull } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';

type HouseRow = InferSelectModel<typeof houses>;

/**
 * Select only columns that exist in the database (excludes new venue tracking fields that may not exist yet)
 * This prevents errors when the database schema hasn't been migrated yet
 * 
 * Once migration is complete, you can add these fields:
 * - ben_visited_dates: houses.ben_visited_dates,
 * - has_affiliate_relationship: houses.has_affiliate_relationship,
 * - owner_approved: houses.owner_approved,
 * - owner_contact_info: houses.owner_contact_info,
 * - owner_notes: houses.owner_notes,
 */
export const selectExistingColumns = {
  id: houses.id,
  created_at: houses.created_at,
  updated_at: houses.updated_at,
  title: houses.title,
  slug: houses.slug,
  postcode: houses.postcode,
  region: houses.region,
  location: houses.location,
  address: houses.address,
  raw_address: houses.raw_address,
  verified_address: houses.verified_address,
  google_place_id: houses.google_place_id,
  description: houses.description,
  content: houses.content,
  features: houses.features,
  sleeps: houses.sleeps,
  image_url: houses.image_url,
  photo_1_url: houses.photo_1_url,
  photo_2_url: houses.photo_2_url,
  photo_3_url: houses.photo_3_url,
  website_url: houses.website_url,
  airbnb_url: houses.airbnb_url,
  booking_com_url: houses.booking_com_url,
  vrbo_url: houses.vrbo_url,
  other_booking_url: houses.other_booking_url,
  meta_title: houses.meta_title,
  meta_description: houses.meta_description,
  is_published: houses.is_published,
  is_featured: houses.is_featured,
  address_verified: houses.address_verified,
  booking_links_found: houses.booking_links_found,
  photos_extracted: houses.photos_extracted,
  photos_stored_in_blob: houses.photos_stored_in_blob,
  content_generated: houses.content_generated,
  enrichment_complete: houses.enrichment_complete,
  google_maps_url: houses.google_maps_url,
  // New venue tracking fields (will be added after migration)
  ben_visited_dates: houses.ben_visited_dates,
  has_affiliate_relationship: houses.has_affiliate_relationship,
  owner_approved: houses.owner_approved,
  owner_contact_info: houses.owner_contact_info,
  owner_notes: houses.owner_notes,
};

/**
 * Helper function to convert Drizzle row to House interface
 */
export function drizzleRowToHouse(row: HouseRow): House {
  return {
    id: row.id,
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    title: row.title,
    slug: row.slug,
    postcode: row.postcode,
    region: row.region,
    location: row.location,
    address: row.address,
    raw_address: row.raw_address,
    verified_address: row.verified_address,
    google_place_id: row.google_place_id,
    description: row.description,
    content: row.content,
    features: row.features,
    sleeps: row.sleeps,
    image_url: row.image_url,
    photo_1_url: row.photo_1_url,
    photo_2_url: row.photo_2_url,
    photo_3_url: row.photo_3_url,
    website_url: row.website_url,
    airbnb_url: row.airbnb_url,
    booking_com_url: row.booking_com_url,
    vrbo_url: row.vrbo_url,
    other_booking_url: row.other_booking_url,
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    is_published: row.is_published ?? false,
    is_featured: row.is_featured ?? false,
    address_verified: row.address_verified ?? false,
    booking_links_found: row.booking_links_found ?? false,
    photos_extracted: row.photos_extracted ?? false,
    photos_stored_in_blob: row.photos_stored_in_blob ?? false,
    content_generated: row.content_generated ?? false,
    enrichment_complete: row.enrichment_complete ?? false,
    booking_url: row.other_booking_url || row.airbnb_url || row.booking_com_url || row.vrbo_url || row.website_url,
    google_maps_url: row.google_maps_url,
    affiliate_link: row.affiliate_link || null,
    contact_email: row.contact_email || null,
    ben_visited_dates: row.ben_visited_dates || null,
    has_affiliate_relationship: row.has_affiliate_relationship || false,
    owner_approved: row.owner_approved || false,
    owner_contact_info: row.owner_contact_info || null,
    owner_notes: row.owner_notes || null,
  };
}

export interface House {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  postcode: string;
  region: string | null;
  location: string;
  address: string | null;
  raw_address: string | null;
  verified_address: string | null;
  google_place_id: string | null;
  description: string | null;
  content: string | null;
  features: string[] | null;
  sleeps: string | null;
  image_url: string | null;
  photo_1_url: string | null;
  photo_2_url: string | null;
  photo_3_url: string | null;
  website_url: string | null;
  airbnb_url: string | null;
  booking_com_url: string | null;
  vrbo_url: string | null;
  other_booking_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  is_featured: boolean;
  address_verified: boolean;
  booking_links_found: boolean;
  photos_extracted: boolean;
  photos_stored_in_blob: boolean;
  content_generated: boolean;
  enrichment_complete: boolean;
  booking_url: string | null;
  google_maps_url: string | null;
  affiliate_link: string | null;
  contact_email: string | null;
  ben_visited_dates: string[] | null;
  has_affiliate_relationship: boolean;
  owner_approved: boolean;
  owner_contact_info: string | null;
  owner_notes: string | null;
}

export interface HouseInput {
  title: string;
  slug: string;
  postcode: string;
  location: string;
  address?: string;
  description?: string;
  content?: string;
  features?: string[];
  image_url?: string;
  photo_1_url?: string;
  photo_2_url?: string;
  photo_3_url?: string;
  meta_title?: string;
  meta_description?: string;
  is_published?: boolean;
  is_featured?: boolean;
  booking_url?: string;
  google_maps_url?: string;
  ben_visited_dates?: string[];
  has_affiliate_relationship?: boolean;
  owner_approved?: boolean;
  owner_contact_info?: string;
  owner_notes?: string;
}

/**
 * Get limited published houses for homepage (performance optimized)
 * Only fetches what's needed - featured first, then others, max 6
 */
export async function getFeaturedHouses(limitCount: number = 6): Promise<House[]> {
  const supabase = createAdminClient();

  // Only show published houses with at least one booking link (verified holiday accommodations)
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('is_published', true)
    .or('website_url.not.is.null,airbnb_url.not.is.null,booking_com_url.not.is.null,vrbo_url.not.is.null,other_booking_url.not.is.null')
    .order('is_featured', { ascending: false })
    .order('address_verified', { ascending: false }) // Verified first
    .order('title', { ascending: true })
    .limit(limitCount);

  if (error) {
    // If schema cache error, fall back to Drizzle direct database connection
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      console.warn('⚠️  Supabase API cache stale, using direct database connection...');

      try {
        const db = getDrizzleDb();
        const result = await db
          .select(selectExistingColumns)
          .from(houses)
          .where(
            and(
              eq(houses.is_published, true),
              or(
                isNotNull(houses.website_url),
                isNotNull(houses.airbnb_url),
                isNotNull(houses.booking_com_url),
                isNotNull(houses.vrbo_url),
                isNotNull(houses.other_booking_url)
              )
            )
          )
          .orderBy(desc(houses.is_featured), desc(houses.address_verified), asc(houses.title))
          .limit(limitCount);

        // Convert Drizzle result to House format (with defaults for missing fields)
        return result.map(row => ({
          ...drizzleRowToHouse(row as any),
          ben_visited_dates: null,
          has_affiliate_relationship: false,
          owner_approved: false,
          owner_contact_info: null,
          owner_notes: null,
        }));
      } catch (drizzleError: any) {
        console.error('Drizzle fallback also failed:', drizzleError.message);
        // If it's a column error, the new fields don't exist yet - return empty array
        // The Supabase API should work once cache refreshes
        return [];
      }
    }

    return [];
  }

  return data || [];
}

/**
 * Get all published houses (public)
 * Uses admin client for static generation and to bypass RLS
 * Falls back to Drizzle direct database connection if Supabase API cache is stale
 */
export async function getPublishedHouses(): Promise<House[]> {
  const supabase = createAdminClient();

  // Only show published houses with at least one booking link (verified holiday accommodations)
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('is_published', true)
    // .or('website_url.not.is.null,airbnb_url.not.is.null,booking_com_url.not.is.null,vrbo_url.not.is.null,other_booking_url.not.is.null')
    .order('is_featured', { ascending: false })
    .order('address_verified', { ascending: false }) // Verified first
    .order('title', { ascending: true });

  if (error) {
    // If schema cache error, fall back to Drizzle direct database connection
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      console.warn('⚠️  Supabase API cache stale, using direct database connection...');

      try {
        const db = getDrizzleDb();
        const result = await db
          .select(selectExistingColumns)
          .from(houses)
          .where(
            and(
              eq(houses.is_published, true),
              or(
                isNotNull(houses.website_url),
                isNotNull(houses.airbnb_url),
                isNotNull(houses.booking_com_url),
                isNotNull(houses.vrbo_url),
                isNotNull(houses.other_booking_url)
              )
            )
          )
          .orderBy(desc(houses.is_featured), desc(houses.address_verified), asc(houses.title));

        // Convert Drizzle result to House format (with defaults for missing fields)
        return result.map(row => ({
          ...drizzleRowToHouse(row as any),
          ben_visited_dates: null,
          has_affiliate_relationship: false,
          owner_approved: false,
          owner_contact_info: null,
          owner_notes: null,
        }));
      } catch (drizzleError: any) {
        console.error('Drizzle fallback also failed:', drizzleError.message);
        return [];
      }
    }

    return [];
  }

  return data || [];
}

/**
 * Get all published house slugs for sitemap generation
 * Optimized to only fetch slugs, not full data
 */
export async function getPublishedHouseSlugs(): Promise<string[]> {
  const supabase = createAdminClient();

  // Only get published houses with booking links (verified holiday accommodations) for sitemap
  const { data, error } = await supabase
    .from('houses')
    .select('slug')
    .eq('is_published', true)
    .or('website_url.not.is.null,airbnb_url.not.is.null,booking_com_url.not.is.null,vrbo_url.not.is.null,other_booking_url.not.is.null');

  if (error) {
    // If schema cache error, fall back to Drizzle direct database connection
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      try {
        const db = getDrizzleDb();
        const result = await db
          .select({ slug: houses.slug })
          .from(houses)
          .where(and(eq(houses.is_published, true), eq(houses.address_verified, true)));

        return result.map(row => row.slug);
      } catch (drizzleError: any) {
        console.error('Drizzle fallback failed:', drizzleError.message);
        return [];
      }
    }

    return [];
  }

  return (data || []).map(house => house.slug);
}

/**
 * Get house by slug (public)
 * Uses admin client for static generation and to bypass RLS
 * Falls back to Drizzle direct database connection if Supabase API cache is stale
 */
export async function getHouseBySlug(slug: string): Promise<House | null> {
  const supabase = createAdminClient();

  // Show all published houses (not just verified)
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    // If schema cache error, fall back to Drizzle direct database connection
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      console.warn('⚠️  Supabase API cache stale, using direct database connection...');

      try {
        const db = getDrizzleDb();
        const result = await db
          .select(selectExistingColumns)
          .from(houses)
          .where(and(eq(houses.slug, slug), eq(houses.is_published, true)))
          .limit(1);

        if (result.length === 0) {
          return null;
        }

        // Convert with defaults for missing fields
        return {
          ...drizzleRowToHouse(result[0] as any),
          ben_visited_dates: null,
          has_affiliate_relationship: false,
          owner_approved: false,
          owner_contact_info: null,
          owner_notes: null,
        };
      } catch (drizzleError: any) {
        console.error('Drizzle fallback also failed:', drizzleError.message);
        return null;
      }
    }

    if (error.code === 'PGRST116') {
      // Normal 404 (0 rows found)
      console.warn(`House not found for slug: "${slug}"`);
      return null;
    }

    console.error(`Error fetching house with slug "${slug}":`, JSON.stringify(error, null, 2));
    return null;
  }

  return data;
}

/**
 * Get houses by region (public)
 * Uses admin client for static generation and to bypass RLS
 */
export async function getHousesByRegion(region: string): Promise<House[]> {
  const supabase = createAdminClient();

  // Only show published houses in region with at least one booking link (verified holiday accommodations)
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('is_published', true)
    .eq('region', region)
    .or('website_url.not.is.null,airbnb_url.not.is.null,booking_com_url.not.is.null,vrbo_url.not.is.null,other_booking_url.not.is.null')
    .order('address_verified', { ascending: false }) // Verified first
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching houses by region:', error);
    return [];
  }

  return data || [];
}

/**
 * Get all regions with house counts (public)
 */
export async function getRegionsWithCounts(): Promise<Array<{ region: string; count: number }>> {
  const houses = await getPublishedHouses();
  const regionCounts = new Map<string, number>();

  houses.forEach(house => {
    const region = house.region || 'Unknown';
    regionCounts.set(region, (regionCounts.get(region) || 0) + 1);
  });

  return Array.from(regionCounts.entries())
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => a.region.localeCompare(b.region));
}

/**
 * Get all houses (admin only)
 * Falls back to Drizzle direct database connection if Supabase API cache is stale
 */
export async function getAllHouses(): Promise<House[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // If schema cache error, try to work around it
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      console.warn('⚠️  Supabase API cache stale. Data exists but API cache needs refresh.');
      console.warn('   The 871 accommodations you imported are in the database.');
      console.warn('   Please refresh the schema cache in Supabase Dashboard:');
      console.warn('   Settings → API → Refresh Schema Cache');
      console.warn('   Or wait 1-5 minutes for automatic refresh.');

      // Try Drizzle fallback as last resort
      try {
        const db = getDrizzleDb();
        const result = await db
          .select(selectExistingColumns)
          .from(houses)
          .orderBy(desc(houses.created_at));

        console.log(`✅ Drizzle fallback successful: Found ${result.length} houses`);

        // Convert Drizzle result to House format (with defaults for missing fields)
        return result.map(row => ({
          ...drizzleRowToHouse(row as any),
          ben_visited_dates: null,
          has_affiliate_relationship: false,
          owner_approved: false,
          owner_contact_info: null,
          owner_notes: null,
        }));
      } catch (drizzleError: any) {
        console.error('Drizzle fallback failed:', drizzleError.message);
        // Return empty array - data exists but can't be accessed until cache refreshes
        return [];
      }
    }

    console.error('Error fetching all houses:', error);
    return [];
  }

  return data || [];
}

/**
 * Get house by ID (admin only)
 */
export async function getHouseById(id: string): Promise<House | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // If schema cache error, fall back to Drizzle direct database connection
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      console.warn('⚠️  Supabase API cache stale, using direct database connection...');

      try {
        const db = getDrizzleDb();
        const result = await db
          .select(selectExistingColumns)
          .from(houses)
          .where(eq(houses.id, id))
          .limit(1);

        if (result.length === 0) {
          return null;
        }

        // Convert with defaults for missing fields
        return {
          ...drizzleRowToHouse(result[0] as any),
          ben_visited_dates: null,
          has_affiliate_relationship: false,
          owner_approved: false,
          owner_contact_info: null,
          owner_notes: null,
        };
      } catch (drizzleError: any) {
        console.error('Drizzle fallback also failed:', drizzleError.message);
        return null;
      }
    }

    console.error('Error fetching house:', error);
    return null;
  }

  // Map Supabase data to House interface
  return drizzleRowToHouse(data as any);
}

/**
 * Create a new house (admin only)
 */
export async function createHouse(input: HouseInput): Promise<House | null> {
  const supabase = createAdminClient();

  // Auto-calculate region from postcode
  const region = getRegionFromPostcode(input.postcode);

  const { data, error } = await supabase
    .from('houses')
    .insert({
      ...input,
      region,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating house:', input.title, error);
    return null;
  }

  return data;
}

/**
 * Update a house (admin only)
 */
export async function updateHouse(id: string, input: Partial<HouseInput>): Promise<House | null> {
  const supabase = createAdminClient();

  // Auto-update region if postcode changed
  const updateData: any = { ...input };
  if (input.postcode) {
    updateData.region = getRegionFromPostcode(input.postcode);
  }

  const { data, error } = await supabase
    .from('houses')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    // If schema cache error, fall back to Drizzle direct database connection
    if (error.code === 'PGRST204' || error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      console.warn('⚠️  Supabase API cache stale during update, using direct database connection...');

      try {
        const db = getDrizzleDb();

        // Ensure input data matches schema columns
        // Drizzle ignores undefined values in set(), fortunately
        const result = await db
          .update(houses)
          .set({
            ...updateData,
            updated_at: new Date(),
          })
          .where(eq(houses.id, id))
          .returning();

        if (result.length === 0) {
          return null;
        }

        // Convert to House format
        return {
          ...drizzleRowToHouse(result[0] as any),
          // Default new fields if they don't exist in return type yet
          ben_visited_dates: null,
          has_affiliate_relationship: false,
          owner_approved: false,
          owner_contact_info: null,
          owner_notes: null,
        };
      } catch (drizzleError: any) {
        console.error('Drizzle fallback also failed:', drizzleError.message);
        return null;
      }
    }

    console.error('Error updating house:', error);
    return null;
  }

  return data;
}

/**
 * Delete a house (admin only)
 */
export async function deleteHouse(id: string): Promise<boolean> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('houses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting house:', error);
    return false;
  }

  return true;
}
