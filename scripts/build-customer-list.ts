import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SPREADSHEET_ID = '1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08';

// Tabs to read from (customer data)
const CUSTOMER_TABS = [
    '2019 (Event Dates)',
    '2020 (Event Dates)',
    '2021 (Event Dates)',
    '2022 (Event dates)',
    '2023 (Event Dates)',
    '2024 (Event Date)',
    '2025 (Event Date)',
    'Master',
];

// Column name variations we might find
const NAME_COLUMNS = ['name', 'customer name', 'client name', 'full name', 'contact name', 'customer', 'contact'];
const EMAIL_COLUMNS = ['email', 'email address', 'e-mail', 'customer email', 'contact email'];
const PHONE_COLUMNS = ['phone', 'phone number', 'telephone', 'mobile', 'tel', 'contact number', 'phone no'];

interface CustomerRecord {
    name: string;
    email: string;
    phone: string;
    source: string;
}

async function getSheetsClient() {
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    if (!privateKey || !clientEmail) {
        throw new Error('Missing Google Service Account credentials');
    }

    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
}

function findColumnIndex(headers: string[], possibleNames: string[]): number {
    const lowerHeaders = headers.map(h => (h || '').toLowerCase().trim());
    for (const name of possibleNames) {
        const idx = lowerHeaders.indexOf(name.toLowerCase());
        if (idx !== -1) return idx;
    }
    return -1;
}

function cleanPhone(phone: string): string {
    if (!phone) return '';

    // Remove all non-digit characters except +
    let cleaned = phone.toString().replace(/[^\d+]/g, '');

    // If it starts with +44, remove the +
    if (cleaned.startsWith('+44')) {
        cleaned = '44' + cleaned.substring(3);
    }
    // If it starts with 44 already, keep it
    else if (cleaned.startsWith('44') && cleaned.length >= 12) {
        // Already has country code
    }
    // If it starts with 0, replace with 44 (UK country code)
    else if (cleaned.startsWith('0')) {
        cleaned = '44' + cleaned.substring(1);
    }
    // If it's 10 digits without leading 0, add 44
    else if (cleaned.length === 10) {
        cleaned = '44' + cleaned;
    }

    // Validate: UK numbers with country code should be 12 digits (44 + 10 digits)
    if (cleaned.length < 11 || cleaned.length > 13) {
        return '';
    }

    return cleaned;
}



function cleanEmail(email: string): string {
    if (!email) return '';
    return email.toString().toLowerCase().trim();
}

function cleanName(name: string): string {
    if (!name) return '';
    const cleaned = name.toString().trim();
    if (cleaned.toLowerCase().includes('array formula') ||
        cleaned.toLowerCase() === 'name' ||
        cleaned.length < 2) {
        return '';
    }
    return cleaned;
}

function getFirstName(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    return parts[0] || '';
}

function isValidDataRow(row: any[], emailIdx: number): boolean {
    if (!row || !row[emailIdx]) return false;
    const email = row[emailIdx].toString();
    if (email.toLowerCase() === 'email' ||
        email.toLowerCase().includes('array formula')) {
        return false;
    }
    return email.includes('@');
}

