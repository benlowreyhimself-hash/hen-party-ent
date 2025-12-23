import { createClient } from './server';
import { createAdminClient } from './admin';
import { getRegionFromPostcode } from '@/lib/utils/postcode';

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
  description: string | null;
  content: string | null;
  features: string[] | null;
  image_url: string | null;
  photo_1_url: string | null;
  photo_2_url: string | null;
  photo_3_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  is_featured: boolean;
  booking_url: string | null;
  google_maps_url: string | null;
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
}

/**
 * Get all published houses (public)
 */
export async function getPublishedHouses(): Promise<House[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching houses:', error);
    return [];
  }

  return data || [];
}

/**
 * Get house by slug (public)
 */
export async function getHouseBySlug(slug: string): Promise<House | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching house:', error);
    return null;
  }

  return data;
}

/**
 * Get houses by region (public)
 */
export async function getHousesByRegion(region: string): Promise<House[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .eq('is_published', true)
    .eq('region', region)
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
 */
export async function getAllHouses(): Promise<House[]> {
  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
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
    console.error('Error fetching house:', error);
    return null;
  }

  return data;
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
    console.error('Error creating house:', error);
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

