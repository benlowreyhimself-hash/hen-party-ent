
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    try {
        // The SDK doesn't have a direct listModels method on the client instance in some versions,
        // but usually we can try to key a random model or just use the API directly if needed.
        // Actually, the SDK *does* expose it via the API but the wrapper might differ.
        // Let's try to just use a known model that should definitely exist, like 'gemini-1.5-flash'
        // and print if it works.

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log('Testing gemini-1.5-flash...');
        const result = await model.generateContent('Hello');
        console.log('Success with gemini-1.5-flash:', result.response.text());

    } catch (error: any) {
        console.error('Error with gemini-1.5-flash:', error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        console.log('Testing gemini-2.0-flash-exp...');
        const result = await model.generateContent('Hello');
        console.log('Success with gemini-2.0-flash-exp:', result.response.text());
    } catch (error: any) {
        console.log('gemini-2.0-flash-exp failed:', error.message);
    }
}

listModels();
