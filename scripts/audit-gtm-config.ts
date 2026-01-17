import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function auditGTMConfig() {
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/tagmanager.readonly'],
  });

  const tagmanager = google.tagmanager({ version: 'v2', auth });
  const containerPath = 'accounts/1379756321/containers/6847805';

  console.log('=== GTM CONTAINER AUDIT: Hen Party Ent (GTM-WQVW4H2) ===\n');

  try {
    // Get workspaces
    const workspacesRes = await tagmanager.accounts.containers.workspaces.list({
      parent: containerPath,
    });
    
    const workspace = workspacesRes.data.workspace?.[0];
    if (!workspace) {
      console.log('No workspace found');
      return;
    }
    
    const workspacePath = workspace.path!;
    console.log('Workspace:', workspace.name, '\n');

    // Get all tags
    console.log('=== TAGS ===');
    const tagsRes = await tagmanager.accounts.containers.workspaces.tags.list({
      parent: workspacePath,
    });
    
    const tags = tagsRes.data.tag || [];
    tags.forEach(tag => {
      console.log(`\n📦 ${tag.name}`);
      console.log(`   Type: ${tag.type}`);
      if (tag.firingTriggerId) {
        console.log(`   Firing Triggers: ${tag.firingTriggerId.join(', ')}`);
      }
      if (tag.parameter) {
        tag.parameter.forEach(param => {
          if (param.key && param.value) {
            console.log(`   ${param.key}: ${param.value}`);
          }
        });
      }
    });

    // Get all triggers
    console.log('\n\n=== TRIGGERS ===');
    const triggersRes = await tagmanager.accounts.containers.workspaces.triggers.list({
      parent: workspacePath,
    });
    
    const triggers = triggersRes.data.trigger || [];
    triggers.forEach(trigger => {
      console.log(`\n🎯 ${trigger.name} (ID: ${trigger.triggerId})`);
      console.log(`   Type: ${trigger.type}`);
      if (trigger.customEventFilter) {
        trigger.customEventFilter.forEach(filter => {
          console.log(`   Filter: ${JSON.stringify(filter)}`);
        });
      }
    });

    // Identify potential issues
    console.log('\n\n=== POTENTIAL ISSUES ===');
    
    // Check for GA4 Configuration tags
    const ga4Tags = tags.filter(t => t.type === 'gaawc');
    if (ga4Tags.length > 0) {
      console.log(`⚠️  Found ${ga4Tags.length} GA4 Configuration tag(s) in GTM.`);
      console.log('   Your site ALSO loads GA4 directly via GoogleAnalytics.tsx');
      console.log('   This may cause DUPLICATE page views and events.');
      ga4Tags.forEach(t => console.log(`   - ${t.name}`));
    }

    // Check for Google Ads Conversion tags
    const adsConversionTags = tags.filter(t => t.type === 'awct' || t.type === 'gaawe');
    if (adsConversionTags.length > 0) {
      console.log(`\n📊 Found ${adsConversionTags.length} Google Ads Conversion tag(s):`);
      adsConversionTags.forEach(t => {
        console.log(`   - ${t.name} (Type: ${t.type})`);
        console.log(`     Triggers: ${t.firingTriggerId?.join(', ') || 'none'}`);
      });
    }

  } catch (e: any) {
    console.error('Error:', e.message);
  }
}

auditGTMConfig();
