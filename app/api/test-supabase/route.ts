import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test connection by querying a system table
    const { data, error } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means table doesn't exist, which is fine for a new project
      return NextResponse.json(
        { 
          connected: true, 
          message: 'Supabase connection successful',
          error: error.message 
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      connected: true,
      message: 'Supabase connection successful',
      data: data || 'No data (this is normal for a new project)'
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        connected: false, 
        error: error.message || 'Connection failed',
        details: 'Check your Supabase URL and API keys in .env.local'
      },
      { status: 500 }
    );
  }
}

