import { google } from 'googleapis';
import * as dotenv from 'dotenv';

// Ensure env vars are loaded
dotenv.config({ path: '.env.local' });

/**
 * Initialize the Google Analytics Data API client
 */
function getAnalyticsClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountEmail || !serviceAccountKey) {
    throw new Error('Google Service Account credentials not found. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_KEY in .env.local');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccountEmail,
      private_key: serviceAccountKey.split(String.raw`\n`).join('\n'),
    },
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  return google.analyticsdata({ version: 'v1beta', auth });
}

export interface AnalyticsReportOptions {
  propertyId: string;
  startDate?: string;
  endDate?: string;
  metrics?: string[];
  dimensions?: string[];
}

/**
 * Fetch a basic report from Google Analytics 4
 */
export async function runAnalyticsReport({
  propertyId,
  startDate = '7daysAgo',
  endDate = 'today',
  metrics = ['activeUsers', 'screenPageViews', 'eventCount'],
  dimensions = ['date'],
}: AnalyticsReportOptions) {
  try {
    const client = getAnalyticsClient();

    const response = await client.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        dimensions: dimensions.map(name => ({ name })),
        metrics: metrics.map(name => ({ name })),
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error running Google Analytics report:', error.message);
    throw error;
  }
}

/**
 * Check specifically for recent event reception
 * Useful for verifying if tracking is working
 */
export async function checkRealtimeData(propertyId: string) {
  try {
    const client = getAnalyticsClient();

    // Realtime report options
    const response = await client.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: {
        metrics: [{ name: 'activeUsers' }],
        dimensions: [{ name: 'unifiedScreenName' }], // or city, deviceCategory
        minuteRanges: [{ name: '0-29' }], // Last 30 minutes
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error running Realtime report:', error.message);
    throw error;
  }
}
