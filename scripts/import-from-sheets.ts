import * as dotenv from 'dotenv';
import { readGoogleSheet, listSheets } from '../lib/google-sheets/reader';
import { createHouse } from '../lib/supabase/houses';

dotenv.config({ path: '.env.local' });

// Extract spreadsheet ID from URL
// https://docs.google.com/spreadsheets/d/1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08/edit
const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

async function importFromSheets() {
  try {
    console.log('📊 Connecting to Google Sheets...\n');
    
    // List all available sheets
    console.log('Available sheets:');
    const sheets = await listSheets(SPREADSHEET_ID);
    sheets.forEach((sheet, index) => {
      console.log(`  ${index + 1}. ${sheet}`);
    });
    console.log('');
    
    // Read data from the first sheet (or specify a sheet name)
    const sheetName = process.argv[2] || sheets[0] || 'Sheet1';
    console.log(`Reading from sheet: "${sheetName}"\n`);
    
    const data = await readGoogleSheet(SPREADSHEET_ID, sheetName);
    
    if (data.length === 0) {
      console.log('⚠️  No data found in sheet');
      return;
    }
    
    // Display first few rows to understand structure
    console.log('📋 First 5 rows of data:');
    data.slice(0, 5).forEach((row, index) => {
      console.log(`  Row ${index + 1}:`, row);
    });
    console.log(`\n📊 Total rows: ${data.length}\n`);
    
    // If you want to import to database, uncomment and customize:
    /*
    console.log('🔄 Importing to database...\n');
    
    // Assuming first row is headers
    const headers = data[0];
    const rows = data.slice(1);
    
    for (const row of rows) {
      // Map row data to house structure
      // Adjust column indices based on your sheet structure
      const house = {
        title: row[0] || '',
        slug: row[1] || row[0]?.toLowerCase().replace(/\s+/g, '-') || '',
        location: row[2] || '',
        postcode: row[3] || '',
        address: row[4] || '',
        description: row[5] || '',
        content: row[6] || '',
        features: row[7]?.split(',').map(f => f.trim()) || [],
        image_url: row[8] || '',
        photo_1_url: row[9] || '',
        photo_2_url: row[10] || '',
        photo_3_url: row[11] || '',
        meta_title: row[12] || '',
        meta_description: row[13] || '',
        booking_url: row[14] || '',
        google_maps_url: row[15] || '',
        is_published: row[16]?.toLowerCase() === 'true' || false,
        is_featured: row[17]?.toLowerCase() === 'true' || false,
      };
      
      if (house.title) {
        try {
          await createHouse(house);
          console.log(`✅ Imported: ${house.title}`);
        } catch (error: any) {
          console.error(`❌ Failed to import ${house.title}:`, error.message);
        }
      }
    }
    
    console.log('\n✅ Import complete!');
    */
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('authentication')) {
      console.error('\n💡 Setup required:');
      console.error('   1. Get Google Sheets API key from: https://console.cloud.google.com/apis/credentials');
      console.error('   2. Add to .env.local: GOOGLE_SHEETS_API_KEY=your_key_here');
      console.error('   3. Enable Google Sheets API in Google Cloud Console');
      console.error('\n   OR use Service Account (for private sheets):');
      console.error('   1. Create service account in Google Cloud Console');
      console.error('   2. Download JSON key file');
      console.error('   3. Share the Google Sheet with service account email');
      console.error('   4. Add to .env.local: GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}');
    }
    process.exit(1);
  }
}

importFromSheets();

