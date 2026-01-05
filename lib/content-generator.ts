import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateTopicContent(topic: string) {
    if (!process.env.GEMINI_API_KEY) {
        console.warn("Missing GEMINI_API_KEY, returning stub content.");
        return {
            title: `Hen Party Ideas: ${topic}`,
            intro: `Looking for the best tips about ${topic}? You've come to the right place.`,
            content: "Content generation unavailable."
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are Ben, a friendly and professional hen party model and entertainer from "Hen Party Entertainment".
    Write a helpful, engaging, and SEO-friendly guide about "${topic}".
    
    Target Audience: Maid of Honors and Bridesmaids organizing a hen party.
    Tone: Fun, classy, helpful, encouraging.
    
    Structure:
    1. A catchy Title (Do not use "Title:" prefix).
    2. An Introduction paragraph explaining why this topic matters for a hen do.
    3. 3-5 Bullet points of "Ben's Pro Tips" regarding this topic.
    4. A concluding sentence encouraging them to book a "Classy Life Drawing Class" as the perfect addition.

    Return the result as a JSON object with keys: title, intro, tips (array of strings), conclusion.
    Do not use markdown code blocks in the output, just raw JSON.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean potential markdown blocks
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Error generating content:", error);
        return {
            title: `Guide: ${topic}`,
            intro: `We are compiling the best advice for ${topic}. Check back soon!`,
            tips: [],
            conclusion: ""
        };
    }
}
