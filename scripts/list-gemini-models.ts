
import { readFile } from 'fs/promises';
import { join } from 'path';

async function listModels() {
    try {
        // Read .env.local manually to ensure we get the key
        const envPath = join(process.cwd(), '.env.local');
        const envContent = await readFile(envPath, 'utf-8');
        const keyMatch = envContent.match(/GEMINI_API_KEY=(.+)/);

        if (!keyMatch) {
            console.error("❌ Could not find GEMINI_API_KEY in .env.local");
            return;
        }

        const apiKey = keyMatch[1].trim();
        console.log(`Checking models with key: ${apiKey.substring(0, 5)}...`);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("✅ Available Models:");
            data.models?.forEach((m: any) => console.log(`- ${m.name.replace('models/', '')}`));
        }
    } catch (error) {
        console.error("Script Error:", error);
    }
}

listModels();
