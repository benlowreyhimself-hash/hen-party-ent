import * as dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config({ path: '.env.local' });

// Your SEO keywords spreadsheet (now public)
const SPREADSHEET_ID = '1QMAwVqjnPO5nC_t7PDanBH5x65_1aEJQEypA1un4fAo';

async function readSEOKeywords() {
    try {
        console.log('📊 Connecting to Google Sheets...\n');

        // Use API key for public sheets
        const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
        if (!apiKey) {
            throw new Error('GOOGLE_SHEETS_API_KEY not set');
        }

        const sheets = google.sheets({ version: 'v4', auth: apiKey });

        // Get spreadsheet metadata
        const metadata = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const sheetNames = metadata.data.sheets?.map(s => s.properties?.title || '') || [];

        console.log('Available sheets:');
        sheetNames.forEach((sheet, index) => {
            console.log(`  ${index + 1}. ${sheet}`);
        });
        console.log('');

        // Read each sheet
        for (const sheetName of sheetNames) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`📋 Sheet: "${sheetName}"`);
            console.log('='.repeat(60));

            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: sheetName,
            });

            const data = response.data.values || [];

            if (data.length === 0) {
                console.log('⚠️  No data found');
                continue;
            }

            // Display all data (up to 500 rows)
            const rowsToShow = Math.min(data.length, 500);
            data.slice(0, rowsToShow).forEach((row, index) => {
                console.log(`  Row ${index + 1}: ${JSON.stringify(row)}`);
            });

            if (data.length > rowsToShow) {
                console.log(`  ... and ${data.length - rowsToShow} more rows`);
            }

            console.log(`\n📊 Total rows in this sheet: ${data.length}`);
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

readSEOKeywords();
