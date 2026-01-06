
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function listModels() {
    try {
        // There isn't a direct listModels on the high level client in some versions, 
        // but we can try to make a simple request to a known model or just use the error message feedback.
        // Actually, the SDK doesn't expose listModels directly on the main class easily in all versions without diving deeper.
        // But let's try to just run a generation with gemini-pro and gemini-1.5-flash to see which works.

        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.0-pro"];

        for (const modelName of models) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ ${modelName} works! Response: ${result.response.text()}`);
            } catch (e: any) {
                console.log(`❌ ${modelName} failed: ${e.message}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
