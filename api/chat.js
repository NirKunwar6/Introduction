import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // Use your actual key inside the quotes below
    const MY_KEY = "AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ"; 

    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(MY_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(message || "Hello");
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        // If you see "VERSION 2", the code updated!
        return res.status(500).json({ reply: "VERSION 2 Error: " + error.message });
    }
}




