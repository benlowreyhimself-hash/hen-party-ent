import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * API route to set up the database schema
 * This uses Supabase's REST API to create tables
 * Note: Supabase doesn't allow direct SQL execution via REST API,
 * so this route checks if the table exists and provides instructions
 */
export async function POST() {
  try {
    const supabase = createAdminClient();
    
    // Check if table exists by trying to query it
    const { data, error } = await supabase
      .from('houses')
      .select('id')
      .limit(1);
    
    if (!error) {
      return NextResponse.json({
        success: true,
        message: '✅ Houses table already exists!',
        tableExists: true,
      });
    }
    
    // If error is "relation does not exist", table needs to be created
    if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
      // Read the SQL schema
      const sqlSchema = readFileSync(
        join(process.cwd(), 'supabase/schema.sql'),
        'utf-8'
      );
      
      return NextResponse.json({
        success: false,
        message: 'Table does not exist. Please create it using the SQL schema.',
        tableExists: false,
        instructions: [
          '1. Go to Supabase Dashboard → SQL Editor',
          '2. Copy the SQL from supabase/schema.sql',
          '3. Paste and run it in the SQL Editor',
        ],
        sql: sqlSchema,
      }, { status: 200 });
    }
    
    // Other error
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
    }, { status: 500 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to check database setup',
    }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}

