import { NextResponse } from 'next/server';
import { getRegionsWithCounts } from '@/lib/supabase/houses';

export async function GET() {
  try {
    const regions = await getRegionsWithCounts();
    
    return NextResponse.json({ regions });
  } catch (error: any) {
    console.error('Error fetching regions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch regions', regions: [] },
      { status: 500 }
    );
  }
}