async function readTabData(sheets: any, tabName: string): Promise<CustomerRecord[]> {
    console.log(`\n📖 Reading tab: "${tabName}"...`);

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `'${tabName}'!A1:Z1500`,
        });

        const rows = response.data.values || [];
        if (rows.length < 2) {
            console.log(`   ⚠️ No data in this tab`);
            return [];
        }

        const headers = rows[0];
        console.log(`   Headers: ${headers.slice(0, 8).join(', ')}...`);

        let nameIdx = findColumnIndex(headers, NAME_COLUMNS);
        const emailIdx = findColumnIndex(headers, EMAIL_COLUMNS);
        const phoneIdx = findColumnIndex(headers, PHONE_COLUMNS);

        if (nameIdx === -1 && headers.length > 0) {
            console.log(`   ⚠️ Name header not found, using Column A as name`);
            nameIdx = 0;
        }

        console.log(`   Name column: index ${nameIdx}`);
        console.log(`   Email column: ${emailIdx >= 0 ? headers[emailIdx] : 'NOT FOUND'} (index: ${emailIdx})`);
        console.log(`   Phone column: ${phoneIdx >= 0 ? headers[phoneIdx] : 'NOT FOUND'} (index: ${phoneIdx})`);

        if (emailIdx === -1) {
            console.log(`   ⚠️ No email column found - skipping this tab`);
            return [];
        }

        const records: CustomerRecord[] = [];
        let skippedRows = 0;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            if (!isValidDataRow(row, emailIdx)) {
                skippedRows++;
                continue;
            }

            const email = cleanEmail(row[emailIdx] || '');
            const name = nameIdx >= 0 ? cleanName(row[nameIdx] || '') : '';
            const phone = phoneIdx >= 0 ? cleanPhone(row[phoneIdx] || '') : '';

            records.push({
                name: name,
                email: email,
                phone: phone,
                source: tabName,
            });
        }

        const withNames = records.filter(r => r.name.length > 0).length;
        console.log(`   ✅ Found ${records.length} records with valid emails (${withNames} have names)`);
        if (skippedRows > 0) {
            console.log(`   ⏭️ Skipped ${skippedRows} non-data rows`);
        }
        return records;

    } catch (error: any) {
        console.log(`   ❌ Error reading tab: ${error.message}`);
        return [];
    }
}

async function writeToGoogleAdsTab(sheets: any, records: CustomerRecord[]) {
    console.log(`\n📝 Writing ${records.length} records to "GoogleAds Customer List" tab...`);

    // Google Ads format: Email + Phone only
    // (If you include First Name, you MUST also include Last Name, Country, Zip)
    const headers = ['Email', 'Phone'];
    const dataRows = records.map(r => [
        r.email,   // Email
        r.phone,   // Phone with country code 44
    ]);
    const allRows = [headers, ...dataRows];


    // Clear existing data first
    try {
        await sheets.spreadsheets.values.clear({
            spreadsheetId: SPREADSHEET_ID,
            range: "'GoogleAds Customer List'!A:B",
        });
    } catch (e) {
        console.log('   (Tab may be empty, continuing...)');
    }

    // Write the data
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "'GoogleAds Customer List'!A1",
        valueInputOption: 'RAW',
        requestBody: {
            values: allRows,
        },
    });

    const withPhones = records.filter(r => r.phone.length > 0).length;

    console.log(`\n✅ Successfully wrote ${records.length} records!`);
    console.log(`   📧 Emails: ${records.length}`);
    console.log(`   📞 With phones: ${withPhones}`);
}

async function main() {
    console.log('=== Building Google Ads Customer List (v3 - First Names) ===\n');
    console.log(`Spreadsheet ID: ${SPREADSHEET_ID}`);

    const sheets = await getSheetsClient();

    const allRecords: CustomerRecord[] = [];

    for (const tabName of CUSTOMER_TABS) {
        const records = await readTabData(sheets, tabName);
        allRecords.push(...records);
    }

    console.log(`\n📊 Total records collected: ${allRecords.length}`);

    // Deduplicate by email (keep first occurrence with most data)
    const emailMap = new Map<string, CustomerRecord>();

    for (const record of allRecords) {
        const existing = emailMap.get(record.email);
        if (!existing) {
            emailMap.set(record.email, record);
        } else {
            const existingScore = (existing.name ? 1 : 0) + (existing.phone ? 1 : 0);
            const newScore = (record.name ? 1 : 0) + (record.phone ? 1 : 0);
            if (newScore > existingScore) {
                emailMap.set(record.email, record);
            }
        }
    }

    const uniqueRecords = Array.from(emailMap.values());
    console.log(`📊 Unique records (deduplicated by email): ${uniqueRecords.length}`);

    await writeToGoogleAdsTab(sheets, uniqueRecords);

    console.log('\n=== DONE ===');
    console.log(`\n📋 Column Layout (Google Ads compatible):`);
    console.log(`   A: Email`);
    console.log(`   B: Phone (with UK country code 44)`);
}

main().catch(console.error);
