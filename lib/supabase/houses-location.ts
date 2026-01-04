import { createAdminClient } from './admin';
import { getDrizzleDb } from '@/lib/drizzle/db';
import { houses } from '@/db/schema';
import { eq, and, or, desc, asc, isNotNull } from 'drizzle-orm';
import type { House, HouseInput } from './houses';
import { drizzleRowToHouse, selectExistingColumns } from './houses'; // Ensure these are exported

/**
 * Get houses by location name (e.g., "Bath", "Bristol")
 * public, used for location pages
 */
export async function getHousesByLocation(locationName: string): Promise<House[]> {
    const supabase = createAdminClient();

    // Normalize location name for flexible matching (optional)
    // For now, we assume strict matching or we rely on the input being correct

    const { data, error } = await supabase
        .from('houses')
        .select('*')
        .eq('is_published', true)
        .textSearch('location', locationName, { type: 'plain', config: 'english' }) // More flexible text search
        // .eq('location', locationName) // Strict match alternative
        .order('is_featured', { ascending: false })
        .order('address_verified', { ascending: false })
        .order('title', { ascending: true }); // Alphabetical

    if (error) {
        if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
            console.warn('⚠️  Supabase API cache stale, using direct drizzle fallback...');
            try {
                const db = getDrizzleDb();
                // Drizzle doesn't have easy full text search abstract, so we use ilike on location column or similar
                // Simple exact match for critical path fallback
                const result = await db
                    .select(selectExistingColumns)
                    .from(houses)
                    .where(and(eq(houses.is_published, true), eq(houses.location, locationName)))
                    .orderBy(desc(houses.is_featured), asc(houses.title));

                return result.map(row => ({
                    ...drizzleRowToHouse(row as any),
                    ben_visited_dates: null,
                    has_affiliate_relationship: false,
                    owner_approved: false,
                    owner_contact_info: null,
                    owner_notes: null,
                }));

            } catch (e) {
                console.error('Drizzle fallback failed', e);
                return [];
            }
        }
        console.error('Error fetching houses by location:', error);
        return [];
    }

    // If text search returns nothing, try simple eq match as backup
    if (!data || data.length === 0) {
        const { data: exactData } = await supabase
            .from('houses')
            .select('*')
            .eq('is_published', true)
            .eq('location', locationName);

        return exactData || [];
    }

    return data || [];
}
