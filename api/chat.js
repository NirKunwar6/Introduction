import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const API_KEY = "AIzaSyD6mhJR2u1LGEmlI-xil7TmD_z5swU6jqY"; 

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(API_KEY);

        // Switching to the most universal legacy model to bypass the 404
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

        const result = await model.generateContent(message || "Hello");
        const response = await result.response;
        
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        return res.status(500).json({ reply: "Final Attempt Error: " + error.message });
    }
}




