import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

async function checkHeaders() {
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const tabs = ['2023 (Event Dates)', '2024 (Event Date)', '2025 (Event Date)'];

    for (const tab of tabs) {
        console.log('\n=== ' + tab + ' ===');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `'${tab}'!A1:T3`,
        });

        const rows = response.data.values || [];
        console.log('Row 1 (headers):');
        if (rows[0]) {
            rows[0].forEach((cell: string, idx: number) => {
                console.log(`  Column ${String.fromCharCode(65 + idx)}: "${cell || '(empty)'}"`);
            });
        }
        console.log('\nRow 2 (first data):');
        if (rows[1]) {
            rows[1].slice(0, 8).forEach((cell: string, idx: number) => {
                console.log(`  Column ${String.fromCharCode(65 + idx)}: "${cell || '(empty)'}"`);
            });
        }
    }
}

checkHeaders().catch(e => console.error('Error:', e.message));
