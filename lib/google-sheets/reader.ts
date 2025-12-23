import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/**
 * Read data from a Google Sheet
 * 
 * @param spreadsheetId - The ID from the Google Sheets URL
 * @param range - The range to read (e.g., "Sheet1!A1:Z100" or just "Sheet1")
 * @returns Array of rows from the sheet
 */
export async function readGoogleSheet(
  spreadsheetId: string,
  range: string = 'Sheet1'
): Promise<any[][]> {
  try {
    // Option 1: Using API Key (for public sheets)
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    
    if (apiKey) {
      const sheets = google.sheets({ version: 'v4', auth: apiKey });
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      
      return response.data.values || [];
    }
    
    // Option 2: Using Service Account (for private sheets)
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountEmail && serviceAccountKey) {
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(serviceAccountKey),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
      
      const sheets = google.sheets({ version: 'v4', auth });
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      
      return response.data.values || [];
    }
    
    throw new Error('No Google Sheets authentication configured. Add GOOGLE_SHEETS_API_KEY or GOOGLE_SERVICE_ACCOUNT_KEY to .env.local');
    
  } catch (error: any) {
    console.error('Error reading Google Sheet:', error.message);
    throw error;
  }
}

/**
 * Get all sheets in a spreadsheet
 */
export async function listSheets(spreadsheetId: string): Promise<string[]> {
  try {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    
    if (apiKey) {
      const sheets = google.sheets({ version: 'v4', auth: apiKey });
      
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      
      return response.data.sheets?.map(sheet => sheet.properties?.title || '') || [];
    }
    
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(serviceAccountKey),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
      
      const sheets = google.sheets({ version: 'v4', auth });
      
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      
      return response.data.sheets?.map(sheet => sheet.properties?.title || '') || [];
    }
    
    throw new Error('No Google Sheets authentication configured');
    
  } catch (error: any) {
    console.error('Error listing sheets:', error.message);
    throw error;
  }
}

