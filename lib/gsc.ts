import { google } from 'googleapis';

// The exact site URL as verified in GSC
export const GSC_SITE_URL = 'https://henpartyentertainment.co.uk';

export function getGSCAuth() {
    const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Handle literal newlines in the key string
    let private_key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (private_key && private_key.includes('\\n')) {
        private_key = private_key.replace(/\\n/g, '\n');
    }

    if (!client_email || !private_key) {
        throw new Error('Missing Google Service Account credentials (GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY)');
    }

    return new google.auth.GoogleAuth({
        credentials: {
            client_email,
            private_key,
        },
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
}

export async function getPopularQueries() {
    const auth = getGSCAuth();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Calculate dates: Last 28 days
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];
    const startDateObj = new Date();
    startDateObj.setDate(today.getDate() - 30);
    const startDate = startDateObj.toISOString().split('T')[0];

    console.log(`Fetching GSC data for ${GSC_SITE_URL} from ${startDate} to ${endDate}...`);

    try {
        const res = await searchconsole.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['query'],
                rowLimit: 50,
                // Filter for terms with significant impressions/clicks if needed
            },
        });

        return res.data.rows || [];
    } catch (error: any) {
        // If the specific URL fails, try sc-domain property
        if (error.code === 403 || error.message.includes('User does not have sufficient permissions')) {
            console.log('Trying sc-domain property...');
            const scDomainUrl = `sc-domain:henpartyentertainment.co.uk`;
            const res = await searchconsole.searchanalytics.query({
                siteUrl: scDomainUrl,
                requestBody: {
                    startDate,
                    endDate,
                    dimensions: ['query'],
                    rowLimit: 50,
                },
            });
            return res.data.rows || [];
        }
        throw error;
    }
}
