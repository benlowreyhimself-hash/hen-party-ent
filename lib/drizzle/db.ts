import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

let dbInstance: ReturnType<typeof drizzle> | null = null;

/**
 * Get Drizzle database instance with direct PostgreSQL connection
 * This bypasses Supabase REST API cache entirely
 */
export function getDrizzleDb() {
  if (dbInstance) {
    return dbInstance;
  }

  const connectionString = process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('Missing DATABASE_POOLER_URL or DATABASE_URL in .env.local');
  }

  const client = postgres(connectionString, { max: 10 });
  dbInstance = drizzle(client);
  
  return dbInstance;
}

