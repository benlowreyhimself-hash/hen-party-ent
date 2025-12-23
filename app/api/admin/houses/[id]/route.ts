import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getHouseById, updateHouse } from '@/lib/supabase/houses';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const house = await getHouseById(id);
    
    if (!house) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 });
    }

    return NextResponse.json(house);
  } catch (error: any) {
    console.error('Error fetching house:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.slug || !body.postcode || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, postcode, location' },
        { status: 400 }
      );
    }

    const updated = await updateHouse(id, body);

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating house:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

