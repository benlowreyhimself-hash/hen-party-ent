import { getDrizzleDb } from '../lib/drizzle/db';
import { houses } from '../db/schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkRawAddressColumn() {
  try {
    const db = getDrizzleDb();
    
    // Attempt to select the raw_address column
    const result = await db.select({ rawAddress: houses.raw_address }).from(houses).limit(1);

    console.log(`✅ Drizzle successfully queried for 'raw_address' column.`);
    console.log(`First row's raw_address: ${result.length > 0 ? result[0].rawAddress : 'N/A (table empty)'}`);
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Drizzle failed to query 'raw_address' column: ${error.message}`);
    console.error(`This likely means the column does not exist in the database, or there's a connectivity issue.`);
    process.exit(1);
  }
}

checkRawAddressColumn();

