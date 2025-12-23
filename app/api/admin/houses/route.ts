import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getAllHouses } from '@/lib/supabase/houses';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const houses = await getAllHouses();
    return NextResponse.json({ houses });
  } catch (error: any) {
    console.error('Error fetching houses:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
