import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * API route to get the complete SQL schema
 */
export async function GET() {
  try {
    const sql = readFileSync(
      join(process.cwd(), 'supabase/complete-schema.sql'),
      'utf-8'
    );

    return NextResponse.json({ sql });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to read schema file' },
      { status: 500 }
    );
  }
}


