import { appendRowToSheet } from '../lib/google-sheets/actions';

const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

async function testWrite() {
    console.log('🧪 Testing Google Sheets Write Access...');

    const testRow = [
        'Test Name',           // A: Name
        'Test Status',         // B: Status
        'Test Source',         // C: Source
        'Test Method',         // D: Method
        'test@example.com',    // E: Email
        new Date().toISOString().split('T')[0], // F: Enquiry Date
        '2025-01-01',          // G: Event Date
        'Test Relation',       // H: Relation
        'Test Occasion',       // I: Occasion
        'Test Region',         // J: Region
        '60 mins',             // K: Duration
        '10',                  // L: Group Size
        '12:00 PM',            // M: Start Time
        'Test Venue',          // N: Venue
        '07000000000',         // O: Phone number
        'Test Address'         // P: Full address
    ];

    try {
        await appendRowToSheet(SPREADSHEET_ID, testRow, 'Master!A:P');
        // appendRowToSheet swallows errors, so we rely on console output.
        // But to be sure, let's modify it to throw or we just check logs.
        // Actually, since I can't easily change the return type of appendRowToSheet purely for this test without affecting the main app usage (which expects void),
        // I will instruct the user to look at the console logs.

        console.log('\n✅ Test execution completed.');
        console.log('👉 If you saw "✅ Added row to Google Sheet", it worked.');
        console.log('👉 If you saw "❌ Error appending...", please check permissions.');
    } catch (error) {
        console.error('❌ Failed:', error);
    }
}

testWrite();
