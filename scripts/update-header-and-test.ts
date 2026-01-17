import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import { appendRowToSheet } from '../lib/google-sheets/actions';

dotenv.config({ path: '.env.local' });

const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

async function renameAndTest() {
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    if (!serviceAccountKey) {
        console.error('No service account key found.');
        return;
    }

    // 1. Rename Header S1 to "Enquiry Notes"
    console.log('🔄 Renaming header S1 to "Enquiry Notes"...');

    let credentials;
    try {
        credentials = JSON.parse(serviceAccountKey);
    } catch (e) {
        if (serviceAccountKey.startsWith('-----BEGIN PRIVATE KEY') && serviceAccountEmail) {
            credentials = {
                client_email: serviceAccountEmail,
                private_key: serviceAccountKey.replace(/\\n/g, '\n'),
            };
        } else {
            console.error("Invalid credentials format");
            return;
        }
    }

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Master!S1',
            valueInputOption: 'RAW',
            requestBody: {
                values: [['Enquiry Notes']]
            }
        });
        console.log('✅ Header S1 renamed to "Enquiry Notes"');
    } catch (error: any) {
        console.error('❌ Failed to rename header:', error.message);
    }

    // 2. Add Test Row with Message
    console.log('\n🧪 Testing Row Append with Message to Col S...');
    const testRow = [
        'Test w/ Message',      // A: Name
        'Test Status',          // B: Status
        'Google Ads (Camp: Summer Sale Kw: Hen Party)', // C: Source
        'Test Method',          // D: Method
        'test2@example.com',    // E: Email
        new Date().toISOString().split('T')[0], // F: Enquiry Date
        '2025-01-01',           // G: Event Date
        'Relation',             // H: Relation
        'Occasion',             // I: Occasion
        'Region',               // J: Region
        '60 mins',              // K: Duration
        '10',                   // L: Group Size
        '12:00 PM',             // M: Start Time
        'Venue',                // N: Venue
        '07000000000',          // O: Phone number
        'Test Address',         // P: Full address
        '',                     // Q: Days out
        '',                     // R: Prosecco
        'This is a test message from the automated script.', // S: Message
    ];

    try {
        await appendRowToSheet(SPREADSHEET_ID, testRow, 'Master!A:S');
        console.log('✅ Success! Check the spreadsheet for the test row with message.');
    } catch (error) {
        console.error('❌ Failed to append row:', error);
    }
}

renameAndTest();
