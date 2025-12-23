import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createHouse, updateHouse, deleteHouse } from '@/lib/supabase/houses';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const house = await createHouse(body);

    if (!house) {
      return NextResponse.json({ error: 'Failed to create house' }, { status: 500 });
    }

    return NextResponse.json(house);
  } catch (error: any) {
    console.error('Error creating house:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'House ID required' }, { status: 400 });
    }

    const house = await updateHouse(id, updateData);

    if (!house) {
      return NextResponse.json({ error: 'Failed to update house' }, { status: 500 });
    }

    return NextResponse.json(house);
  } catch (error: any) {
    console.error('Error updating house:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'House ID required' }, { status: 400 });
    }

    const success = await deleteHouse(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete house' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting house:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

