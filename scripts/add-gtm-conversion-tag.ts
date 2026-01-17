import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function addFormConversionTag() {
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers'],
    });

    const tagmanager = google.tagmanager({ version: 'v2', auth });
    const containerPath = 'accounts/1379756321/containers/6847805';

    console.log('=== Adding Google Ads Conversion Tag for Form Submissions ===\n');

    try {
        // Get the default workspace
        const workspacesRes = await tagmanager.accounts.containers.workspaces.list({
            parent: containerPath,
        });

        const workspace = workspacesRes.data.workspace?.[0];
        if (!workspace || !workspace.path) {
            console.log('No workspace found');
            return;
        }

        const workspacePath = workspace.path;
        console.log('Using workspace:', workspace.name);

        // Check if tag already exists
        const existingTags = await tagmanager.accounts.containers.workspaces.tags.list({
            parent: workspacePath,
        });

        const existingFormConversion = existingTags.data.tag?.find(
            t => t.name === 'Google Ads - Form Submission Conversion'
        );

        if (existingFormConversion) {
            console.log('✅ Tag already exists, skipping creation');
            return;
        }

        // Create the Google Ads Conversion tag
        const newTag = await tagmanager.accounts.containers.workspaces.tags.create({
            parent: workspacePath,
            requestBody: {
                name: 'Google Ads - Form Submission Conversion',
                type: 'awct', // Google Ads Conversion Tracking
                parameter: [
                    {
                        type: 'template',
                        key: 'conversionId',
                        value: '971873050',
                    },
                    {
                        type: 'template',
                        key: 'conversionLabel',
                        value: '-I6MCM2UwLsBEJq2ts8D',
                    },
                    {
                        type: 'boolean',
                        key: 'enableConversionLinker',
                        value: 'true',
                    },
                    {
                        type: 'boolean',
                        key: 'enableProductReporting',
                        value: 'false',
                    },
                    {
                        type: 'boolean',
                        key: 'enableNewCustomerReporting',
                        value: 'false',
                    },
                    {
                        type: 'boolean',
                        key: 'enableEnhancedConversion',
                        value: 'false',
                    },
                    {
                        type: 'template',
                        key: 'conversionCookiePrefix',
                        value: '_gcl',
                    },
                    {
                        type: 'boolean',
                        key: 'enableShippingData',
                        value: 'false',
                    },
                    {
                        type: 'boolean',
                        key: 'rdp',
                        value: 'false',
                    },
                ],
                firingTriggerId: ['32'], // Trigger ID 32 = "Trigger - Form Submission"
            },
        });

        console.log('✅ Created tag:', newTag.data.name);
        console.log('   Tag ID:', newTag.data.tagId);
        console.log('   Firing Trigger: 32 (Form Submission)');
        console.log('\n⚠️  IMPORTANT: You need to PUBLISH this change in GTM!');
        console.log('   Go to: https://tagmanager.google.com');
        console.log('   Open container GTM-WQVW4H2');
        console.log('   Click "Submit" to publish the changes');

    } catch (e: any) {
        console.error('Error:', e.message);
        if (e.code === 403) {
            console.log('\n⚠️  The service account needs "Edit" permission on the GTM container.');
            console.log('Please add this email with Edit access in GTM:');
            console.log(clientEmail);
        }
    }
}

addFormConversionTag();
