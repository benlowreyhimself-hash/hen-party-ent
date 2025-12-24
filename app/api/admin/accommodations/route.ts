import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { updateHouse, getAllHouses } from '@/lib/supabase/houses';
import { auth } from '@clerk/nextjs/server';

// GET all houses (including unpublished) for admin
export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const houses = await getAllHouses();
        return NextResponse.json({ houses });
    } catch (error) {
        console.error('Admin fetch error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

// PUT to update house status
export async function PUT(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return new NextResponse('Missing ID', { status: 400 });
        }

        const updated = await updateHouse(id, updates);
        return NextResponse.json({ success: true, house: updated });
    } catch (error) {
        console.error('Admin update error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
