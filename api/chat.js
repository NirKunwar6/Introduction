import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Use your actual key here
    const API_KEY = "AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ"; 

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(API_KEY);

        // Updated model name to include '-latest' for better compatibility
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash-latest" 
        });

        // Add the system instruction inside the generateContent call for higher success
        const prompt = `You are the AI assistant for Nirdeshan Kunwar. Answer this: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ reply: text });
    } catch (error) {
        // This will help us see if it's a version issue or a key issue
        console.error("Gemini Details:", error);
        return res.status(500).json({ reply: "Model Error: " + error.message });
    }
}




