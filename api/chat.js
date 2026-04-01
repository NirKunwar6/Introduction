import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // TEMPORARY DIRECT KEY (To bypass Vercel Settings issues)
    const DIRECT_KEY = "AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ"; 
    
    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(DIRECT_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "You are the AI assistant for Nirdeshan Kunwar. Be professional and concise."
        });

        const result = await model.generateContent(message || "Hello");
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
        
    } catch (error) {
        return res.status(500).json({ reply: "Final Error: " + error.message });
    }
}





