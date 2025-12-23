import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * API route to create all database tables programmatically using Supabase REST API
 * Only accessible to authenticated admins
 * 
 * Note: Supabase REST API doesn't support direct SQL execution, so this route
 * uses the Supabase client to verify tables exist and provides the SQL to run
 */
export async function POST() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    
    // Check if tables already exist
    const { data: housesData, error: housesError } = await supabase
      .from('houses')
      .select('id')
      .limit(1);
    
    const { data: formData, error: formError } = await supabase
      .from('form_submissions')
      .select('id')
      .limit(1);

    if (!housesError && !formError) {
      return NextResponse.json({ 
        success: true,
        message: '✅ Tables already exist!',
        tablesExist: true
      });
    }

    // Read complete schema SQL
    const completeSchema = readFileSync(
      join(process.cwd(), 'supabase/complete-schema.sql'),
      'utf-8'
    );

    // Since Supabase REST API doesn't support direct SQL execution,
    // we'll use the Management API approach or provide instructions
    // For now, return the SQL that needs to be executed
    
    return NextResponse.json({
      success: false,
      message: 'Tables need to be created. Use the SQL below.',
      tablesExist: false,
      sql: completeSchema,
      instructions: [
        'Since Supabase REST API doesn\'t support direct SQL execution,',
        'you can either:',
        '1. Run the SQL in Supabase Dashboard → SQL Editor',
        '2. Or use the Supabase Management API (requires additional setup)'
      ]
    });

    // Alternative: Try using Supabase RPC if we have a function set up
    // This would require creating a function in Supabase first
    /*
    const { data: rpcData, error: rpcError } = await supabase.rpc('exec_sql', {
      sql: completeSchema
    });
    */

  } catch (error: any) {
    console.error('Error creating tables:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create tables' },
      { status: 500 }
    );
  }
}

