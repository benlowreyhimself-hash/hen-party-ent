import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Google Ads Customer ID (without dashes)
const CUSTOMER_ID = '8439224112';

async function auditAudiences() {
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    console.log('=== Google Ads Audience Audit ===\n');
    console.log('Note: Managing Google Ads audiences requires OAuth credentials,');
    console.log('not just a service account. The Google Ads API has stricter auth requirements.\n');

    console.log('To remove audiences manually in Google Ads:');
    console.log('1. Go to Tools & Settings → Shared Library → Audience Manager');
    console.log('2. If an audience is "in use", you must first:');
    console.log('   - Go to each campaign using it');
    console.log('   - Remove the audience from that campaign');
    console.log('3. Then return to Audience Manager and delete it\n');

    console.log('=== Audiences to DELETE (from earlier analysis) ===');
    console.log('❌ All visitors (Google Ads) - Closed/Incompatible');
    console.log('❌ All converters - Closed/Incompatible');
    console.log('❌ Google remarketing - No Account 8439224112 - Closed/Incompatible');
    console.log('❌ Non-converters (Custom) - Too small, not useful\n');

    console.log('=== Audiences to KEEP ===');
    console.log('✅ AdWords optimized list - Open, has ~1500 users');
    console.log('✅ General visitors - Will grow');
    console.log('✅ Past converters - Useful for lookalikes');
    console.log('✅ Thank You Page visitors - Conversion audience');
    console.log('✅ Product/service viewers - Retargeting');
    console.log('✅ Purchasers of Hen Party Ent - Best for lookalikes');
    console.log('✅ Customer List from email - 2026 January - NEW! Your 1083 customers\n');

    console.log('=== How to Check What\'s Using an Audience ===');
    console.log('1. In Audience Manager, click on the audience');
    console.log('2. Look for "Where this segment is used"');
    console.log('3. Remove from those campaigns first');
    console.log('4. Then you can delete the audience\n');
}

auditAudiences().catch(console.error);
