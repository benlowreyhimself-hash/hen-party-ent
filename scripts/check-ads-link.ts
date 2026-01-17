
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkAdsLink() {
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const propertyId = process.env.GA_PROPERTY_ID; // 339895410

    if (!privateKey || !clientEmail || !propertyId) {
        console.error('Missing credentials in .env.local');
        return;
    }

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsAdmin = google.analyticsadmin({ version: 'v1beta', auth });

    console.log(`Checking Google Ads links for Property ID: ${propertyId}...`);

    try {
        const res = await analyticsAdmin.properties.googleAdsLinks.list({
            parent: `properties/${propertyId}`,
        });

        const links = res.data.googleAdsLinks;
        if (links && links.length > 0) {
            console.log('✅ Found Google Ads Link(s):');
            links.forEach((link) => {
                console.log(`- Link Name: ${link.name}`);
                console.log(`- Customer ID: ${link.customerId}`);
                console.log(`- Creator Email: ${link.creatorEmailAddress}`);
                console.log(`- Date Created: ${link.createTime}`);
            });
        } else {
            console.log('❌ No Google Ads accounts are linked to this Analytics property.');
        }
    } catch (error: any) {
        console.error('❌ API Error:', error.message);
        if (error.code === 403) {
            console.error('Tip: Ensure the Service Account has "Viewer" access in Analytics Admin.');
        }
    }
}

checkAdsLink();
