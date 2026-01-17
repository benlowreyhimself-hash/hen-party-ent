import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/**
 * Appends a row to a Google Sheet
 * 
 * @param spreadsheetId - The ID of the spreadsheet
 * @param rowData - An array of values to append (in order of columns)
 * @param range - The range to append to (default: 'Sheet1!A:P')
 */
export async function appendRowToSheet(
    spreadsheetId: string,
    rowData: (string | number | null | undefined)[],
    range: string = 'Sheet1!A:P'
): Promise<void> {
    try {
        const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

        if (!serviceAccountKey) {
            console.warn('⚠️ GOOGLE_SERVICE_ACCOUNT_KEY not found. Skipping Google Sheet update.');
            return;
        }

        let credentials;
        try {
            credentials = JSON.parse(serviceAccountKey);
        } catch (e) {
            // If not JSON, check if it's a raw private key and we have the email
            const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
            if (serviceAccountKey.startsWith('-----BEGIN PRIVATE KEY') && email) {
                credentials = {
                    client_email: email,
                    private_key: serviceAccountKey.replace(/\\n/g, '\n'), // Handle escaped newlines
                };
            } else {
                throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY format (expected JSON or Private Key with Email)');
            }
        }

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowData],
            },
        });

        console.log('✅ Added row to Google Sheet');
    } catch (error: any) {
        console.error('❌ Error appending to Google Sheet:', error.message);
        // Don't throw, just log. We don't want to break the form submission if sheets fails.
    }
}
