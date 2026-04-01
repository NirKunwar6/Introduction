import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // WE ARE HARDCODING IT HERE TO STOP THE "NOT SET" ERROR
    const API_KEY = "AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ"; 

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "You are the AI assistant for Nirdeshan Kunwar. Be professional."
        });

        const result = await model.generateContent(message || "Hello");
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        return res.status(500).json({ reply: "Gemini Error: " + error.message });
    }
}




