import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // Standard CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Your API Key
    const API_KEY = "AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ"; 

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(API_KEY);

        // We use gemini-1.5-pro which is the most widely supported stable model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `Assistant for Nirdeshan Kunwar: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ reply: text });
    } catch (error) {
        // If it still fails, it will tell us if it's the model name or the key
        return res.status(500).json({ reply: "Final Sync Error: " + error.message });
    }
}



