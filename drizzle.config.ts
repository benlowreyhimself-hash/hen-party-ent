import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Prefer connection pooling URL (more secure and reliable)
const connectionString = process.env.DATABASE_POOLER_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Missing DATABASE_POOLER_URL or DATABASE_URL in .env.local');
}

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
