import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const apiKey = process.env.AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ;

    if (!apiKey) {
        return res.status(500).json({ reply: "Environment Variable GEMINI_API_KEY is not set in Vercel." });
    }

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "You are the AI assistant for Nirdeshan Kunwar (Nir), a digital creator and cricketer. Be professional."
        });

        const result = await model.generateContent(message || "Hello");
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        return res.status(500).json({ reply: "Error: " + error.message });
    }
}




