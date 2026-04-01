import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // --- DEBUGGING BLOCK ---
    const allEnvKeys = Object.keys(process.env);
    const hasKey = allEnvKeys.includes('AIzaSyB93hJs3t5YwPRfChyA_8XLPWiSC6z6TDQ');
    
    if (!hasKey) {
        return res.status(500).json({ 
            reply: `Vercel Debug: I see ${allEnvKeys.length} variables, but NONE are named GEMINI_API_KEY. Available keys start with: ${allEnvKeys.slice(0, 3).join(', ')}` 
        });
    }
    // --- END DEBUGGING ---

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const { message } = req.body;

        const result = await model.generateContent(message || "Hello");
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        return res.status(500).json({ reply: "Gemini Error: " + error.message });
    }
}





